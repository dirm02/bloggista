(function () {
  'use strict';

  var PER_PAGE = 12;
  var grid = document.getElementById('portfolio-grid');
  var controls = document.getElementById('pagination-controls');
  var searchInput = document.getElementById('search-input');
  var categoryFilter = document.getElementById('category-filter');
  var languageFilter = document.getElementById('language-filter');
  var starsFilter = document.getElementById('stars-filter');
  var updatedFilter = document.getElementById('updated-filter');
  var searchStatsEl = document.getElementById('search-stats');
  var clearAllFiltersBtn = document.getElementById('clear-all-filters');

  if (!grid || !controls) return;

  var allCards = [];
  var currentPage = 1;
  
  // Search history management
  var SEARCH_HISTORY_KEY = 'portfolio_search_history';
  var MAX_HISTORY_ITEMS = 10;

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

  // --- Search History Functions ---
  
  function getSearchHistory() {
    try {
      var history = localStorage.getItem(SEARCH_HISTORY_KEY);
      return history ? JSON.parse(history) : [];
    } catch (e) {
      console.error('Error reading search history:', e);
      return [];
    }
  }
  
  function saveSearchHistory(query) {
    if (!query || query.length < 2) return;
    
    try {
      var history = getSearchHistory();
      // Remove duplicate if exists
      history = history.filter(function(item) { return item !== query; });
      // Add to beginning
      history.unshift(query);
      // Keep only MAX_HISTORY_ITEMS
      history = history.slice(0, MAX_HISTORY_ITEMS);
      localStorage.setItem(SEARCH_HISTORY_KEY, JSON.stringify(history));
      renderSearchHistory();
    } catch (e) {
      console.error('Error saving search history:', e);
    }
  }
  
  function clearSearchHistory() {
    try {
      localStorage.removeItem(SEARCH_HISTORY_KEY);
      renderSearchHistory();
    } catch (e) {
      console.error('Error clearing search history:', e);
    }
  }
  
  function renderSearchHistory() {
    var historyContainer = document.getElementById('search-history-container');
    var historyList = document.getElementById('search-history-list');
    if (!historyContainer || !historyList) return;
    
    var history = getSearchHistory();
    
    if (history.length === 0) {
      historyContainer.style.display = 'none';
      return;
    }
    
    historyContainer.style.display = '';
    historyList.innerHTML = '';
    
    history.forEach(function(query) {
      var badge = document.createElement('button');
      badge.className = 'btn btn-sm btn-outline-secondary';
      badge.textContent = query;
      badge.type = 'button';
      badge.addEventListener('click', function() {
        if (searchInput) {
          searchInput.value = query;
          filterProjects();
        }
      });
      historyList.appendChild(badge);
    });
  }

  // --- Filter + Search ---

  function filterProjects() {
    var query = searchInput ? searchInput.value.trim() : '';
    var selectedCategory = categoryFilter ? categoryFilter.value : '';
    var selectedLanguage = languageFilter ? languageFilter.value : '';
    var minStars = starsFilter ? parseInt(starsFilter.value, 10) || 0 : 0;
    var updatedDays = updatedFilter ? parseInt(updatedFilter.value, 10) || 0 : 0;
    
    // Save search query to history if it's a valid search
    if (query && query.length >= 2) {
      saveSearchHistory(query);
    }
    
    // Show/hide clear all filters button
    var hasFilters = selectedCategory || selectedLanguage || minStars > 0 || updatedDays > 0 || (query && query.length >= 2);
    if (clearAllFiltersBtn) {
      clearAllFiltersBtn.style.display = hasFilters ? '' : 'none';
    }
    
    // Calculate date threshold for last updated filter
    var dateThreshold = null;
    if (updatedDays > 0) {
      dateThreshold = new Date();
      dateThreshold.setDate(dateThreshold.getDate() - updatedDays);
    }

    // If no search query, use simple filtering
    if (!query || query.length < 2) {
      allCards.forEach(function (card) {
        var categoriesStr = card.dataset.categories || '';
        var cardCategories = categoriesStr ? categoriesStr.split(',') : [];
        var cardLanguage = card.dataset.language || '';
        var cardStars = parseInt(card.dataset.stars, 10) || 0;
        var cardLastUpdated = card.dataset.lastUpdated || '';
        
        var matchesCategory = !selectedCategory || cardCategories.indexOf(selectedCategory) !== -1;
        var matchesLanguage = !selectedLanguage || cardLanguage === selectedLanguage;
        var matchesStars = cardStars >= minStars;
        var matchesUpdated = true;
        
        if (dateThreshold && cardLastUpdated) {
          var cardDate = new Date(cardLastUpdated);
          matchesUpdated = cardDate >= dateThreshold;
        }
        
        if (matchesCategory && matchesLanguage && matchesStars && matchesUpdated) {
          card.classList.remove('filtered-out');
          card.style.order = '0'; // Reset order
        } else {
          card.classList.add('filtered-out');
        }
      });
      updateSearchStats(query);
      showPage(1);
      return;
    }

    // Use Fuse.js for search
    if (!window.FUSE_INDEX) {
      console.error('Search index not initialized, falling back to basic search');
      // Fallback to basic search
      allCards.forEach(function (card) {
        var name = card.dataset.name || '';
        var categoriesStr = card.dataset.categories || '';
        var cardCategories = categoriesStr ? categoriesStr.split(',') : [];
        var searchContent = card.dataset.search || '';
        var cardLanguage = card.dataset.language || '';
        var cardStars = parseInt(card.dataset.stars, 10) || 0;
        var cardLastUpdated = card.dataset.lastUpdated || '';

        var matchesSearch = name.indexOf(query.toLowerCase()) !== -1 ||
          searchContent.indexOf(query.toLowerCase()) !== -1;
        var matchesCategory = !selectedCategory || cardCategories.indexOf(selectedCategory) !== -1;
        var matchesLanguage = !selectedLanguage || cardLanguage === selectedLanguage;
        var matchesStars = cardStars >= minStars;
        var matchesUpdated = true;
        
        if (dateThreshold && cardLastUpdated) {
          var cardDate = new Date(cardLastUpdated);
          matchesUpdated = cardDate >= dateThreshold;
        }

        if (matchesSearch && matchesCategory && matchesLanguage && matchesStars && matchesUpdated) {
          card.classList.remove('filtered-out');
          card.style.order = '0';
        } else {
          card.classList.add('filtered-out');
        }
      });
      updateSearchStats(query);
      showPage(1);
      return;
    }

    var results = window.FUSE_INDEX.search(query);
    
    // Create a map of matching project indices with their scores
    var matchMap = {};
    results.forEach(function(result, rank) {
      var projectIndex = window.PORTFOLIO_PROJECTS.indexOf(result.item);
      matchMap[projectIndex] = {
        score: result.score,
        rank: rank
      };
    });

    // Filter and rank cards
    allCards.forEach(function (card) {
      var projectIndex = parseInt(card.dataset.index, 10);
      var categoriesStr = card.dataset.categories || '';
      var cardCategories = categoriesStr ? categoriesStr.split(',') : [];
      var cardLanguage = card.dataset.language || '';
      var cardStars = parseInt(card.dataset.stars, 10) || 0;
      var cardLastUpdated = card.dataset.lastUpdated || '';
      
      var matchesSearch = matchMap.hasOwnProperty(projectIndex);
      var matchesCategory = !selectedCategory || cardCategories.indexOf(selectedCategory) !== -1;
      var matchesLanguage = !selectedLanguage || cardLanguage === selectedLanguage;
      var matchesStars = cardStars >= minStars;
      var matchesUpdated = true;
      
      if (dateThreshold && cardLastUpdated) {
        var cardDate = new Date(cardLastUpdated);
        matchesUpdated = cardDate >= dateThreshold;
      }

      if (matchesSearch && matchesCategory && matchesLanguage && matchesStars && matchesUpdated) {
        card.classList.remove('filtered-out');
        // Set order based on search rank (lower is better)
        card.style.order = matchMap[projectIndex].rank;
      } else {
        card.classList.add('filtered-out');
      }
    });

    updateSearchStats(query);
    showPage(1);
  }
  
  function updateSearchStats(query) {
    if (!searchStatsEl) return;
    
    if (query && query.length >= 2) {
      var visibleCount = getVisibleCards().length;
      searchStatsEl.textContent = visibleCount + ' result' + (visibleCount !== 1 ? 's' : '');
    } else {
      searchStatsEl.textContent = '';
    }
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
    // Use marked.js for proper GitHub Flavored Markdown rendering
    if (typeof marked === 'undefined') {
      console.error('marked.js library not loaded');
      return '<div class="alert alert-warning">Markdown library not loaded. Please refresh the page.</div>';
    }

    // Configure marked for GitHub Flavored Markdown
    marked.setOptions({
      gfm: true,              // GitHub Flavored Markdown
      breaks: true,           // Convert \n to <br> in paragraphs
      headerIds: true,        // Add IDs to headers
      mangle: false,          // Don't escape autolinked email addresses
      sanitize: false,        // Allow HTML (GitHub READMEs often contain HTML)
      smartLists: true,       // Use smarter list behavior
      smartypants: false,     // Don't use smart typography
      xhtml: false            // Don't use self-closing tags
    });

    try {
      return marked.parse(md);
    } catch (e) {
      console.error('Error parsing markdown:', e);
      return '<div class="alert alert-danger">Error rendering README. <a href="#" class="alert-link">View on GitHub instead</a></div>';
    }
  }

  // --- Public init (called by loader after cards are in DOM) ---

  window.initPortfolio = function () {
    allCards = Array.from(grid.querySelectorAll('.portfolio-card-wrapper'));

    if (allCards.length === 0) return;

    // Bind filter events with debouncing for search
    var searchTimeout;
    if (searchInput) {
      searchInput.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterProjects, 300); // 300ms delay
      });
    }
    
    // Category filter remains immediate
    if (categoryFilter) {
      categoryFilter.addEventListener('change', filterProjects);
    }
    
    // Advanced filters
    if (languageFilter) {
      languageFilter.addEventListener('change', filterProjects);
    }
    
    if (starsFilter) {
      starsFilter.addEventListener('input', function() {
        clearTimeout(searchTimeout);
        searchTimeout = setTimeout(filterProjects, 300);
      });
    }
    
    if (updatedFilter) {
      updatedFilter.addEventListener('change', filterProjects);
    }
    
    // Toggle advanced filters panel
    var toggleBtn = document.getElementById('toggle-advanced-filters');
    var advancedPanel = document.getElementById('advanced-filters-panel');
    var advancedIcon = document.getElementById('advanced-filter-icon');
    
    if (toggleBtn && advancedPanel) {
      toggleBtn.addEventListener('click', function() {
        var isVisible = advancedPanel.style.display !== 'none';
        advancedPanel.style.display = isVisible ? 'none' : '';
        if (advancedIcon) {
          advancedIcon.textContent = isVisible ? '▶' : '▼';
        }
      });
    }
    
    // Clear all filters button
    if (clearAllFiltersBtn) {
      clearAllFiltersBtn.addEventListener('click', function() {
        if (searchInput) searchInput.value = '';
        if (categoryFilter) categoryFilter.value = '';
        if (languageFilter) languageFilter.value = '';
        if (starsFilter) starsFilter.value = '';
        if (updatedFilter) updatedFilter.value = '';
        filterProjects();
      });
    }
    
    // Search history
    var clearHistoryBtn = document.getElementById('clear-search-history');
    if (clearHistoryBtn) {
      clearHistoryBtn.addEventListener('click', function() {
        clearSearchHistory();
      });
    }
    
    // Render initial search history
    renderSearchHistory();

    // Show first page
    showPage(1);

    // Init modal
    initModal();
  };
})();
