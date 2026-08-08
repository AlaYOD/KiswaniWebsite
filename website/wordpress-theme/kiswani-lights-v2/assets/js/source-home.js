(() => {
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const intro = document.querySelector('[data-ks-cinematic-intro]');
  if (intro) {
    // The deployed source replays the intro on every homepage render, including
    // a reload or a return from another route in the same session, so it is not
    // gated on storage here either. Reduced motion still skips it.
    if (reducedMotion) {
      intro.remove();
    } else {
      let leavingTimer = 0;
      let finishTimer = 0;
      const finishIntro = () => {
        clearTimeout(leavingTimer);
        clearTimeout(finishTimer);
        document.body.classList.remove('ks-intro-locked');
        intro.remove();
        document.removeEventListener('keydown', escapeIntro);
      };
      const leaveIntro = () => {
        if (!intro.isConnected || intro.classList.contains('is-leaving')) return;
        intro.classList.add('is-leaving');
        finishTimer = window.setTimeout(finishIntro, 950);
      };
      const escapeIntro = (event) => { if (event.key === 'Escape') leaveIntro(); };
      intro.hidden = false;
      document.body.classList.add('ks-intro-locked');
      document.addEventListener('keydown', escapeIntro);
      leavingTimer = window.setTimeout(leaveIntro, 3250);
    }
  }

  const header = document.querySelector('[data-ks-header]');
  const menu = document.querySelector('#mobile-navigation');
  const backdrop = document.querySelector('[data-ks-mobile-menu-backdrop]');
  const toggle = document.querySelector('.ks-menu-toggle');
  const menuOpenIcon = toggle?.querySelector('[data-ks-menu-open-icon]');
  const menuCloseIcon = toggle?.querySelector('[data-ks-menu-close-icon]');
  const menuCloseButton = menu?.querySelector('[data-ks-mobile-menu-close]');
  let menuCloseTimer = 0;

  const setMenuToggleState = (open) => {
    toggle?.setAttribute('aria-expanded', open ? 'true' : 'false');
    toggle?.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    if (menuOpenIcon) menuOpenIcon.hidden = open;
    if (menuCloseIcon) menuCloseIcon.hidden = !open;
  };
  const closeMenu = () => {
    window.clearTimeout(menuCloseTimer);
    menu?.classList.remove('is-open');
    backdrop?.classList.remove('is-open');
    menu?.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('ks-mobile-nav-locked');
    setMenuToggleState(false);
    menuCloseTimer = window.setTimeout(() => {
      if (backdrop && !menu?.classList.contains('is-open')) backdrop.hidden = true;
    }, reducedMotion ? 0 : 340);
  };
  const openMenu = () => {
    window.clearTimeout(menuCloseTimer);
    if (backdrop) backdrop.hidden = false;
    menu?.setAttribute('aria-hidden', 'false');
    document.body.classList.add('ks-mobile-nav-locked');
    setMenuToggleState(true);
    requestAnimationFrame(() => {
      menu?.classList.add('is-open');
      backdrop?.classList.add('is-open');
      menuCloseButton?.focus();
    });
  };
  toggle?.addEventListener('click', () => menu?.classList.contains('is-open') ? closeMenu() : openMenu());
  menuCloseButton?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);
  menu?.querySelectorAll('a').forEach((link) => link.addEventListener('click', closeMenu));

  const mobileGroupButtons = [...(menu?.querySelectorAll('[data-ks-mobile-group]') || [])];
  const mobilePanels = [...(menu?.querySelectorAll('[data-ks-mobile-panel]') || [])];
  const setMobileGroup = (key, expand) => {
    mobileGroupButtons.forEach((button) => {
      const active = expand && button.dataset.ksMobileGroup === key;
      button.classList.toggle('is-expanded', active);
      button.setAttribute('aria-expanded', active ? 'true' : 'false');
    });
    mobilePanels.forEach((panel) => {
      panel.hidden = !(expand && panel.dataset.ksMobilePanel === key);
    });
  };
  mobileGroupButtons.forEach((button) => button.addEventListener('click', () => {
    setMobileGroup(button.dataset.ksMobileGroup, button.getAttribute('aria-expanded') !== 'true');
  }));

  const desktopMenu = header?.querySelector('[data-ks-desktop-menu]');
  const megaMenu = header?.querySelector('#collection-mega-menu');
  const megaLinks = [...(desktopMenu?.querySelectorAll('[data-ks-menu-key]') || [])];
  const megaPanels = [...(megaMenu?.querySelectorAll('[data-ks-mega-panel]') || [])];
  let megaCloseTimer = 0;
  const closeMegaMenu = () => {
    window.clearTimeout(megaCloseTimer);
    megaMenu?.classList.remove('is-open');
    megaMenu?.setAttribute('aria-hidden', 'true');
    megaLinks.forEach((link) => {
      link.classList.remove('is-expanded');
      link.setAttribute('aria-expanded', 'false');
    });
    megaCloseTimer = window.setTimeout(() => {
      if (!megaMenu?.classList.contains('is-open')) {
        if (megaMenu) megaMenu.hidden = true;
        megaPanels.forEach((panel) => { panel.hidden = true; });
      }
    }, reducedMotion ? 0 : 220);
  };
  const openMegaMenu = (key) => {
    const panel = megaPanels.find((item) => item.dataset.ksMegaPanel === key);
    if (!megaMenu || !panel || window.innerWidth < 1280) return;
    window.clearTimeout(megaCloseTimer);
    megaPanels.forEach((item) => { item.hidden = item !== panel; });
    megaMenu.hidden = false;
    megaMenu.setAttribute('aria-hidden', 'false');
    megaLinks.forEach((link) => {
      const active = link.dataset.ksMenuKey === key;
      link.classList.toggle('is-expanded', active);
      link.setAttribute('aria-expanded', active ? 'true' : 'false');
    });
    requestAnimationFrame(() => megaMenu.classList.add('is-open'));
  };
  megaLinks.forEach((link) => {
    link.addEventListener('mouseenter', () => openMegaMenu(link.dataset.ksMenuKey));
    link.addEventListener('focus', () => openMegaMenu(link.dataset.ksMenuKey));
  });
  desktopMenu?.querySelectorAll('.ks-desktop-nav a:not([data-ks-menu-key])').forEach((link) => {
    link.addEventListener('mouseenter', closeMegaMenu);
    link.addEventListener('focus', closeMegaMenu);
  });
  desktopMenu?.addEventListener('mouseleave', closeMegaMenu);
  desktopMenu?.addEventListener('focusout', () => window.setTimeout(() => {
    if (!desktopMenu.contains(document.activeElement)) closeMegaMenu();
  }, 0));

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    closeMenu();
    closeMegaMenu();
  });
  window.addEventListener('resize', () => {
    if (window.innerWidth >= 1280) closeMenu();
    else closeMegaMenu();
  });
  const scenes = [
    ['editorial/hero-interior.webp', 'Interior lighting', 'Warm, considered light for everyday living.'],
    ['editorial/hero-decorative.webp', 'Decorative lighting', 'Statement pieces that give the room its character.'],
    ['editorial/hero-technical.webp', 'Technical lighting', 'Precise systems for architectural performance.'],
    ['editorial/hero-accent.webp', 'Accent lighting', 'Focused moments that reveal material and mood.'],
  ];
  const hero = document.querySelector('[data-ks-hero]');
  const heroImage = document.querySelector('[data-ks-hero-image]');
  const heroImageElement = document.querySelector('[data-ks-hero-image-element]');
  const sceneName = document.querySelector('[data-ks-scene-name]');
  const sceneDetail = document.querySelector('[data-ks-scene-detail]');
  const sceneIndex = document.querySelector('[data-ks-scene-index]');
  const sceneButtons = [...document.querySelectorAll('[data-ks-scene]')];
  let activeScene = 0;
  const setScene = (index) => { activeScene = index; const scene = scenes[index]; if (!scene || (!heroImage && !heroImageElement)) return; if (heroImageElement) { heroImageElement.classList.remove('is-entering'); void heroImageElement.offsetWidth; heroImageElement.src = `${window.ksThemeUri}/assets/images/${scene[0]}`; heroImageElement.alt = scene[1]; if (!reducedMotion) { heroImageElement.classList.add('is-entering'); window.setTimeout(() => heroImageElement.classList.remove('is-entering'), 800); } } else { heroImage.style.backgroundImage = `url(${window.ksThemeUri}/assets/images/${scene[0]})`; } sceneName.textContent = scene[1]; sceneDetail.textContent = scene[2]; sceneIndex.textContent = `0${index + 1}`; sceneButtons.forEach((button) => button.classList.toggle('is-active', Number(button.dataset.ksScene) === index)); };
  sceneButtons.forEach((button) => button.addEventListener('click', () => setScene(Number(button.dataset.ksScene))));
  if (!reducedMotion) setInterval(() => setScene((activeScene + 1) % scenes.length), 6000);

  if (!reducedMotion) {
    const revealNodes = [];
    const addReveal = (selector, options = {}) => {
      document.querySelectorAll(selector).forEach((node, index) => {
        const computed = getComputedStyle(node).transform;
        let restY = 0;
        if (computed && computed !== 'none') {
          const values = computed.match(/^matrix\((.+)\)$/)?.[1]?.split(',').map(Number);
          if (values?.length === 6) restY = values[5] || 0;
        }
        node.classList.add('ks-reveal');
        node.style.setProperty('--ks-motion-x', `${options.x || 0}px`);
        node.style.setProperty('--ks-motion-y', `${options.y ?? 28}px`);
        node.style.setProperty('--ks-motion-rest-y', `${restY}px`);
        node.style.setProperty('--ks-motion-duration', `${options.duration || 700}ms`);
        node.style.setProperty('--ks-motion-delay', `${(options.delay || 0) + index * (options.stagger || 0)}ms`);
        revealNodes.push(node);
      });
    };

    addReveal('.ks-header', { y: -14, duration: 650 });
    addReveal('.ks-hero__content > *', { y: 22, duration: 720, delay: 120, stagger: 110 });
    addReveal('.ks-metrics__grid > div', { y: 18, duration: 550, stagger: 90 });
    addReveal('.ks-statement__index', { x: -24, y: 0, duration: 650 });
    addReveal('.ks-statement__inner > h2', { y: 28, duration: 750 });
    addReveal('.ks-statement__inner > p', { y: 24, duration: 700, delay: 120 });
    addReveal('.ks-section-title', { y: 28, duration: 750 });
    addReveal('.ks-category-card', { y: 32, duration: 700, stagger: 70 });
    addReveal('.ks-stories__lead', { y: 22, duration: 700, delay: 100 });
    addReveal('.ks-story--main', { y: 28, duration: 750 });
    addReveal('.ks-story--side:first-child', { x: 24, y: 0, duration: 700, delay: 80 });
    addReveal('.ks-story--side:last-child', { x: -24, y: 0, duration: 700, delay: 160 });
    addReveal('.ks-type-card', { y: 24, duration: 650, stagger: 80 });
    addReveal('.ks-product-card', { y: 28, duration: 620 });
    addReveal('.ks-footer__brand h2', { y: 18, duration: 700 });

    const statementRule = document.querySelector('.ks-statement__index i');
    if (statementRule) {
      statementRule.classList.add('ks-motion-line');
      statementRule.style.setProperty('--ks-motion-duration', '800ms');
      statementRule.style.setProperty('--ks-motion-delay', '150ms');
      revealNodes.push(statementRule);
    }

    document.documentElement.classList.add('ks-motion-ready');
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        const metric = entry.target.querySelector?.('[data-ks-metric]');
        if (metric && metric.dataset.ksMetricAnimated !== 'true') {
          metric.dataset.ksMetricAnimated = 'true';
          const target = Number(metric.dataset.ksMetric || 0);
          const suffix = metric.dataset.ksMetricSuffix || '';
          const index = [...document.querySelectorAll('[data-ks-metric]')].indexOf(metric);
          const start = performance.now();
          const duration = 900 + Math.max(0, index) * 130;
          const tick = (time) => {
            const progress = Math.min((time - start) / duration, 1);
            metric.textContent = `${Math.round(target * (1 - Math.pow(1 - progress, 3)))}${suffix}`;
            if (progress < 1) requestAnimationFrame(tick);
          };
          metric.textContent = `0${suffix}`;
          requestAnimationFrame(tick);
        }
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -10% 0px', threshold: 0.08 });
    revealNodes.forEach((node) => revealObserver.observe(node));

    const illuminateObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.target.classList.contains('ks-wall-sconce')) {
          entry.target.classList.toggle('is-illuminated', entry.isIntersecting);
          return;
        }
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-illuminated');
        observer.unobserve(entry.target);
      });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.18 });
    [
      document.querySelector('.ks-wall-sconce'),
      document.querySelector('.ks-types'),
      document.querySelector('.ks-products'),
      document.querySelector('.ks-featured-project'),
      document.querySelector('.ks-footer--v2'),
    ].filter(Boolean).forEach((node) => illuminateObserver.observe(node));

    document.querySelectorAll('.ks-category-card').forEach((card) => {
      card.addEventListener('pointermove', (event) => {
        if (event.pointerType !== 'mouse') return;
        const bounds = card.getBoundingClientRect();
        const x = (event.clientX - bounds.left) / bounds.width;
        const y = (event.clientY - bounds.top) / bounds.height;
        card.style.setProperty('--ks-tilt-y', `${(x - .5) * 5}deg`);
        card.style.setProperty('--ks-tilt-x', `${(.5 - y) * 5}deg`);
      });
      card.addEventListener('pointerleave', () => {
        card.style.setProperty('--ks-tilt-x', '0deg');
        card.style.setProperty('--ks-tilt-y', '0deg');
      });
    });

    let parallaxFrame = 0;
    const updateHeroParallax = () => {
      parallaxFrame = 0;
      if (!hero) return;
      const top = hero.getBoundingClientRect().top;
      const progress = Math.min(1, Math.max(0, -top / Math.max(1, hero.offsetHeight)));
      hero.style.setProperty('--ks-hero-image-y', `${progress * 96}px`);
      hero.style.setProperty('--ks-hero-content-y', `${progress * 58}px`);
    };
    const requestHeroParallax = () => {
      if (!parallaxFrame) parallaxFrame = requestAnimationFrame(updateHeroParallax);
    };
    updateHeroParallax();
    window.addEventListener('scroll', requestHeroParallax, { passive: true });
    window.addEventListener('resize', requestHeroParallax);
  }
  const compare = document.querySelector('[data-ks-compare]');
  const after = document.querySelector('.ks-compare__after');
  const line = document.querySelector('[data-ks-compare-line]');
  compare?.addEventListener('input', () => { const value = `${compare.value}%`; if (after) after.style.width = value; if (line) line.style.left = value; });
  const search = document.querySelector('[data-ks-product-search]');
  const productCards = [...document.querySelectorAll('[data-ks-product-card]')];
  const productEmpty = document.querySelector('[data-ks-products-empty]');
  const applyProductSearch = () => {
    const term = search?.value.toLowerCase().trim() || '';
    let visible = 0;
    productCards.forEach((card) => {
      const haystack = `${card.textContent || ''} ${card.dataset.productCode || ''} ${card.dataset.ksProductDetails || ''}`.toLowerCase();
      card.hidden = Boolean(term) && !haystack.includes(term);
      if (!card.hidden) visible += 1;
    });
    if (productEmpty) productEmpty.hidden = visible > 0;
  };
  search?.addEventListener('input', applyProductSearch);
  document.querySelector('[data-ks-product-clear]')?.addEventListener('click', () => {
    if (!search) return;
    search.value = '';
    applyProductSearch();
    search.focus();
  });
  const requestedSearch = new URLSearchParams(window.location.search).get('search');
  if (search && requestedSearch) { search.value = requestedSearch; applyProductSearch(); }
  document.querySelectorAll('.ks-header-search, .ks-mobile-header-search form, .ks-mobile-search').forEach((form) => form.addEventListener('submit', (event) => {
    const value = form.querySelector('input[name="search"], input')?.value.trim() || '';
    if (!search || !value) return;
    event.preventDefault();
    search.value = value;
    search.dispatchEvent(new Event('input', { bubbles: true }));
    closeMenu();
    document.querySelector('#products')?.scrollIntoView({ behavior: matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  }));

  const productModal = document.querySelector('[data-ks-product-modal]');
  const productModalClose = productModal?.querySelector('[data-ks-product-modal-close]');
  const productModalImage = productModal?.querySelector('[data-ks-product-modal-image]');
  const productModalQuantity = productModal?.querySelector('#ks-product-modal-quantity');
  const productModalTotalWrap = productModal?.querySelector('[data-ks-product-modal-total-wrap]');
  const productModalTotal = productModal?.querySelector('[data-ks-product-modal-total]');
  const productModalThumbs = [...(productModal?.querySelectorAll('[data-ks-product-modal-thumb]') || [])];
  let activeProduct = null;
  let productModalLastFocus = null;
  const formatPrice = (value) => `₪${new Intl.NumberFormat('en-US').format(Number(value) || 0)}`;
  const setProductModalQuantity = (value) => {
    if (!productModalQuantity || !activeProduct) return;
    const quantity = Math.min(999, Math.max(1, Number.parseInt(value, 10) || 1));
    productModalQuantity.value = String(quantity);
    if (productModalTotalWrap) productModalTotalWrap.hidden = quantity === 1;
    if (productModalTotal) productModalTotal.textContent = formatPrice(activeProduct.price * quantity);
  };
  const selectProductModalImage = (index) => {
    if (!activeProduct || !productModalImage) return;
    const view = Math.min(3, Math.max(0, Number(index) || 0));
    productModalImage.src = activeProduct.gallery[view];
    productModalImage.alt = `${activeProduct.name} — ${['Full product view', 'Product detail view', 'Lighting detail view', 'Material detail view'][view]}`;
    productModalImage.dataset.view = String(view);
    const count = productModal?.querySelector('[data-ks-product-modal-count]');
    if (count) count.textContent = `0${view + 1} / 04`;
    productModalThumbs.forEach((button, buttonIndex) => {
      button.classList.toggle('is-active', buttonIndex === view);
      button.setAttribute('aria-pressed', buttonIndex === view ? 'true' : 'false');
    });
  };
  const renderProductModal = (product) => {
    activeProduct = { ...product, gallery: [product.image, `${product.image}?view=detail`, `${product.image}?view=ambient`, `${product.image}?view=material`] };
    productModal.querySelector('[data-ks-product-modal-code]').textContent = product.code;
    productModal.querySelector('[data-ks-product-modal-spec-code]').textContent = product.code;
    productModal.querySelector('[data-ks-product-modal-category]').textContent = product.category;
    productModal.querySelector('[data-ks-product-modal-title]').textContent = product.name;
    productModal.querySelector('[data-ks-product-modal-price]').textContent = formatPrice(product.price);
    productModal.querySelector('[data-ks-product-modal-description]').textContent = product.description;
    productModal.querySelector('[data-ks-product-modal-link]').href = product.url;
    const specs = productModal.querySelector('[data-ks-product-modal-specs]');
    specs.replaceChildren(...(product.specs || []).map(([label, value], index) => {
      const row = document.createElement('div');
      const number = document.createElement('span');
      const name = document.createElement('span');
      const detail = document.createElement('strong');
      number.textContent = String(index + 1).padStart(2, '0');
      name.textContent = label;
      detail.textContent = value;
      row.append(number, name, detail);
      return row;
    }));
    productModalThumbs.forEach((button, index) => {
      const image = button.querySelector('img');
      image.src = activeProduct.gallery[index];
      image.alt = '';
      button.dataset.view = String(index);
    });
    setProductModalQuantity(1);
    selectProductModalImage(0);
  };
  const closeProductModal = () => {
    if (!productModal || productModal.hidden) return;
    productModal.classList.remove('is-open');
    productModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('ks-modal-locked');
    setTimeout(() => {
      productModal.hidden = true;
      activeProduct = null;
      productModalLastFocus?.focus?.();
    }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 300);
  };
  const openProductModal = (card, trigger) => {
    if (!productModal) return;
    try { renderProductModal(JSON.parse(card.dataset.ksProductDetails || '{}')); } catch { return; }
    productModalLastFocus = trigger || document.activeElement;
    productModal.hidden = false;
    productModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('ks-modal-locked');
    requestAnimationFrame(() => { productModal.classList.add('is-open'); productModalClose?.focus(); });
  };
  productCards.forEach((card) => card.querySelectorAll('[data-ks-product-open]').forEach((trigger) => trigger.addEventListener('click', () => openProductModal(card, trigger))));
  productModalClose?.addEventListener('click', closeProductModal);
  productModal?.addEventListener('mousedown', (event) => { if (event.target === productModal) closeProductModal(); });
  productModalThumbs.forEach((button) => button.addEventListener('click', () => selectProductModalImage(button.dataset.ksProductModalThumb)));
  productModal?.querySelectorAll('[data-ks-product-modal-quantity]').forEach((button) => button.addEventListener('click', () => {
    const delta = button.dataset.ksProductModalQuantity === 'increase' ? 1 : -1;
    setProductModalQuantity((Number.parseInt(productModalQuantity?.value, 10) || 1) + delta);
  }));
  productModalQuantity?.addEventListener('change', () => setProductModalQuantity(productModalQuantity.value));
  productModal?.querySelector('[data-ks-product-modal-add]')?.addEventListener('click', () => {
    if (!activeProduct) return;
    window.KiswaniCart?.add(activeProduct.code, productModalQuantity?.value);
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeProductModal(); });

  const contactOverlay = document.querySelector('[data-ks-contact-drawer]');
  const contactTriggers = [...document.querySelectorAll('[data-ks-contact-open], a[href$="#contact"]')];
  const contactForm = contactOverlay?.querySelector('[data-ks-contact-form]');
  let contactLastFocus = null;
  const closeContact = () => {
    if (!contactOverlay || contactOverlay.hidden) return;
    contactOverlay.classList.remove('is-open');
    contactOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('ks-contact-locked');
    if (window.location.hash === '#contact') window.history.replaceState(null, '', `${window.location.pathname}${window.location.search}`);
    setTimeout(() => { contactOverlay.hidden = true; contactLastFocus?.focus?.(); }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 420);
  };
  const openContact = () => {
    if (!contactOverlay) return;
    contactLastFocus = document.activeElement;
    contactOverlay.hidden = false;
    contactOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('ks-contact-locked');
    requestAnimationFrame(() => {
      contactOverlay.classList.add('is-open');
      contactOverlay.querySelector('.ks-contact-drawer__header [data-ks-contact-close]')?.focus();
    });
  };
  contactTriggers.forEach((trigger) => trigger.addEventListener('click', (event) => { event.preventDefault(); openContact(); }));
  contactOverlay?.querySelectorAll('[data-ks-contact-close]').forEach((button) => button.addEventListener('click', closeContact));
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeContact(); });
  if (window.location.hash === '#contact') setTimeout(openContact, 0);
  window.addEventListener('hashchange', () => {
    if (window.location.hash === '#contact') openContact();
  });
  contactForm?.addEventListener('submit', (event) => {
    event.preventDefault();
    const values = new FormData(contactForm);
    const message = ['New Kiswani lighting project enquiry', `Name: ${String(values.get('name') || '').trim()}`, `Phone: ${String(values.get('phone') || '').trim()}`, `Project type: ${String(values.get('projectType') || '').trim()}`, `Details: ${String(values.get('details') || '').trim()}`].join('\n');
    const href = `https://wa.me/970599671209?text=${encodeURIComponent(message)}`;
    const status = contactForm.querySelector('[data-ks-contact-status]');
    const link = contactForm.querySelector('[data-ks-contact-whatsapp]');
    if (link) link.href = href;
    if (status) status.hidden = false;
    window.open(href, '_blank', 'noopener,noreferrer');
  });
})();
