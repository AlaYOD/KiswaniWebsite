(() => {
  'use strict';
  const STORAGE_KEY = 'kiswani-shopping-cart';
  const data = window.ksCartData || { catalog: [] };
  const catalog = new Map((data.catalog || []).map((item) => [String(item.code).toUpperCase(), item]));
  const overlay = document.querySelector('[data-ks-cart-overlay]');
  const drawer = overlay?.querySelector('.ks-cart-drawer');
  const itemsNode = overlay?.querySelector('[data-ks-cart-items]');
  const emptyNode = overlay?.querySelector('[data-ks-cart-empty]');
  const totalsNode = overlay?.querySelector('[data-ks-cart-totals]');
  const continueNode = overlay?.querySelector('[data-ks-cart-close-empty]');
  const subtotalNode = overlay?.querySelector('[data-ks-cart-subtotal]');
  const totalCountNode = overlay?.querySelector('[data-ks-cart-count]');
  const headerTrigger = document.querySelector('.ks-cart-link');
  let lastFocus = null;
  let lines = read();

  function read() {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      return Array.isArray(value) ? value.map(normalize).filter((line) => line && catalog.has(line.code)) : [];
    } catch (_) { return []; }
  }
  function normalize(line) {
    const code = String(line?.code || '').toUpperCase();
    if (!code) return null;
    return { code, quantity: Math.min(999, Math.max(1, Number.parseInt(line.quantity, 10) || 1)) };
  }
  function price(value) { return `₪${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(value) || 0)}`; }
  function escapeHtml(value) { const el = document.createElement('div'); el.textContent = String(value ?? ''); return el.innerHTML; }
  function svg(paths) { return `<svg aria-hidden="true" viewBox="0 0 24 24">${paths}</svg>`; }
  function save() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    render();
    document.dispatchEvent(new CustomEvent('kiswani:cart-updated', { detail: { lines: lines.map((line) => ({ ...line })) } }));
  }
  function add(code, quantity = 1) {
    code = String(code || '').toUpperCase();
    if (!catalog.has(code)) return;
    const amount = Math.min(999, Math.max(1, Number.parseInt(quantity, 10) || 1));
    const existing = lines.find((line) => line.code === code);
    if (existing) existing.quantity = Math.min(999, existing.quantity + amount);
    else lines.push({ code, quantity: amount });
    save();
    open();
  }
  function render() {
    const valid = lines.map((line) => ({ line, product: catalog.get(line.code) })).filter((item) => item.product);
    const count = valid.reduce((sum, item) => sum + item.line.quantity, 0);
    const subtotal = valid.reduce((sum, item) => sum + Number(item.product.price) * item.line.quantity, 0);
    if (headerTrigger) {
      const countEl = headerTrigger.querySelector('b');
      if (countEl) { countEl.textContent = String(count); countEl.hidden = count === 0; }
      headerTrigger.setAttribute('aria-label', `Open shopping cart with ${count} items`);
    }
    if (!overlay) return;
    emptyNode.hidden = count > 0;
    itemsNode.hidden = count === 0;
    totalsNode.hidden = count === 0;
    continueNode.hidden = count > 0;
    totalCountNode.textContent = String(count);
    subtotalNode.textContent = price(subtotal);
    itemsNode.innerHTML = valid.map(({ line, product }) => `<article class="ks-cart-line" data-code="${escapeHtml(product.code)}"><div class="ks-cart-line__image"><img src="${escapeHtml(product.image)}" alt="" decoding="async"></div><div class="ks-cart-line__copy"><div class="ks-cart-line__head"><div><p>${escapeHtml(product.code)}</p><h3>${escapeHtml(product.name)}</h3></div><button class="ks-cart-line__remove" type="button" data-action="remove" aria-label="Remove ${escapeHtml(product.name)}">${svg('<path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path>')}</button></div><div class="ks-cart-line__prices"><div><p>${price(product.price)}</p><small>Initial unit price</small></div><strong>${price(Number(product.price) * line.quantity)}</strong></div><div class="ks-cart-line__quantity"><button type="button" data-action="minus" aria-label="Decrease quantity">${svg('<path d="M5 12h14"></path>')}</button><input type="number" min="1" max="999" value="${line.quantity}" aria-label="Quantity"><button type="button" data-action="plus" aria-label="Increase quantity">${svg('<path d="M12 5v14"></path><path d="M5 12h14"></path>')}</button></div></div></article>`).join('');
  }
  function open() {
    if (!overlay) return;
    lastFocus = document.activeElement;
    overlay.hidden = false;
    requestAnimationFrame(() => { overlay.classList.add('is-open'); drawer?.focus(); });
    document.body.classList.add('ks-cart-locked');
  }
  function close() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.classList.remove('ks-cart-locked');
    setTimeout(() => { overlay.hidden = true; lastFocus?.focus?.(); }, matchMedia('(prefers-reduced-motion: reduce)').matches ? 0 : 450);
  }
  headerTrigger?.addEventListener('click', open);
  overlay?.querySelectorAll('[data-ks-cart-close],[data-ks-cart-close-empty]').forEach((button) => button.addEventListener('click', close));
  overlay?.addEventListener('mousedown', (event) => { if (event.target === overlay) close(); });
  overlay?.querySelector('[data-ks-cart-clear]')?.addEventListener('click', () => { lines = []; save(); });
  itemsNode?.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]'); const item = event.target.closest('[data-code]');
    if (!button || !item) return; const index = lines.findIndex((line) => line.code === item.dataset.code); if (index < 0) return;
    if (button.dataset.action === 'remove') lines.splice(index, 1);
    if (button.dataset.action === 'minus') { if (lines[index].quantity <= 1) lines.splice(index, 1); else lines[index].quantity -= 1; }
    if (button.dataset.action === 'plus') lines[index].quantity = Math.min(999, lines[index].quantity + 1);
    save();
  });
  itemsNode?.addEventListener('change', (event) => {
    const input = event.target.closest('input[type=number]'); const item = event.target.closest('[data-code]'); if (!input || !item) return;
    const line = lines.find((entry) => entry.code === item.dataset.code); if (!line) return; line.quantity = Math.min(999, Math.max(1, Number.parseInt(input.value, 10) || 1)); save();
  });
  document.addEventListener('keydown', (event) => { if (event.key === 'Escape' && overlay && !overlay.hidden) close(); });
  document.addEventListener('kiswani:cart-updated', (event) => {
    if (!Array.isArray(event.detail?.lines)) return;
    lines = event.detail.lines.map(normalize).filter((line) => line && catalog.has(line.code));
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    render();
  });
  document.querySelectorAll('[data-ks-catalog-card]').forEach((card) => {
    card.querySelectorAll('[data-catalog-quantity]').forEach((button) => button.addEventListener('click', () => {
      const input = card.querySelector('input[type=number]'); if (!input) return; const delta = button.dataset.catalogQuantity === 'increase' ? 1 : -1; input.value = String(Math.min(999, Math.max(1, (Number.parseInt(input.value, 10) || 1) + delta)));
    }));
    card.querySelector('.ks-catalog-add')?.addEventListener('click', () => add(card.dataset.productCode, card.querySelector('input[type=number]')?.value));
  });
  const productRoot = document.querySelector('.ks-product[data-product-code]');
  if (productRoot) {
    const input = productRoot.querySelector('#product-qty');
    productRoot.querySelectorAll('[data-product-quantity]').forEach((button) => button.addEventListener('click', () => { const delta = button.dataset.productQuantity === 'increase' ? 1 : -1; input.value = String(Math.min(999, Math.max(1, (Number.parseInt(input.value, 10) || 1) + delta))); }));
    productRoot.querySelector('.ks-product-purchase>button')?.addEventListener('click', () => add(productRoot.dataset.productCode, input?.value));
  }
  document.querySelectorAll('[data-ks-product-card][data-product-code]').forEach((card) => {
    const input = card.querySelector('.ks-product-footer input'); const controls = card.querySelectorAll('.ks-product-footer span button');
    controls.forEach((button, index) => button.addEventListener('click', () => { const delta = index ? 1 : -1; input.value = String(Math.min(999, Math.max(1, (Number.parseInt(input.value, 10) || 1) + delta))); }));
    card.querySelector('.ks-add')?.addEventListener('click', () => add(card.dataset.productCode, input?.value));
  });
  window.KiswaniCart = { add, open, close, getLines: () => lines.map((line) => ({ ...line })) };
  render();
})();
