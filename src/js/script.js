'use strict';

//NAVBAR TOGGLE
const header = document.querySelector("[data-header]");
const navToggleBtn = document.querySelector("[data-nav-toggle-btn]");

navToggleBtn.addEventListener("click", function () {
  header.classList.toggle("nav-active");
  this.classList.toggle("active");
});

//TOGGLE NAVBAR WHEN CLICKING ANY LINK
const navbarLinks = document.querySelectorAll("[data-nav-link]");
for (let i = 0; i < navbarLinks.length; i++) {
  navbarLinks[i].addEventListener("click", function () {
    header.classList.toggle("nav-active");
    navToggleBtn.classList.toggle("active");
  });
}

//BACK TO TOP
const backTopBtn = document.querySelector("[data-back-to-top]");
window.addEventListener("scroll", function () {
  if (window.scrollY >= 100) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
  }
});

document.addEventListener('DOMContentLoaded', function() {
  const tabButtons = document.querySelectorAll('.tab-button');
  const tabContents = document.querySelectorAll('.tab-content');

  tabButtons.forEach(function(button) {
    button.addEventListener('click', function() {
      tabButtons.forEach(function(btn) { btn.classList.remove('active'); });
      this.classList.add('active');

      const tab = this.getAttribute('data-tab');
      tabContents.forEach(function(content) {
        if (content.id === tab) content.classList.remove('hidden');
        else content.classList.add('hidden');
      });
    });
  });
});

//LOAD PROJECTS
fetch('src/dat/projects.json')
  .then(res => res.json())
  .then(projects => {
    const tabs = { programming: '#programming', 'game-dev': '#game-dev', art: '#art' };
    Object.keys(projects).forEach(tab => {
      const container = document.querySelector(tabs[tab]);
      if (!container) return;

      projects[tab].forEach(p => {
        const overlayHtml = p.overlay ? `
          <div class="image-overlay">
            <a class="project-img-text">${p.overlay}</a>
          </div>` : '';

        const html = `
          <div class="project">
            <div class="image-container">
              <img loading="lazy" src="${p.img}" alt="${p.title}">
              ${overlayHtml}
            </div>
            <div class="project-details">
              <h3 class="project-title">${p.title}</h3>
              <p class="project-subtitle">${p.subtitle}</p>
              <p class="project-text">${p.desc || ''}</p>
              <div class="project-buttons">
                ${(p.links || []).map(l => `<a href="${l.href}" class="project-button">${l.label}</a>`).join('')}
              </div>
            </div>
          </div>`;
        container.insertAdjacentHTML('beforeend', html);
      });
    });
  });
