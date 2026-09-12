import fs from 'node:fs';
import path from 'node:path';

const content = JSON.parse(fs.readFileSync('source/content.json', 'utf8'));
const brand = JSON.parse(fs.readFileSync('source/brand-translations.json', 'utf8'));
const urls = { en: '/', fr: '/fr/', zh: '/zh/', ar: '/ar/' };
const names = { en: 'English', fr: 'Français', zh: '中文', ar: 'العربية' };
const langCode = lang => lang === 'zh' ? 'zh-CN' : lang;
const esc = value => String(value).replaceAll('&', '&amp;').replaceAll('"', '&quot;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const arrow = '<svg class="arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><path d="M4 12h15m-6-6 6 6-6 6"/></svg>';
const logo = '<span class="brand-lockup" dir="ltr"><img src="/assets/famba-emblem.webp" alt="" width="60" height="60"><span class="wordmark">FAMBA<span>SMEs</span></span></span>';
const iconPaths = [
  '<circle cx="9" cy="10" r="3"/><circle cx="23" cy="10" r="3"/><path d="M3 26v-4a6 6 0 0 1 12 0v4m2 0v-4a6 6 0 0 1 12 0v4M14 9h4"/>',
  '<circle cx="16" cy="16" r="12"/><ellipse cx="16" cy="16" rx="5" ry="12"/><path d="M4 16h24M6 9h20M6 23h20"/>',
  '<path d="M4 28V13l8 5v-5l8 5V8h6v20H4Zm4-6h3m4 0h3m4 0h3M20 8V4h6v4"/>',
  '<path d="m3 11 13-7 13 7H3Zm2 17h22M8 15v9m8-9v9m8-9v9"/>',
  '<path d="M4 27h25M5 23l8-8 6 4L29 7m-8 0h8v8"/>',
  '<rect x="4" y="8" width="24" height="20" rx="2"/><path d="M10 8V4h12v4M4 16h24m-15 0v4h6v-4"/>'
];

fs.rmSync('dist', { recursive: true, force: true });
fs.mkdirSync('dist/assets', { recursive: true });
// Publish only assets used by this design; earlier brand assets remain in source history.
const assets = ['famba-emblem.webp', 'trade-harbour.webp', 'france.jpg', 'maghreb.jpg', 'china.jpg', 'gulf.jpg', 'meeting.jpg', 'industry.jpg', 'conference.jpg'];
for (const asset of assets) fs.copyFileSync(`assets/${asset}`, `dist/assets/${asset}`);
fs.copyFileSync('source/site.css', 'dist/assets/site.css');
fs.copyFileSync('source/navigation.js', 'dist/assets/navigation.js');

for (const lang of Object.keys(urls)) {
  const dictionary = { ...content[lang], ...brand[lang] };
  const t = key => { if (typeof dictionary[key] !== 'string' || !dictionary[key]) throw new Error(`Missing translation: ${lang}.${key}`); return esc(dictionary[key]); };
  const languages = Object.entries(urls).map(([code, url]) => `<a href="${url}" lang="${langCode(code)}" hreflang="${langCode(code)}"${code === lang ? ' aria-current="page"' : ''}>${names[code]}</a>`).join('');
  const photo = (file, alt, cls = '', eager = false) => `<img class="${cls}" src="/assets/${file}" alt="${t(alt)}" width="${file === 'trade-harbour.webp' ? 1536 : 1400}" height="${file === 'trade-harbour.webp' ? 1024 : 933}" ${eager ? 'fetchpriority="high"' : 'loading="lazy"'} decoding="async">`;
  const field = (key, type, autocomplete, required = true) => `<label class="${key === 'company' ? 'full' : ''}" for="${key}">${t(key)}<input id="${key}" type="${type}" name="${key}" autocomplete="${autocomplete}" placeholder="${t(key + 'Placeholder')}" maxlength="${key === 'email' ? 254 : 180}"${required ? ' required' : ''}${key === 'email' ? ' dir="ltr"' : ''}></label>`;
  const head = `<meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="theme-color" content="#102b39"><meta name="description" content="${t('desc')}"><title>FAMBA-SMEs — ${t('footerLine')}</title><link rel="icon" type="image/webp" href="/assets/famba-emblem.webp"><link rel="apple-touch-icon" href="/assets/famba-emblem.webp"><link rel="stylesheet" href="/assets/site.css"><link rel="canonical" href="https://sme-famba.com${urls[lang]}">${Object.entries(urls).map(([l, u]) => `<link rel="alternate" hreflang="${langCode(l)}" href="https://sme-famba.com${u}">`).join('')}<link rel="alternate" hreflang="x-default" href="https://sme-famba.com/"><meta property="og:type" content="website"><meta property="og:site_name" content="FAMBA-SMEs"><meta property="og:title" content="FAMBA-SMEs — ${t('footerLine')}"><meta property="og:description" content="${t('desc')}"><meta property="og:url" content="https://sme-famba.com${urls[lang]}"><meta property="og:image" content="https://sme-famba.com/assets/trade-harbour.webp"><meta property="og:image:alt" content="${t('heroAlt')}"><meta name="twitter:card" content="summary_large_image">`;
  const html = `<!doctype html>
<html lang="${langCode(lang)}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}"><head>${head}</head><body>
<a class="skip-link" href="#main">${t('skip')}</a>
<header class="site-header" id="top"><div class="container header-inner">
  <a class="home-link" href="${urls[lang]}" aria-label="FAMBA-SMEs">${logo}</a>
  <button class="menu-toggle" aria-expanded="false" aria-controls="main-nav"><span>${t('menu')}</span><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M4 12h16M4 17h16"/></svg></button>
  <nav id="main-nav" aria-label="${t('menu')}"><a href="#who">${t('a')}</a><a href="#services">${t('c')}</a><a href="#corridor">${t('d')}</a><a href="#contact">${t('f')}</a></nav>
  <nav class="languages" aria-label="${t('languageLabel')}" dir="ltr">${languages}</nav>
</div></header>
<main id="main" tabindex="-1">
  <section class="hero"><div class="container hero-grid"><div class="hero-copy">
    <p class="eyebrow"><span class="status-dot" aria-hidden="true"></span>${t('heroEyebrow')}</p>
    <h1>${t('headline')}<em>${t('headlineAccent')}</em></h1>
    <p class="hero-intro">${t('intro')}</p>
    <div class="hero-actions"><a class="button primary" href="#contact">${t('heroAction')}${arrow}</a><a class="text-link" href="#services">${t('explore')}${arrow}</a></div>
  </div><figure class="hero-art">${photo('trade-harbour.webp', 'heroAlt', '', true)}<figcaption><span class="caption-line" aria-hidden="true"></span>${t('heroCaption')}</figcaption></figure></div></section>
  <div class="network-strip"><div class="container network-inner"><p>${t('networkLabel')}</p><div class="network-regions">${[1,2,3,4].map(i => `<a href="#region-${i}">${t('rn' + i)}</a>`).join('<span aria-hidden="true">·</span>')}</div></div></div>

  <section class="section about" id="who"><div class="container about-grid"><div class="about-photo"><figure>${photo('meeting.jpg', 'altMeeting')}<figcaption>${t('aboutCaption')}</figcaption></figure><div class="photo-mark" aria-hidden="true"><span>FAMBA</span><span>SMEs</span></div></div><div class="about-copy"><p class="eyebrow">01 / ${t('aboutEyebrow')}</p><h2>${t('aboutTitle')}</h2><p class="org-name">${t('org')}</p><p class="body-copy">${t('aboutBody')}</p><div class="mission-grid" id="mission"><article><h3>${t('mt')}</h3><p>${t('mp')}</p></article><article><h3>${t('vt')}</h3><p>${t('vp')}</p></article></div></div></div></section>

  <section class="section services" id="services"><div class="container"><div class="section-heading"><div><p class="eyebrow">02 / ${t('servicesEyebrow')}</p><h2>${t('servicesTitle')}</h2></div><p>${t('sl')}</p></div><div class="service-grid">${[1,2,3,4,5,6].map(i => `<article class="service-card"><div class="service-top"><svg class="service-icon" viewBox="0 0 32 32" fill="none" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${iconPaths[i-1]}</svg><span>0${i}</span></div><h3>${t('c'+i)}</h3><p>${t('p'+i)}</p></article>`).join('')}</div><a class="text-link services-link" href="#contact">${t('servicesAction')}${arrow}</a></div></section>

  <section class="section regions" id="corridor"><div class="container"><div class="section-heading"><div><p class="eyebrow">03 / ${t('regionsEyebrow')}</p><h2>${t('regionsTitle')}</h2></div><p>${t('regionsBody')}</p></div><div class="region-grid">${['france.jpg', 'maghreb.jpg', 'china.jpg', 'gulf.jpg'].map((file, i) => `<article class="region-card" id="region-${i+1}"><div class="region-photo">${photo(file, ['altFrance','maghrebAlt','altChina','altGulf'][i])}<span class="region-number" aria-hidden="true">0${i+1}</span></div><h3>${t('rn'+(i+1))}</h3><p>${t('rd'+(i+1))}</p></article>`).join('')}</div></div></section>

  <section class="section gallery" id="gallery"><div class="container"><div class="gallery-heading"><p class="eyebrow">${t('galleryEyebrow')}</p><h2>${t('galleryTitle')}</h2></div><div class="gallery-grid"><figure>${photo('industry.jpg', 'altIndustry')}<figcaption><span>${t('industryCaption')}</span><span class="caption-line" aria-hidden="true"></span></figcaption></figure><figure>${photo('conference.jpg', 'altConference')}<figcaption><span>${t('conferenceCaption')}</span><span class="caption-line" aria-hidden="true"></span></figcaption></figure></div><p class="photo-note">${t('photoNote')}</p></div></section>

  <section class="section contact" id="contact"><div class="container contact-grid"><div class="contact-copy"><p class="eyebrow">04 / ${t('contactEyebrow')}</p><h2>${t('contactHeading')}</h2><p>${t('contactBody')}</p><div class="contact-person"><span class="eyebrow">${t('contactDirect')}</span><h3>Mickaël Viudez</h3><p>${t('role')}</p><a class="contact-email" href="mailto:mickael.viudez@gmail.com" dir="ltr">mickael.viudez@gmail.com</a><a href="tel:+8613240410557" dir="ltr">+86 132 4041 0557</a></div><a class="text-link" href="mailto:mickael.viudez@gmail.com?subject=${encodeURIComponent('FAMBA-SMEs — '+dictionary.j)}">${t('j')}${arrow}</a></div>
    <form class="contact-form" action="https://formsubmit.co/mickael.viudez@gmail.com" method="POST"><h3>${t('contactFormTitle')}</h3><input type="hidden" name="_subject" value="FAMBA-SMEs website enquiry (${lang})"><input type="hidden" name="_next" value="https://sme-famba.com${urls[lang]}thanks.html"><input type="hidden" name="language" value="${lang}"><input class="honeypot" type="text" name="_honey" tabindex="-1" autocomplete="off" aria-hidden="true"><div class="form-fields">${field('name','text','name')}${field('email','email','email')}${field('company','text','organization',false)}<label class="full" for="message">${t('message')}<textarea id="message" name="message" placeholder="${t('messagePlaceholder')}" rows="4" maxlength="10000" required></textarea></label></div><button class="button primary" type="submit">${t('send')}${arrow}</button><p class="form-note">${t('formPrivacy')}</p></form>
  </div></section>
</main>
<footer class="site-footer"><div class="container"><div class="footer-main"><a class="home-link" href="${urls[lang]}" aria-label="FAMBA-SMEs">${logo}</a><p>${t('footerLine')}</p><a class="text-link back-top" href="#top">${t('topLink')}${arrow}</a></div><div class="footer-bottom"><span>© 2026 FAMBA-SMEs</span><p>${t('footer')}</p><nav class="languages" aria-label="${t('languageLabel')}" dir="ltr">${languages}</nav></div></div></footer>
<script src="/assets/navigation.js" defer></script>
</body></html>`;
  const dir = path.join('dist', lang === 'en' ? '' : lang);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
  fs.writeFileSync(path.join(dir, 'thanks.html'), `<!doctype html><html lang="${langCode(lang)}" dir="${lang === 'ar' ? 'rtl' : 'ltr'}"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex"><meta name="theme-color" content="#102b39"><title>${t('thanks')} — FAMBA-SMEs</title><link rel="icon" href="/assets/famba-emblem.webp"><link rel="stylesheet" href="/assets/site.css"></head><body class="thanks-page"><main class="thanks-card"><a class="home-link" href="${urls[lang]}" aria-label="FAMBA-SMEs">${logo}</a><p class="eyebrow">${t('ey')}</p><h1>${t('thanks')}</h1><p>${t('thanksBody')}</p><a dir="ltr" href="mailto:mickael.viudez@gmail.com">mickael.viudez@gmail.com</a><a class="button primary" href="${urls[lang]}">${t('back')}${arrow}</a></main></body></html>`);
}
fs.writeFileSync('dist/robots.txt', 'User-agent: *\nAllow: /\nSitemap: https://sme-famba.com/sitemap.xml\n');
fs.writeFileSync('dist/sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${Object.values(urls).map(url => `<url><loc>https://sme-famba.com${url}</loc></url>`).join('')}</urlset>`);
console.log('Built four native language pages, four confirmation pages, and local brand assets.');
