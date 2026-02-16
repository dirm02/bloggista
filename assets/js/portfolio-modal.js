(function () {
  'use strict';

  // Wait for projects to be loaded
  function initModal() {
    var PROJECTS = window.PORTFOLIO_PROJECTS || [];
    if (PROJECTS.length === 0) {
      setTimeout(initModal, 100);
      return;
    }

    var modal = document.getElementById('readmeModal');
    var modalTitle = document.getElementById('readmeModalLabel');
    var readmeContent = document.getElementById('readme-content');
    var githubLink = document.getElementById('github-link');
    
    if (!modal || !modalTitle || !readmeContent || !githubLink) return;

    var bsModal = new bootstrap.Modal(modal);

    // Handle card clicks
    document.addEventListener('click', function (e) {
      var card = e.target.closest('[data-project-index]');
      if (!card) return;
      
      e.preventDefault();
      var index = parseInt(card.dataset.projectIndex, 10);
      var project = PROJECTS[index];
      
      if (!project) return;

      // Update modal content
      modalTitle.textContent = project.name;
      githubLink.href = project.repo_url;
      
      // Show loading state
      readmeContent.innerHTML = '<div class="text-center p-4"><div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div></div>';
      bsModal.show();
      
      // Fetch README from GitHub
      var readmeUrl = project.repo_url + '/raw/master/README.md';
      
      fetch(readmeUrl)
        .then(function(response) {
          if (!response.ok) {
            // Try main branch if master fails
            return fetch(project.repo_url + '/raw/main/README.md');
          }
          return response;
        })
        .then(function(response) {
          if (!response.ok) throw new Error('README not found');
          return response.text();
        })
        .then(function(markdown) {
          // Simple markdown-to-HTML (basic support)
          readmeContent.innerHTML = '<pre style="white-space: pre-wrap; font-family: inherit;">' + markdown + '</pre>';
        })
        .catch(function(error) {
          readmeContent.innerHTML = '<div class="alert alert-warning">Unable to load README. <a href="' + project.repo_url + '" target="_blank">View on GitHub</a></div>';
        });
    });
  }

  initModal();
})();
