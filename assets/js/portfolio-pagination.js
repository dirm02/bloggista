(function () {
  'use strict';

  var PROJECTS = window.PORTFOLIO_PROJECTS || [];
  var PER_PAGE = 12;

  if (PROJECTS.length === 0) return;

  var grid = document.getElementById('portfolio-grid');
  var controls = document.getElementById('pagination-controls');
  if (!grid || !controls) return;

  var cards = grid.querySelectorAll('.portfolio-card-wrapper');
  var totalPages = Math.ceil(cards.length / PER_PAGE);

  if (totalPages <= 1) return;

  function showPage(page, cardsList) {
    cardsList = cardsList || cards;
    var start = (page - 1) * PER_PAGE;
    var end = start + PER_PAGE;

    cardsList.forEach(function (card, i) {
      card.style.display = i >= start && i < end ? '' : 'none';
    });
  }

  function renderControls(currentPage, cardsList) {
    cardsList = cardsList || cards;
    var pages = Math.ceil(cardsList.length / PER_PAGE);
    
    if (pages <= 1) {
      controls.innerHTML = '';
      cardsList.forEach(function (card) { card.style.display = ''; });
      return;
    }
    
    var html = '<nav aria-label="Portfolio pagination"><ul class="pagination justify-content-center flex-wrap">';

    if (currentPage > 1) {
      html += '<li class="page-item"><a class="page-link" href="#" data-page="' + (currentPage - 1) + '">Previous</a></li>';
    }

    for (var p = 1; p <= pages; p++) {
      var active = p === currentPage ? ' active' : '';
      html += '<li class="page-item' + active + '"><a class="page-link" href="#" data-page="' + p + '">' + p + '</a></li>';
    }

    if (currentPage < pages) {
      html += '<li class="page-item"><a class="page-link" href="#" data-page="' + (currentPage + 1) + '">Next</a></li>';
    }

    html += '</ul></nav>';
    controls.innerHTML = html;

    controls.querySelectorAll('.page-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var p = parseInt(link.getAttribute('data-page'), 10);
        if (p >= 1 && p <= pages) {
          showPage(p, cardsList);
          renderControls(p, cardsList);
          window.scrollTo({ top: grid.offsetTop - 80, behavior: 'smooth' });
        }
      });
    });
  }

  // Export function for filter to call
  window.updatePagination = function(visibleCount) {
    var visibleCards = Array.from(cards).filter(function (c) { return c.style.display !== 'none'; });
    var pages = Math.ceil(visibleCards.length / PER_PAGE);
    
    if (pages <= 1) {
      controls.innerHTML = '';
      visibleCards.forEach(function (card) { card.style.display = ''; });
      return;
    }
    
    showPage(1, visibleCards);
    renderControls(1, visibleCards);
  };

  showPage(1);
  renderControls(1);
})();
