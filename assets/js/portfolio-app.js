(function () {
  'use strict';

  var PER_PAGE = 12;
  var grid = document.getElementById('portfolio-grid');
  var controls = document.getElementById('pagination-controls');
  var searchInput = document.getElementById('search-input');
  var categoryFilter = document.getElementById('category-filter');

  if (!grid || !controls) return;

  var allCards = [];
  var currentPage = 1;

  // --- Pagination ---

  function getVisibleCards() {
    return allCards.filter(function (card) {
      return !card.classList.contains('filtered-out');
    });
  }

  function showPage(page) {
    var visible = getVisibleCards();
    var totalPages = Math.ceil(visible.length / PER_PAGE);
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    currentPage = page;

    var start = (page - 1) * PER_PAGE;
    var end = start + PER_PAGE;

    // Hide all cards first
    allCards.forEach(function (card) {
      card.style.display = 'none';
    });

    // Show only current page of visible cards
    visible.forEach(function (card, i) {
      card.style.display = (i >= start && i < end) ? '' : 'none';
    });

    renderControls(page, totalPages);
  }

  function renderControls(page, totalPages) {
    if (totalPages <= 1) {
      controls.innerHTML = '';
      return;
    }

    var html = '<nav aria-label="Portfolio pagination"><ul class="pagination justify-content-center flex-wrap">';

    if (page > 1) {
      html += '<li class="page-item"><a class="page-link" href="#" data-page="' + (page - 1) + '">Previous</a></li>';
    }

    // Smart page range: show max 7 page numbers
    var startPage = Math.max(1, page - 3);
    var endPage = Math.min(totalPages, page + 3);
    if (startPage > 1) {
      html += '<li class="page-item"><a class="page-link" href="#" data-page="1">1</a></li>';
      if (startPage > 2) html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
    }
    for (var p = startPage; p <= endPage; p++) {
      var active = p === page ? ' active' : '';
      html += '<li class="page-item' + active + '"><a class="page-link" href="#" data-page="' + p + '">' + p + '</a></li>';
    }
    if (endPage < totalPages) {
      if (endPage < totalPages - 1) html += '<li class="page-item disabled"><span class="page-link">...</span></li>';
      html += '<li class="page-item"><a class="page-link" href="#" data-page="' + totalPages + '">' + totalPages + '</a></li>';
    }

    if (page < totalPages) {
      html += '<li class="page-item"><a class="page-link" href="#" data-page="' + (page + 1) + '">Next</a></li>';
    }

    html += '</ul></nav>';
    controls.innerHTML = html;

    controls.querySelectorAll('.page-link[data-page]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var p = parseInt(link.getAttribute('data-page'), 10);
        showPage(p);
        window.scrollTo({ top: grid.offsetTop - 80, behavior: 'smooth' });
      });
    });
  }

  // --- Filter + Search ---

  function filterProjects() {
    var query = searchInput ? searchInput.value.toLowerCase().trim() : '';
    var selectedCategory = categoryFilter ? categoryFilter.value : '';

    allCards.forEach(function (card) {
      var name = card.dataset.name || '';
      var category = card.dataset.category || '';
      var searchContent = card.dataset.search || '';

      var matchesSearch = !query ||
        name.indexOf(query) !== -1 ||
        searchContent.indexOf(query) !== -1;

      var matchesCategory = !selectedCategory || category === selectedCategory;

      if (matchesSearch && matchesCategory) {
        card.classList.remove('filtered-out');
      } else {
        card.classList.add('filtered-out');
      }
    });

    // Reset to page 1 after filtering
    showPage(1);
  }

  // --- Modal (README display) ---

  function parseOwnerRepo(repoUrl) {
    // Extract owner/repo from https://github.com/owner/repo
    try {
      var url = new URL(repoUrl);
      var parts = url.pathname.split('/').filter(Boolean);
      if (parts.length >= 2) {
        return { owner: parts[0], repo: parts[1] };
      }
    } catch (e) {}
    return null;
  }

  function initModal() {
    var PROJECTS = window.PORTFOLIO_PROJECTS || [];
    var modal = document.getElementById('readmeModal');
    var modalTitle = document.getElementById('readmeModalLabel');
    var readmeContent = document.getElementById('readme-content');
    var githubLink = document.getElementById('github-link');

    if (!modal || !modalTitle || !readmeContent || !githubLink) return;

    var bsModal = new bootstrap.Modal(modal);

    document.addEventListener('click', function (e) {
      var card = e.target.closest('[data-project-index]');
      if (!card) return;

      e.preventDefault();
      var index = parseInt(card.dataset.projectIndex, 10);
      var project = PROJECTS[index];

      if (!project) return;

      modalTitle.textContent = project.name;
      githubLink.href = project.repo_url;

      // Show loading spinner
      readmeContent.innerHTML = '<div class="text-center p-4"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div><p class="mt-2 text-muted">Loading README...</p></div>';
      bsModal.show();

      // Build correct raw URL
      var parsed = parseOwnerRepo(project.repo_url);
      if (!parsed) {
        readmeContent.innerHTML = '<div class="alert alert-info">Could not parse repository URL. <a href="' + project.repo_url + '" target="_blank" class="alert-link">View on GitHub</a></div>';
        return;
      }

      var rawBase = 'https://raw.githubusercontent.com/' + parsed.owner + '/' + parsed.repo;

      fetch(rawBase + '/master/README.md')
        .then(function (response) {
          if (!response.ok) {
            return fetch(rawBase + '/main/README.md');
          }
          return response;
        })
        .then(function (response) {
          if (!response.ok) throw new Error('README not found');
          return response.text();
        })
        .then(function (markdown) {
          // Render markdown as formatted text
          var html = renderMarkdown(markdown);
          readmeContent.innerHTML = html;
        })
        .catch(function () {
          readmeContent.innerHTML = '<div class="alert alert-info">README not available for direct viewing. <a href="' + project.repo_url + '" target="_blank" class="alert-link">View on GitHub instead</a></div>';
        });
    });
  }

  function renderMarkdown(md) {
    // Lightweight markdown-to-HTML
    var html = md;

    // Escape HTML entities
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // Code blocks (``` ... ```)
    html = html.replace(/```(\w*)\n([\s\S]*?)```/g, function (m, lang, code) {
      return '<pre class="highlight"><code>' + code.trim() + '</code></pre>';
    });

    // Inline code
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');

    // Headers
    html = html.replace(/^######\s+(.+)$/gm, '<h6>$1</h6>');
    html = html.replace(/^#####\s+(.+)$/gm, '<h5>$1</h5>');
    html = html.replace(/^####\s+(.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^###\s+(.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^##\s+(.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^#\s+(.+)$/gm, '<h1>$1</h1>');

    // Bold and italic
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    html = html.replace(/\*(.+?)\*/g, '<em>$1</em>');

    // Images
    html = html.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1" style="max-width:100%;height:auto;" />');

    // Links
    html = html.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" target="_blank" rel="noopener noreferrer">$1</a>');

    // Horizontal rules
    html = html.replace(/^---+$/gm, '<hr />');

    // Unordered lists
    html = html.replace(/^[\-\*]\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/(<li>.*<\/li>\n?)+/g, '<ul>$&</ul>');

    // Paragraphs (lines separated by blank lines)
    html = html.replace(/\n\n+/g, '</p><p>');
    html = '<p>' + html + '</p>';

    // Clean up empty paragraphs and fix nesting
    html = html.replace(/<p>\s*<\/p>/g, '');
    html = html.replace(/<p>\s*(<h[1-6]>)/g, '$1');
    html = html.replace(/(<\/h[1-6]>)\s*<\/p>/g, '$1');
    html = html.replace(/<p>\s*(<pre)/g, '$1');
    html = html.replace(/(<\/pre>)\s*<\/p>/g, '$1');
    html = html.replace(/<p>\s*(<ul>)/g, '$1');
    html = html.replace(/(<\/ul>)\s*<\/p>/g, '$1');
    html = html.replace(/<p>\s*(<hr \/>)/g, '$1');
    html = html.replace(/(<hr \/>)\s*<\/p>/g, '$1');

    return html;
  }

  // --- Public init (called by loader after cards are in DOM) ---

  window.initPortfolio = function () {
    allCards = Array.from(grid.querySelectorAll('.portfolio-card-wrapper'));

    if (allCards.length === 0) return;

    // Bind filter events
    if (searchInput) {
      searchInput.addEventListener('input', filterProjects);
    }
    if (categoryFilter) {
      categoryFilter.addEventListener('change', filterProjects);
    }

    // Show first page
    showPage(1);

    // Init modal
    initModal();
  };
})();
