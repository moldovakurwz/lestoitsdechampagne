(() => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav');
  const serviceToggle = document.querySelector('.mega-toggle');
  const serviceGroup = document.querySelector('.nav-group');

  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('is-open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Fermer le menu' : 'Ouvrir le menu');
      toggle.textContent = open ? '×' : '☰';
    });
  }

  if (serviceToggle && serviceGroup) {
    serviceToggle.addEventListener('click', () => {
      const open = serviceGroup.classList.toggle('is-open');
      serviceToggle.setAttribute('aria-expanded', String(open));
    });
    document.addEventListener('click', (event) => {
      if (!serviceGroup.contains(event.target)) {
        serviceGroup.classList.remove('is-open');
        serviceToggle.setAttribute('aria-expanded', 'false');
      }
    });
    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') {
        serviceGroup.classList.remove('is-open');
        serviceToggle.setAttribute('aria-expanded', 'false');
        serviceToggle.focus();
      }
    });
  }

  if (nav && toggle) {
    nav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', () => {
        nav.classList.remove('is-open');
        toggle.setAttribute('aria-expanded', 'false');
        toggle.setAttribute('aria-label', 'Ouvrir le menu');
        toggle.textContent = '☰';
      });
    });
  }

  document.querySelectorAll('[data-year]').forEach((node) => {
    node.textContent = String(new Date().getFullYear());
  });
})();
