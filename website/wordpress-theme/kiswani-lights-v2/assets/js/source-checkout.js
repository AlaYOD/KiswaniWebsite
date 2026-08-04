(() => {
  'use strict';

  const STORAGE_KEY = 'kiswani-shopping-cart';
  const root = document.querySelector('.ks-checkout');
  if (!root || !window.ksCheckout) return;

  const catalog = new Map((window.ksCheckout.catalog || []).map((product) => [String(product.code).toUpperCase(), product]));
  const countNode = root.querySelector('[data-ks-checkout-count]');
  const emptyNode = root.querySelector('[data-ks-checkout-empty]');
  const itemsNode = root.querySelector('[data-ks-checkout-items]');
  const clearNode = root.querySelector('[data-ks-checkout-clear]');
  const subtotalWrap = root.querySelector('[data-ks-checkout-subtotal-wrap]');
  const subtotalNode = root.querySelector('[data-ks-checkout-subtotal]');
  const form = root.querySelector('[data-ks-checkout-form]');
  const submit = form.querySelector('.ks-checkout-submit');
  const submitLabel = form.querySelector('[data-ks-checkout-submit-label]');
  const errorNode = form.querySelector('[data-ks-checkout-error]');
  const successNode = form.querySelector('[data-ks-checkout-success]');
  let lines = readLines();

  function readLines() {
    try {
      const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
      if (!Array.isArray(parsed)) return [];
      return parsed.map((line) => ({ code: String(line.code || '').toUpperCase(), quantity: Math.min(999, Math.max(1, Number.parseInt(line.quantity, 10) || 1)) })).filter((line) => catalog.has(line.code));
    } catch (_) {
      return [];
    }
  }

  function saveLines() {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    document.dispatchEvent(new CustomEvent('kiswani:cart-updated', { detail: { lines } }));
  }

  function price(value) {
    return `₪${new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(value) || 0)}`;
  }

  function icon(paths) {
    return `<svg aria-hidden="true" viewBox="0 0 24 24">${paths}</svg>`;
  }

  function render() {
    const valid = lines.map((line) => ({ line, product: catalog.get(line.code) })).filter((item) => item.product);
    const count = valid.reduce((total, item) => total + item.line.quantity, 0);
    const subtotal = valid.reduce((total, item) => total + Number(item.product.price) * item.line.quantity, 0);

    countNode.textContent = String(count);
    const headerCount = document.querySelector('.ks-cart-link b');
    if (headerCount) headerCount.textContent = String(count);
    emptyNode.hidden = count > 0;
    itemsNode.hidden = count === 0;
    clearNode.hidden = count === 0;
    subtotalWrap.hidden = count === 0;
    submit.disabled = count === 0;
    subtotalNode.textContent = price(subtotal);

    itemsNode.innerHTML = valid.map(({ line, product }) => {
      const code = escapeHtml(product.code);
      const name = escapeHtml(product.name);
      const image = escapeHtml(product.image);
      const unit = price(product.price);
      const total = price(Number(product.price) * line.quantity);
      return `<article class="ks-checkout-item" data-code="${code}">
        <div class="ks-checkout-item-image"><img src="${image}" alt="" decoding="async"></div>
        <div class="ks-checkout-item-content">
          <div class="ks-checkout-item-head"><div><p class="ks-checkout-item-code">${code}</p><h3>${name}</h3><div class="ks-checkout-item-prices"><span>Unit: ${unit}</span><strong>Line total: ${total}</strong></div></div><button class="ks-checkout-remove" type="button" data-action="remove" aria-label="Remove ${name}">${icon('<path d="M3 6h18"></path><path d="M8 6V4h8v2"></path><path d="M19 6l-1 14H6L5 6"></path><path d="M10 11v5"></path><path d="M14 11v5"></path>')}</button></div>
          <div class="ks-checkout-quantity"><button type="button" data-action="minus" aria-label="Decrease quantity">${icon('<path d="M5 12h14"></path>')}</button><span>${line.quantity}</span><button type="button" data-action="plus" aria-label="Increase quantity">${icon('<path d="M12 5v14"></path><path d="M5 12h14"></path>')}</button></div>
        </div>
      </article>`;
    }).join('');
  }

  function escapeHtml(value) {
    const node = document.createElement('div');
    node.textContent = String(value ?? '');
    return node.innerHTML;
  }

  itemsNode.addEventListener('click', (event) => {
    const button = event.target.closest('button[data-action]');
    const article = event.target.closest('[data-code]');
    if (!button || !article) return;
    const code = article.dataset.code;
    const index = lines.findIndex((line) => line.code === code);
    if (index < 0) return;
    if (button.dataset.action === 'remove') lines.splice(index, 1);
    if (button.dataset.action === 'minus') {
      if (lines[index].quantity <= 1) lines.splice(index, 1);
      else lines[index].quantity -= 1;
    }
    if (button.dataset.action === 'plus') lines[index].quantity = Math.min(999, lines[index].quantity + 1);
    saveLines();
    render();
  });

  clearNode.addEventListener('click', () => {
    lines = [];
    saveLines();
    render();
  });

  document.addEventListener('kiswani:cart-updated', (event) => {
    if (!Array.isArray(event.detail?.lines)) return;
    lines = event.detail.lines.map((line) => ({ code: String(line.code || '').toUpperCase(), quantity: Math.min(999, Math.max(1, Number.parseInt(line.quantity, 10) || 1)) })).filter((line) => catalog.has(line.code));
    render();
  });

  form.addEventListener('submit', async (event) => {
    event.preventDefault();
    errorNode.hidden = true;
    successNode.hidden = true;
    if (!lines.length || !form.reportValidity()) return;
    submit.disabled = true;
    submitLabel.textContent = 'Saving order...';
    const data = new FormData(form);
    data.append('action', 'kiswani_submit_order');
    data.append('nonce', window.ksCheckout.nonce);
    data.append('lines', JSON.stringify(lines));
    try {
      const response = await fetch(window.ksCheckout.ajaxUrl, { method: 'POST', body: data, credentials: 'same-origin' });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result?.data?.message || 'Could not save the order. Please try again.');
      const details = Object.fromEntries(data.entries());
      const orderLines = lines.map((line, index) => {
        const product = catalog.get(line.code);
        return `${index + 1}. ${product.name} (${product.code})\nQty: ${line.quantity} | Unit: ${price(product.price)} | Total: ${price(Number(product.price) * line.quantity)}`;
      }).join('\n\n');
      const subtotal = lines.reduce((total, line) => total + Number(catalog.get(line.code)?.price || 0) * line.quantity, 0);
      const message = `KISWANI LIGHTS - NEW ORDER REQUEST\n----------------------------------\nCUSTOMER DETAILS:\nName: ${details.name}\nWhatsApp: ${details.phone}\nEmail: ${details.email}\nLocation: ${details.city}\nProject Type: ${details.project_type}\nAddress: ${details.address || ''}\nNotes: ${details.notes || ''}\n----------------------------------\nORDER ITEMS:\n\n${orderLines}\n----------------------------------\nGrand Subtotal: ${price(subtotal)}\nPlease confirm availability, delivery lead time, and final approval.`;
      window.open(`https://wa.me/970599671209?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
      successNode.hidden = false;
    } catch (error) {
      errorNode.textContent = error instanceof Error ? error.message : 'Could not save the order. Please try again.';
      errorNode.hidden = false;
    } finally {
      submit.disabled = lines.length === 0;
      submitLabel.textContent = 'Send order via WhatsApp';
    }
  });

  render();
})();
