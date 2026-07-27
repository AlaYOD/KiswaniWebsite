(function () {
  const select = document.querySelector('[data-kl-language]');
  if (!select) return;

  const saved = window.localStorage.getItem('kiswani-language');
  if (saved) {
    select.value = saved;
    document.documentElement.lang = saved;
    document.documentElement.dir = saved === 'en' ? 'ltr' : 'rtl';
  }

  select.addEventListener('change', function (event) {
    const value = event.target.value;
    window.localStorage.setItem('kiswani-language', value);
    document.documentElement.lang = value;
    document.documentElement.dir = value === 'en' ? 'ltr' : 'rtl';
  });
})();
