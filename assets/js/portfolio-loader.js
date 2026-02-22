(function () {
  'use strict';

  var grid = document.getElementById('portfolio-grid');
  var categoryFilter = document.getElementById('category-filter');
  var loading = document.getElementById('portfolio-loading');
  var filters = document.querySelector('.portfolio-filters');
  
  if (!grid || !categoryFilter) return;

  // --- POCKETBASE INTEGRATION START ---
  // Ensure the SDK is loaded in your HTML before this script!
  // <script src="https://cdnjs.cloudflare.com/ajax/libs/pocketbase/0.21.1/pocketbase.umd.min.js"></script>
  
  const pb = new PocketBase('https://api.sur3.space');

  // Fetch all portfolio items full list
  pb.collection('portfolio').getFullList({
    sort: '-created',
  })
  .then(function (result) {
    // OLD CODE (Wrong for getFullList):
    // const projects = result.items.map(record => ({ ... }));

    // NEW CODE (Correct for getFullList):
    // 'result' IS the array of items directly
    const projects = result.map(record => ({
      name: record.name,
      slug: record.slug,
      categories: record.categories || [],
      image: record.image_url || '',
      repo_url: record.repo_url,
      description: record.description,
      language: record.language,
      stars: record.stars,
      indexed_content: record.content || '',
    }));

    return projects;
  })
  // --- POCKETBASE INTEGRATION END ---

    .then(function (projects) {
      window.PORTFOLIO_PROJECTS = projects;
      
      // Initialize Fuse.js search index
      if (typeof Fuse !== 'undefined') {
        window.FUSE_INDEX = new Fuse(projects, {
          keys: [
            { name: 'name', weight: 0.4 },
            { name: 'categories', weight: 0.3 },
            { name: 'description', weight: 0.3 } // Changed from indexed_content
          ],
          threshold: 0.4,
          distance: 100,
          minMatchCharLength: 2,
          includeScore: true,
          includeMatches: true,
          ignoreLocation: true,
          useExtendedSearch: false
        });
      } else {
        console.warn('Fuse.js not loaded, search will use basic matching');
      }
      
      // Hide loading message
      if (loading) loading.style.display = 'none';
      if (filters) filters.style.display = '';
      
      // Populate category dropdown
      var categories = {};
      var languages = {};
      projects.forEach(function (p) {
        var cats = p.categories && p.categories.length ? p.categories : ['Uncategorized'];
        cats.forEach(function (cat) {
          categories[cat] = (categories[cat] || 0) + 1;
        });
        
        if (p.language) {
          languages[p.language] = (languages[p.language] || 0) + 1;
        }
      });

      var catKeys = Object.keys(categories).sort();
      categoryFilter.innerHTML = '<option value="">All Categories (' + projects.length + ')</option>';
      catKeys.forEach(function (cat) {
        var option = document.createElement('option');
        option.value = cat;
        option.textContent = cat + ' (' + categories[cat] + ')';
        categoryFilter.appendChild(option);
      });
      
      // Populate language filter
      var languageFilter = document.getElementById('language-filter');
      if (languageFilter) {
        var langKeys = Object.keys(languages).sort();
        languageFilter.innerHTML = '<option value="">All Languages (' + projects.length + ')</option>';
        langKeys.forEach(function (lang) {
          var option = document.createElement('option');
          option.value = lang;
          option.textContent = lang + ' (' + languages[lang] + ')';
          languageFilter.appendChild(option);
        });
      }
      
      // Render project cards
      projects.forEach(function (project, index) {
        var wrapper = document.createElement('div');
        wrapper.className = 'portfolio-card-wrapper col-6 col-md-4 col-lg-3 mb-4';
        wrapper.dataset.index = index;
        wrapper.dataset.name = (project.name || '').toLowerCase();
        wrapper.dataset.categories = (project.categories && project.categories.length) ? project.categories.join(',') : 'Uncategorized';
        wrapper.dataset.search = (project.description || '').toLowerCase(); // Use description for search
        
        wrapper.dataset.language = project.language || '';
        wrapper.dataset.stars = project.stars || 0;
        
        var placeholderImg = '/assets/images/portfolio-placeholder.svg';
        // Check if image is valid URL
        var imgSrc = project.image && project.image.startsWith('http') ? project.image : placeholderImg;
        
        wrapper.innerHTML = 
          '<a href="#" class="portfolio-card text-decoration-none" data-project-index="' + index + '" title="' + (project.name || '') + '">' +
            '<div class="portfolio-card-image">' +
              '<img src="' + imgSrc + '" alt="' + (project.name || '') + '" loading="lazy" onerror="this.src=\'' + placeholderImg + '\'"/>' +
              '<span class="portfolio-card-title">' + (project.name || '') + '</span>' +
            '</div>' +
          '</a>';
        
        grid.appendChild(wrapper);
      });
      
      // Trigger portfolio init
      if (window.initPortfolio) {
        window.initPortfolio();
      }
    })
    .catch(function (error) {
      console.error('Error loading portfolio:', error);
      if (loading) loading.innerHTML = '<p class="text-danger">Failed to load portfolio. Please refresh the page.</p>';
    });
})();