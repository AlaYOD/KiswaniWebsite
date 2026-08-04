(() => {
  const project = document.querySelector('[data-ks-featured-project]');
  if (!project || project.dataset.ksProjectReady === 'true') return;
  project.dataset.ksProjectReady = 'true';

  const range = project.querySelector('[data-ks-project-range]');
  const after = project.querySelector('[data-ks-project-after]');
  const handle = project.querySelector('[data-ks-project-handle]');
  const image = project.querySelector('[data-ks-project-image]');
  const overlay = project.querySelector('[data-ks-project-overlay]');
  const kelvin = project.querySelector('[data-ks-project-kelvin]');

  range?.addEventListener('input', () => {
    const value = Number(range.value);
    if (after) after.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
    if (handle) handle.style.left = `${value}%`;
  });

  project.querySelectorAll('[data-ks-temperature]').forEach((button) => {
    button.addEventListener('click', () => {
      project.querySelectorAll('[data-ks-temperature]').forEach((option) => {
        const active = option === button;
        option.classList.toggle('is-active', active);
        option.setAttribute('aria-pressed', String(active));
      });
      if (image) image.style.filter = button.dataset.filter;
      if (overlay) overlay.style.backgroundColor = button.dataset.overlay;
      if (kelvin) kelvin.textContent = button.dataset.kelvin;
    });
  });
})();
