# FAMBA-SMEs website

Native English, French, Simplified Chinese and Arabic pages for https://sme-famba.com.
The existing Vercel project and custom domain must be preserved.

## Build

Run `npm run build` with Node.js 22 or newer. No package installation is required.
Vercel settings: framework Other, build `npm run build`, output `dist`, repository root.
Connect this repository to the existing `famba` project, not a new project.
Project ID supplied by owner: `prj_0lAk54YEWGBpewUdWh5MzAo2lPXY`.

`build.mjs` generates native language pages from `source/content.json` and
`source/brand-translations.json`. Every displayed translation is required at build time.
Edit the design in `source/site.css` and the small mobile menu in `source/navigation.js`.
The pages, language links, content and enquiry form work without JavaScript. JavaScript
adds a collapsible mobile menu and retains the current section when switching languages.
`source/original.html`, `source/extra-translations.json` and `source/refinements.css` are
retained as historical references; the redesigned site does not load them.

The redesigned emblem uses the supplied logo's globe and growth motif in navy, teal and
muted gold. It is paired with a consistent text wordmark in the header, footer and confirmation
pages. The original is retained in `assets/famba-logo.png` for reference and is not deployed.
All images are local. The custom hero illustration depicts an imagined Mediterranean port.
The photographs illustrate markets and business subjects; they do not document FAMBA events
or members. See `ASSETS.md` for provenance.

The build clears and recreates `dist`; do not edit generated files there. The initial page
loads the compact WebP emblem and hero. Supporting photographs load lazily. There are no
runtime framework packages or externally hosted fonts.

## Contact

All email links and the contact form address `mickael.viudez@gmail.com`.
The form uses the FormSubmit endpoint present in the earlier owner-supplied site file.
Actual delivery and any required recipient activation must be verified by the owner after
deployment; no email delivery is claimed from local testing. CAPTCHA remains enabled.
The direct mailto link is always available. Do not place credentials in this repository.

## Deployment verification

After connecting the existing Vercel project, verify the production domain, all four language
routes, image loading, the mobile menu, Arabic direction and a real enquiry delivery.
