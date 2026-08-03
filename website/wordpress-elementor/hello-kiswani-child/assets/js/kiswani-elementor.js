(function () {
  const config = window.kiswaniElementor || {};
  const CART_KEY = 'kiswani-cart-lines';
  const languageSelects = document.querySelectorAll('[data-kiswani-language]');

  function money(value) {
    return new Intl.NumberFormat('en-US', { maximumFractionDigits: 0 }).format(Number(value || 0)) + ' ILS';
  }

  function getLanguage() {
    return window.localStorage.getItem('kiswani-language') || document.documentElement.lang || 'en';
  }

  function applyLanguage(value) {
    if (!value) return;
    document.documentElement.lang = value;
    document.documentElement.dir = value === 'en' ? 'ltr' : 'rtl';
    languageSelects.forEach(function (select) {
      select.value = value;
    });
  }

  function readCart() {
    try {
      const parsed = JSON.parse(window.localStorage.getItem(CART_KEY) || '[]');
      return Array.isArray(parsed) ? parsed.filter(function (line) { return line && line.code && Number(line.quantity) > 0; }) : [];
    } catch (error) {
      return [];
    }
  }

  function writeCart(lines) {
    window.localStorage.setItem(CART_KEY, JSON.stringify(lines));
    renderCart();
  }

  function productData() {
    const node = document.getElementById('kiswani-product-data');
    if (!node) return [];
    try {
      const parsed = JSON.parse(node.textContent || '[]');
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      return [];
    }
  }

  function productMap() {
    const map = new Map();
    productData().forEach(function (product) {
      if (product && product.code) map.set(product.code, product);
    });
    return map;
  }

  function addToCart(code, quantity) {
    if (!code) return;
    const lines = readCart();
    const existing = lines.find(function (line) { return line.code === code; });
    if (existing) existing.quantity = Math.min(999, Number(existing.quantity || 0) + quantity);
    else lines.push({ code: code, quantity: quantity });
    writeCart(lines);
  }

  function updateQuantity(code, quantity) {
    const next = readCart()
      .map(function (line) { return line.code === code ? { code: line.code, quantity: quantity } : line; })
      .filter(function (line) { return Number(line.quantity) > 0; });
    writeCart(next);
  }

  function renderCart() {
    const lines = readCart();
    const count = lines.reduce(function (total, line) { return total + Number(line.quantity || 0); }, 0);
    document.querySelectorAll('[data-kiswani-cart-count]').forEach(function (node) {
      node.textContent = String(count);
    });

    const products = productMap();
    let subtotal = 0;
    const summary = document.querySelector('[data-kiswani-checkout-summary]');
    if (summary) {
      if (!lines.length) {
        summary.innerHTML = '<div class="kiswani-empty-state">Your cart is empty.</div>';
      } else {
        summary.innerHTML = lines.map(function (line) {
          const product = products.get(line.code) || { code: line.code, name: line.code, price: 0, image: '' };
          const qty = Number(line.quantity || 1);
          const total = Number(product.price || 0) * qty;
          subtotal += total;
          return '<article class="kiswani-order-line">' +
            (product.image ? '<img src="' + product.image + '" alt="">' : '<span></span>') +
            '<div><small>' + product.code + '</small><h3>' + product.name + '</h3>' +
            '<p>Unit: ' + money(product.price) + ' | Line total: <strong>' + money(total) + '</strong></p>' +
            '<div class="kiswani-qty-control"><button type="button" data-kiswani-cart-update="' + product.code + '" data-quantity="' + (qty - 1) + '">-</button><span>' + qty + '</span><button type="button" data-kiswani-cart-update="' + product.code + '" data-quantity="' + (qty + 1) + '">+</button></div>' +
            '</div></article>';
        }).join('');
      }
    } else {
      lines.forEach(function (line) {
        const product = products.get(line.code);
        if (product) subtotal += Number(product.price || 0) * Number(line.quantity || 1);
      });
    }

    document.querySelectorAll('[data-kiswani-cart-subtotal]').forEach(function (node) {
      node.textContent = money(subtotal);
    });
  }

  function preparedMessage(form, lines, products, subtotal) {
    const data = new FormData(form);
    const itemLines = lines.map(function (line, index) {
      const product = products.get(line.code) || { code: line.code, name: line.code, price: 0 };
      const qty = Number(line.quantity || 1);
      return (index + 1) + '. *' + product.name + '* (' + product.code + ')\n   Qty: ' + qty + ' | Unit: ' + money(product.price) + ' | Total: ' + money(Number(product.price || 0) * qty);
    }).join('\n\n');

    return [
      '*KISWANI LIGHTS - NEW ORDER REQUEST*',
      '----------------------------------',
      '*CUSTOMER DETAILS:*',
      '*Name:* ' + (data.get('name') || ''),
      '*WhatsApp:* ' + (data.get('phone') || ''),
      data.get('email') ? '*Email:* ' + data.get('email') : '',
      '*Location:* ' + (data.get('city') || ''),
      '*Project Type:* ' + (data.get('projectType') || ''),
      data.get('address') ? '*Address:* ' + data.get('address') : '',
      data.get('notes') ? '*Notes:* ' + data.get('notes') : '',
      '----------------------------------',
      '*ORDER ITEMS:*',
      itemLines,
      '----------------------------------',
      '*ORDER SUMMARY:*',
      '*Grand Subtotal:* ' + money(subtotal),
      'Please confirm availability, delivery lead time, and final approval.'
    ].filter(Boolean).join('\n');
  }

  async function submitCheckout(form) {
    const messageNode = document.querySelector('[data-kiswani-checkout-message]');
    const lines = readCart();
    const products = productMap();
    const subtotal = lines.reduce(function (total, line) {
      const product = products.get(line.code);
      return total + (product ? Number(product.price || 0) * Number(line.quantity || 1) : 0);
    }, 0);

    if (!lines.length) {
      if (messageNode) messageNode.textContent = 'Add at least one product before sending the order.';
      return;
    }

    const data = new FormData(form);
    const location = [data.get('city'), data.get('address')].filter(Boolean).join(' - ');
    const whatsappMessage = preparedMessage(form, lines, products, subtotal);
    const payload = {
      name: data.get('name'),
      email: data.get('email'),
      whatsapp: data.get('phone'),
      location: location,
      projectType: data.get('projectType'),
      notes: data.get('notes'),
      language: getLanguage(),
      lines: lines,
      whatsappMessage: whatsappMessage
    };

    if (messageNode) messageNode.textContent = 'Saving order...';

    try {
      const response = await fetch(config.restUrl || '/wp-json/kiswani/v1/orders', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-WP-Nonce': config.nonce || ''
        },
        body: JSON.stringify(payload)
      });
      const result = await response.json().catch(function () { return null; });
      if (!response.ok) throw new Error((result && result.error) || 'Could not save the order.');
      if (messageNode) messageNode.textContent = 'Order saved. Opening WhatsApp...';
      window.open('https://wa.me/' + (config.whatsappNumber || '970599671209') + '?text=' + encodeURIComponent(whatsappMessage), '_blank', 'noopener,noreferrer');
    } catch (error) {
      if (messageNode) messageNode.textContent = error.message || 'Could not save the order.';
    }
  }

  applyLanguage(getLanguage());
  renderCart();

  languageSelects.forEach(function (select) {
    select.addEventListener('change', function (event) {
      const value = event.target.value;
      window.localStorage.setItem('kiswani-language', value);
      applyLanguage(value);
    });
  });

  document.addEventListener('click', function (event) {
    const open = event.target.closest('[data-kiswani-open], [data-kiswani-drawer-open]');
    if (open) {
      const id = open.getAttribute('data-kiswani-open');
      const selector = open.getAttribute('data-kiswani-drawer-open');
      const target = id ? document.getElementById(id) : document.querySelector(selector);
      if (target) target.setAttribute('aria-hidden', 'false');
      return;
    }

    const close = event.target.closest('[data-kiswani-close], [data-kiswani-drawer-close]');
    if (close) {
      const id = close.getAttribute('data-kiswani-close');
      const target = id ? document.getElementById(id) : close.closest('.kiswani-drawer');
      if (target) target.setAttribute('aria-hidden', 'true');
      return;
    }

    const add = event.target.closest('[data-kiswani-cart-add]');
    if (add) {
      addToCart(add.getAttribute('data-kiswani-cart-add'), 1);
      return;
    }

    const update = event.target.closest('[data-kiswani-cart-update]');
    if (update) {
      updateQuantity(update.getAttribute('data-kiswani-cart-update'), Number(update.getAttribute('data-quantity') || 0));
      return;
    }

    if (event.target.closest('[data-kiswani-cart-clear]')) {
      writeCart([]);
    }
  });

  document.addEventListener('submit', function (event) {
    const form = event.target.closest('[data-kiswani-checkout-form]');
    if (!form) return;
    event.preventDefault();
    submitCheckout(form);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape') return;
    document.querySelectorAll('.kiswani-drawer').forEach(function (drawer) {
      drawer.setAttribute('aria-hidden', 'true');
    });
  });
})();
