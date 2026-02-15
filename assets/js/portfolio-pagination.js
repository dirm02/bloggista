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

  function showPage(page) {
    var start = (page - 1) * PER_PAGE;
    var end = start + PER_PAGE;

    cards.forEach(function (card, i) {
      card.style.display = i >= start && i < end ? '' : 'none';
    });
  }

  function renderControls(currentPage) {
    var html = '<nav aria-label="Portfolio pagination"><ul class="pagination justify-content-center flex-wrap">';

    if (currentPage > 1) {
      html += '<li class="page-item"><a class="page-link" href="#" data-page="' + (currentPage - 1) + '">Previous</a></li>';
    }

    for (var p = 1; p <= totalPages; p++) {
      var active = p === currentPage ? ' active' : '';
      html += '<li class="page-item' + active + '"><a class="page-link" href="#" data-page="' + p + '">' + p + '</a></li>';
    }

    if (currentPage < totalPages) {
      html += '<li class="page-item"><a class="page-link" href="#" data-page="' + (currentPage + 1) + '">Next</a></li>';
    }

    html += '</ul></nav>';
    controls.innerHTML = html;

    controls.querySelectorAll('.page-link').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var p = parseInt(link.getAttribute('data-page'), 10);
        if (p >= 1 && p <= totalPages) {
          showPage(p);
          renderControls(p);
          window.scrollTo({ top: grid.offsetTop - 80, behavior: 'smooth' });
        }
      });
    });
  }

  showPage(1);
  renderControls(1);
})();
