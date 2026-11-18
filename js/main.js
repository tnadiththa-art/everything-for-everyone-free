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

  toggleBtn.addEventListener('click', () => {
    const isExpanded = toggleBtn.getAttribute('aria-expanded') === 'true';
    toggleBtn.setAttribute('aria-expanded', String(!isExpanded));
    siteNav.classList.toggle('is-open');
  });

  // Close menu on pressing Escape
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && siteNav.classList.contains('is-open')) {
      siteNav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
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
      siteNav.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
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

    // Normalize comparison
    const isExactMatch =
      currentPath.endsWith(href) ||
      (currentPath.endsWith('/') && href.endsWith('index.html')) ||
      (href === 'index.html' && (currentPath.endsWith('/') || currentPath.endsWith('/index.html')));

    if (isExactMatch) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
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
