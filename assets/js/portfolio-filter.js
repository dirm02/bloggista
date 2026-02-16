(function () {
  'use strict';

  var searchInput = document.getElementById('search-input');
  var categoryFilter = document.getElementById('category-filter');
  var cards = document.querySelectorAll('.portfolio-card-wrapper');
  
  if (!searchInput || !categoryFilter || cards.length === 0) return;

  function filterProjects() {
    var searchQuery = searchInput.value.toLowerCase().trim();
    var selectedCategory = categoryFilter.value;
    var visibleCount = 0;

    cards.forEach(function (card) {
      var name = card.dataset.name || '';
      var category = card.dataset.category || '';
      var searchContent = card.dataset.search || '';

      var matchesSearch = !searchQuery || 
        name.includes(searchQuery) || 
        searchContent.includes(searchQuery);
      
      var matchesCategory = !selectedCategory || category === selectedCategory;

      if (matchesSearch && matchesCategory) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    // Update pagination based on visible cards
    if (window.updatePagination) {
      window.updatePagination(visibleCount);
    }
  }

  searchInput.addEventListener('input', filterProjects);
  categoryFilter.addEventListener('change', filterProjects);
})();
