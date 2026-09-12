const header = document.querySelector('.site-header');
const toggle = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#main-nav');
if (header && toggle && navigation) {
  header.classList.add('menu-ready');
  const close = () => { toggle.setAttribute('aria-expanded', 'false'); header.classList.remove('menu-open'); };
  toggle.addEventListener('click', () => {
    const expanded = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(expanded));
    header.classList.toggle('menu-open', expanded);
  });
  navigation.addEventListener('click', event => { if (event.target.closest('a')) close(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape' && toggle.getAttribute('aria-expanded') === 'true') { close(); toggle.focus(); } });
  document.addEventListener('click', event => { if (!header.contains(event.target)) close(); });
  window.matchMedia('(min-width: 1081px)').addEventListener('change', close);
}
document.querySelectorAll('.languages a').forEach(link => {
  link.addEventListener('click', () => { link.hash = window.location.hash; });
});
