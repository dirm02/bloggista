(function () {
  'use strict';

  var grid = document.getElementById('portfolio-grid');
  var categoryFilter = document.getElementById('category-filter');
  var loading = document.getElementById('portfolio-loading');
  var filters = document.querySelector('.portfolio-filters');
  
  if (!grid || !categoryFilter) return;

  // Fetch portfolio data
  fetch('/assets/data/portfolio.json')
    .then(function (response) {
      if (!response.ok) throw new Error('Failed to load portfolio');
      return response.json();
    })
    .then(function (projects) {
      window.PORTFOLIO_PROJECTS = projects;
      
      // Hide loading message
      if (loading) loading.style.display = 'none';
      if (filters) filters.style.display = '';
      
      // Populate category dropdown (count = number of projects that have this category)
      var categories = {};
      projects.forEach(function (p) {
        var cats = p.categories && p.categories.length ? p.categories : ['Uncategorized'];
        cats.forEach(function (cat) {
          categories[cat] = (categories[cat] || 0) + 1;
        });
      });

      var catKeys = Object.keys(categories).sort();
      categoryFilter.innerHTML = '<option value="">All Categories (' + projects.length + ')</option>';
      catKeys.forEach(function (cat) {
        var option = document.createElement('option');
        option.value = cat;
        option.textContent = cat + ' (' + categories[cat] + ')';
        categoryFilter.appendChild(option);
      });
      
      // Render project cards (one card per project; categories stored for filtering)
      projects.forEach(function (project, index) {
        var wrapper = document.createElement('div');
        wrapper.className = 'portfolio-card-wrapper col-6 col-md-4 col-lg-3 mb-4';
        wrapper.dataset.index = index;
        wrapper.dataset.name = (project.name || '').toLowerCase();
        wrapper.dataset.categories = (project.categories && project.categories.length) ? project.categories.join(',') : 'Uncategorized';
        wrapper.dataset.search = (project.indexed_content || '').toLowerCase();
        
        var placeholderImg = '/assets/images/portfolio-placeholder.svg';
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
      
      // Trigger portfolio init (pagination, filter, modal)
      if (window.initPortfolio) {
        window.initPortfolio();
      }
    })
    .catch(function (error) {
      console.error('Error loading portfolio:', error);
      if (loading) loading.innerHTML = '<p class="text-danger">Failed to load portfolio. Please refresh the page.</p>';
    });
})();
