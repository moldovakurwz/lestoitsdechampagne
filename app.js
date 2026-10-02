(() => {
  // Homepage contact route. Add the GA4 ID only when the account is ready.
  // Analytics stays completely unloaded until the visitor opts in.
  const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mvkgjyrv';
  const GA4_MEASUREMENT_ID = '';

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

  const contactForm = document.querySelector('[data-contact-form]');
  if (contactForm) {
    const endpoint = FORMSPREE_ENDPOINT.trim();
    const submit = contactForm.querySelector('[type="submit"]');
    const status = contactForm.querySelector('[data-form-status]');
    if (endpoint) {
      contactForm.action = endpoint;
    } else if (submit && status) {
      submit.disabled = true;
      status.textContent = 'Le formulaire sera activé dès que son endpoint Formspree sera configuré. Vous pouvez nous joindre par téléphone ou par e-mail.';
    }
  }

  const consentKey = 'ltdc-analytics-consent-v1';
  const consentLifetime = 183 * 24 * 60 * 60 * 1000;
  const readConsent = () => {
    try {
      const record = JSON.parse(localStorage.getItem(consentKey) || 'null');
      if (!record || Date.now() - record.savedAt > consentLifetime) return null;
      return record.choice;
    } catch { return null; }
  };
  const writeConsent = (choice) => {
    try { localStorage.setItem(consentKey, JSON.stringify({ choice, savedAt: Date.now() })); } catch { /* preference storage may be unavailable */ }
  };
  const withdrawAnalytics = () => {
    if (typeof window.gtag === 'function') {
      window.gtag('consent', 'update', { analytics_storage: 'denied', ad_storage: 'denied' });
    }
    document.querySelector('[data-ga4-loader]')?.remove();
    window.dataLayer = [];
    window.gtag = undefined;
    const cookieNames = document.cookie.split(';').map((item) => item.trim().split('=')[0]).filter((name) => /^_(ga|gid|gat)/.test(name));
    const domains = ['', `; domain=${location.hostname}`, `; domain=.${location.hostname.replace(/^www\./, '')}`];
    cookieNames.forEach((name) => domains.forEach((domain) => {
      document.cookie = `${name}=; Max-Age=0; path=/${domain}; SameSite=Lax`;
    }));
  };
  const loadAnalytics = () => {
    if (!GA4_MEASUREMENT_ID || document.querySelector('[data-ga4-loader]')) return;
    const script = document.createElement('script');
    script.async = true;
    script.dataset.ga4Loader = 'true';
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA4_MEASUREMENT_ID)}`;
    document.head.append(script);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function(){ window.dataLayer.push(arguments); };
    window.gtag('consent', 'default', { analytics_storage: 'denied', ad_storage: 'denied' });
    window.gtag('consent', 'update', { analytics_storage: 'granted' });
    window.gtag('js', new Date());
    window.gtag('config', GA4_MEASUREMENT_ID);
  };
  let consentPanel;
  const showConsent = () => {
    if (!GA4_MEASUREMENT_ID) return;
    if (!consentPanel) {
      consentPanel = document.createElement('aside');
      consentPanel.className = 'cookie-consent';
      consentPanel.setAttribute('aria-label', 'Préférences de cookies');
      consentPanel.innerHTML = '<div><strong>Mesure d’audience</strong><p>Avec votre accord, Google Analytics 4 nous aidera à comprendre la fréquentation du site. Vous pouvez refuser ou modifier votre choix à tout moment.</p><a href="politique-confidentialite.html">En savoir plus</a></div><div class="cookie-actions"><button type="button" data-consent="reject">Tout refuser</button><button type="button" class="cookie-accept" data-consent="accept">Accepter</button></div>';
      document.body.append(consentPanel);
      consentPanel.querySelector('[data-consent="accept"]').addEventListener('click', () => {
        writeConsent('accepted');
        consentPanel.remove();
        loadAnalytics();
      });
      consentPanel.querySelector('[data-consent="reject"]').addEventListener('click', () => {
        writeConsent('rejected');
        withdrawAnalytics();
        consentPanel.remove();
      });
    }
    consentPanel.hidden = false;
  };
  document.querySelectorAll('[data-cookie-settings]').forEach((button) => {
    if (!GA4_MEASUREMENT_ID) {
      button.hidden = true;
      return;
    }
    button.addEventListener('click', () => {
      withdrawAnalytics();
      try { localStorage.removeItem(consentKey); } catch { /* preference storage may be unavailable */ }
      if (consentPanel) consentPanel.remove();
      consentPanel = null;
      showConsent();
    });
  });
  if (GA4_MEASUREMENT_ID) {
    if (readConsent() === 'accepted') loadAnalytics();
    else if (!readConsent()) showConsent();
  }
})();
