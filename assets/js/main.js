/**
 * Novaflow - Main Interactive JavaScript
 * Handles global navigation, mobile drawer, accordions, tabs, modals, and back-to-top
 */

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initBackToTop();
  initAccordions();
  initTabs();
  initModals();
  highlightActiveNav();
});

/**
 * Mobile Navigation Menu Toggle
 */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIconOpen = document.getElementById('menu-icon-open');
  const menuIconClose = document.getElementById('menu-icon-close');

  if (!menuBtn || !mobileMenu) return;

  menuBtn.addEventListener('click', () => {
    const isHidden = mobileMenu.classList.contains('hidden');
    if (isHidden) {
      mobileMenu.classList.remove('hidden');
      if (menuIconOpen) menuIconOpen.classList.add('hidden');
      if (menuIconClose) menuIconClose.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
      if (menuIconOpen) menuIconOpen.classList.remove('hidden');
      if (menuIconClose) menuIconClose.classList.add('hidden');
    }
  });

  // Close mobile menu on resize to desktop
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && !mobileMenu.classList.contains('hidden')) {
      mobileMenu.classList.add('hidden');
      if (menuIconOpen) menuIconOpen.classList.remove('hidden');
      if (menuIconClose) menuIconClose.classList.add('hidden');
    }
  });
}

/**
 * Back to Top Floating Button
 */
function initBackToTop() {
  const backToTopBtn = document.getElementById('back-to-top-btn');
  if (!backToTopBtn) return;

  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.add('opacity-100', 'translate-y-0');
    } else {
      backToTopBtn.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      backToTopBtn.classList.remove('opacity-100', 'translate-y-0');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/**
 * Accordion Component Toggle (for FAQs)
 */
function initAccordions() {
  const accordionButtons = document.querySelectorAll('[data-accordion-target]');
  
  accordionButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const targetId = btn.getAttribute('data-accordion-target');
      const targetContent = document.getElementById(targetId);
      const icon = btn.querySelector('.accordion-chevron');
      
      if (!targetContent) return;

      const isExpanded = btn.getAttribute('aria-expanded') === 'true';

      // Optionally close other items in the same accordion group
      const parentGroup = btn.closest('[data-accordion-group]');
      if (parentGroup) {
        parentGroup.querySelectorAll('[data-accordion-target]').forEach(otherBtn => {
          if (otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            const otherTarget = document.getElementById(otherBtn.getAttribute('data-accordion-target'));
            if (otherTarget) otherTarget.classList.add('hidden');
            const otherIcon = otherBtn.querySelector('.accordion-chevron');
            if (otherIcon) otherIcon.classList.remove('rotate-180');
          }
        });
      }

      if (isExpanded) {
        btn.setAttribute('aria-expanded', 'false');
        targetContent.classList.add('hidden');
        if (icon) icon.classList.remove('rotate-180');
      } else {
        btn.setAttribute('aria-expanded', 'true');
        targetContent.classList.remove('hidden');
        if (icon) icon.classList.add('rotate-180');
      }
    });
  });
}

/**
 * Tab Switcher Component
 */
function initTabs() {
  const tabContainers = document.querySelectorAll('[data-tabs-container]');
  
  tabContainers.forEach(container => {
    const tabButtons = container.querySelectorAll('[data-tab-target]');
    const tabPanels = container.querySelectorAll('[data-tab-panel]');

    tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const targetId = btn.getAttribute('data-tab-target');

        // Reset button states
        tabButtons.forEach(b => {
          b.classList.remove('bg-indigo-600', 'text-white', 'shadow-md');
          b.classList.add('text-slate-600', 'hover:text-slate-900', 'bg-slate-100');
        });

        // Activate clicked button
        btn.classList.add('bg-indigo-600', 'text-white', 'shadow-md');
        btn.classList.remove('text-slate-600', 'hover:text-slate-900', 'bg-slate-100');

        // Toggle panel display
        tabPanels.forEach(panel => {
          if (panel.id === targetId) {
            panel.classList.remove('hidden');
          } else {
            panel.classList.add('hidden');
          }
        });
      });
    });
  });
}

/**
 * Generic Modal Dialogs (Demo Video, Terms, Forgot Password)
 */
function initModals() {
  const modalTriggers = document.querySelectorAll('[data-modal-open]');
  const modalCloses = document.querySelectorAll('[data-modal-close]');

  modalTriggers.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const modalId = trigger.getAttribute('data-modal-open');
      const modal = document.getElementById(modalId);
      if (modal) {
        modal.classList.remove('hidden');
        document.body.classList.add('overflow-hidden');
      }
    });
  });

  modalCloses.forEach(btn => {
    btn.addEventListener('click', () => {
      const modal = btn.closest('[data-modal-container]');
      if (modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  });

  // Close modal when clicking on backdrop
  document.querySelectorAll('[data-modal-container]').forEach(modal => {
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.add('hidden');
        document.body.classList.remove('overflow-hidden');
      }
    });
  });

  // Close modal on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      document.querySelectorAll('[data-modal-container]').forEach(modal => {
        modal.classList.add('hidden');
      });
      document.body.classList.remove('overflow-hidden');
    }
  });
}

/**
 * Highlights Current Page in Navigation
 */
function highlightActiveNav() {
  const currentPath = window.location.pathname;
  const navLinks = document.querySelectorAll('.nav-item');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (!href) return;

    // Check if current URL matches the link
    const isCurrent = 
      (href.endsWith('index.html') && (currentPath.endsWith('/') || currentPath.endsWith('index.html'))) ||
      (!href.endsWith('index.html') && currentPath.includes(href.replace('../', '').replace('src/pages/', '')));

    if (isCurrent) {
      link.classList.add('text-indigo-600', 'font-semibold', 'bg-indigo-50/80');
      link.classList.remove('text-slate-600');
    }
  });
}
