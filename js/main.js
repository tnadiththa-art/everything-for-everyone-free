/**
 * Everything for Everyone Free - main.js
 * Lightweight vanilla JavaScript (zero external dependencies).
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileNav();
  highlightActiveNav();
  initCurrentYear();
});

/**
 * Mobile Navigation Menu Toggle with ARIA state handling
 */
function initMobileNav() {
  const toggleBtn = document.querySelector('.nav-toggle');
  const siteNav = document.querySelector('.site-nav');

  if (!toggleBtn || !siteNav) return;

  function toggleMenu(open) {
    const shouldOpen = typeof open === 'boolean' ? open : toggleBtn.getAttribute('aria-expanded') !== 'true';
    toggleBtn.setAttribute('aria-expanded', String(shouldOpen));
    siteNav.classList.toggle('is-open', shouldOpen);
  }

  toggleBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
  });

  // Close menu on pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
      toggleMenu(false);
      toggleBtn.focus();
    }
  });

  // Close when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (
      siteNav.classList.contains('is-open') &&
      !siteNav.contains(e.target) &&
      !toggleBtn.contains(e.target)
    ) {
      toggleMenu(false);
    }
  });

  // Close mobile nav after clicking any nav link
  const navLinks = siteNav.querySelectorAll('a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      if (window.innerWidth < 768 && siteNav.classList.contains('is-open')) {
        toggleMenu(false);
      }
    });
  });

  // Reset menu state if viewport is resized beyond mobile threshold
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && siteNav.classList.contains('is-open')) {
      toggleMenu(false);
    }
  });
}

/**
 * Auto-highlight current navigation link matching the pathname
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.site-nav a');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Check if link matches current page (ignoring fragments)
    const cleanHref = href.split('#')[0];
    if (!cleanHref) return;

    const isMatch =
      currentPath.endsWith(cleanHref) ||
      (currentPath.endsWith('/') && cleanHref.endsWith('index.html')) ||
      (cleanHref === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')));

    if (isMatch) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');

      // If link is inside dropdown, also mark parent trigger active
      const dropdownParent = link.closest('.nav-dropdown');
      if (dropdownParent) {
        const trigger = dropdownParent.querySelector('.nav-dropdown-trigger');
        if (trigger) trigger.classList.add('active');
      }
    }
  });
}

/**
 * Populate dynamic current year in footer
 */
function initCurrentYear() {
  const yearEls = document.querySelectorAll('.current-year');
  const currentYear = new Date().getFullYear();
  yearEls.forEach((el) => {
    el.textContent = currentYear;
  });
}
