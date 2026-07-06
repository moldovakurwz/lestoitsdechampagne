/* ============================================================
   LES TOITS DE CHAMPAGNE — APP.JS
   Menu, FAQ, Forms, Scroll effects, Float phone
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── MOBILE MENU ── */
  const burger  = document.querySelector('.burger');
  const nav     = document.querySelector('.main-nav');
  if (burger && nav) {
    burger.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      burger.classList.toggle('open', open);
      burger.setAttribute('aria-expanded', open);
    });
    document.querySelectorAll('.main-nav a').forEach(a =>
      a.addEventListener('click', () => {
        nav.classList.remove('open');
        burger.classList.remove('open');
      })
    );
  }

  /* ── STICKY HEADER SHADOW ── */
  const header = document.querySelector('.main-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 30);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── FAQ ACCORDION ── */
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', () => {
      const item    = btn.closest('.faq-item');
      const wasOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(el => el.classList.remove('open'));
      // Toggle current
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ── DEVIS FORM — all instances ── */
  document.querySelectorAll('.devis-form').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn      = form.querySelector('button[type="submit"]');
      const feedback = form.querySelector('.form-success');
      const orig     = btn.textContent;

      btn.disabled    = true;
      btn.textContent = 'Envoi en cours…';

      // Simulated 1.2s network delay
      setTimeout(() => {
        form.reset();
        btn.disabled    = false;
        btn.textContent = orig;
        if (feedback) {
          feedback.style.display = 'block';
          setTimeout(() => (feedback.style.display = 'none'), 8000);
        }
      }, 1200);
    });
  });

  /* ── SMOOTH SCROLL for anchor links ── */
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', e => {
      const target = document.querySelector(a.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = parseInt(getComputedStyle(document.documentElement)
          .getPropertyValue('--total-header')) || 110;
        const top = target.getBoundingClientRect().top + window.scrollY - offset - 16;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ── ACTIVE NAV LINK (highlight current page) ── */
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.main-nav a').forEach(a => {
    const href = a.getAttribute('href');
    if (href && (href === currentPage || (currentPage === '' && href === 'index.html'))) {
      a.classList.add('active');
    }
  });

});
