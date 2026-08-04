(() => {
  const header = document.querySelector('[data-ks-header]');
  const menu = document.querySelector('#ks-mobile-menu');
  const backdrop = document.querySelector('.ks-menu-backdrop');
  const toggle = document.querySelector('.ks-menu-toggle');
  const closeMenu = () => { menu?.classList.remove('is-open'); backdrop?.classList.remove('is-open'); toggle?.setAttribute('aria-expanded', 'false'); menu?.setAttribute('aria-hidden', 'true'); };
  const openMenu = () => { menu?.classList.add('is-open'); backdrop?.classList.add('is-open'); toggle?.setAttribute('aria-expanded', 'true'); menu?.setAttribute('aria-hidden', 'false'); };
  toggle?.addEventListener('click', () => menu?.classList.contains('is-open') ? closeMenu() : openMenu());
  header?.querySelector('.ks-menu-close')?.addEventListener('click', closeMenu);
  backdrop?.addEventListener('click', closeMenu);
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape') closeMenu(); });
  const scenes = [
    ['editorial/hero-interior.webp', 'Interior lighting', 'Warm, considered light for everyday living.'],
    ['editorial/hero-decorative.webp', 'Decorative lighting', 'Statement pieces that give the room its character.'],
    ['editorial/hero-technical.webp', 'Technical lighting', 'Precise systems for architectural performance.'],
    ['editorial/hero-accent.webp', 'Accent lighting', 'Focused moments that reveal material and mood.'],
  ];
  const hero = document.querySelector('[data-ks-hero]');
  const heroImage = document.querySelector('[data-ks-hero-image]');
  const sceneName = document.querySelector('[data-ks-scene-name]');
  const sceneDetail = document.querySelector('[data-ks-scene-detail]');
  const sceneIndex = document.querySelector('[data-ks-scene-index]');
  const sceneButtons = [...document.querySelectorAll('[data-ks-scene]')];
  let activeScene = 0;
  const setScene = (index) => { activeScene = index; const scene = scenes[index]; if (!scene || !heroImage) return; heroImage.style.backgroundImage = `url(${window.ksThemeUri}/assets/images/${scene[0]})`; sceneName.textContent = scene[1]; sceneDetail.textContent = scene[2]; sceneIndex.textContent = `0${index + 1}`; sceneButtons.forEach((button) => button.classList.toggle('is-active', Number(button.dataset.ksScene) === index)); };
  sceneButtons.forEach((button) => button.addEventListener('click', () => setScene(Number(button.dataset.ksScene))));
  if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) setInterval(() => setScene((activeScene + 1) % scenes.length), 6000);
  const compare = document.querySelector('[data-ks-compare]');
  const after = document.querySelector('.ks-compare__after');
  const line = document.querySelector('[data-ks-compare-line]');
  compare?.addEventListener('input', () => { const value = `${compare.value}%`; if (after) after.style.width = value; if (line) line.style.left = value; });
  const search = document.querySelector('[data-ks-product-search]');
  search?.addEventListener('input', () => { const term = search.value.toLowerCase().trim(); document.querySelectorAll('[data-ks-product-card]').forEach((card) => { card.hidden = term && !card.textContent.toLowerCase().includes(term); }); });
})();
