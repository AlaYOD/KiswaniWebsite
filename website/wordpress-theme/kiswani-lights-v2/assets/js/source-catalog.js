(() => {
  const init = () => {
    document.querySelectorAll('[data-ks-catalog-search]').forEach((input) => {
      if (input.dataset.ksCatalogReady) return;
      input.dataset.ksCatalogReady = 'true';
      const root = input.closest('.ks-catalog-products');
      const cards = root?.querySelectorAll('[data-ks-catalog-card]') || [];
      const empty = root?.querySelector('.ks-catalog-empty');
      input.addEventListener('input', () => {
        const query = input.value.trim().toLowerCase();
        let visible = 0;
        cards.forEach((card) => {
          const match = !query || (card.dataset.search || '').includes(query);
          card.hidden = !match;
          if (match) visible += 1;
        });
        if (empty) empty.hidden = visible !== 0;
      });
    });
  };
  document.addEventListener('DOMContentLoaded', init, { once: true });
  init();
})();
