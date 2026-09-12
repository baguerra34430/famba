# FAMBA-SMEs website

Native English, French, Simplified Chinese and Arabic pages for https://sme-famba.com.
The existing Vercel project and custom domain must be preserved.

## Build

Run `npm run build` with Node.js 22 or newer. No package installation is required.
Vercel settings: framework Other, build `npm run build`, output `dist`, repository root.
Connect this repository to the existing `famba` project, not a new project.
Project ID supplied by owner: `prj_0lAk54YEWGBpewUdWh5MzAo2lPXY`.

`source/original.html` is the public production page retrieved during this task.
`build.mjs` preserves its content while replacing its inline drawings and enhancing layout,
navigation, accessibility, metadata and language completeness. Native pages render without JavaScript.
Edit translations in `source/extra-translations.json`; the original translation content is in
`source/original.html`. The build overlays the extra translations on the original ones.

The supplied FAMBA logo is stored unchanged in `assets/famba-logo.png`. All photos are
stored locally so visitors do not depend on external image hosts. Photos are illustrative,
not evidence of FAMBA events or partnerships. See `ASSETS.md` for original image URLs.

## Contact

All email links and the contact form address `mickael.viudez@gmail.com`.
The form uses the FormSubmit endpoint present in the earlier owner-supplied site file.
Actual delivery and any required recipient activation must be verified by the owner after
deployment; no email delivery is claimed from local testing. CAPTCHA remains enabled.
The direct mailto link is always available. Do not place credentials in this repository.

## Deployment verification

After connecting the existing Vercel project, verify the production domain, all four language
routes, image loading, the mobile menu, Arabic direction and a real enquiry delivery.
