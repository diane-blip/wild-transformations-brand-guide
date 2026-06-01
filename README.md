# Wild Transformations Brand Guide

A single-page **Brand & Voice Style Guide** for Kellee Myers, LPC (Wild Transformations Therapy), designed by Sway Rise Creative. Also serves as a Sway Rise Creative portfolio piece.

Originated as a Claude Design **HTML/CSS/JS** handoff (not the React medium — verified clean static HTML, real content in the source, no framework). Shipped as static HTML; no Astro build needed for a one-page document. See `templates/best-practices.md` in the vault for the static-vs-Astro decision rule.

## Structure

```
public/              ← the deployed site (static HTML/CSS/assets)
  index.html         ← the brand guide. Double-click to open in any browser.
  styles.css
  assets/            ← optimized images (1600px long edge, ~1.2 MB total)
wrangler.jsonc       ← Cloudflare static-assets deploy config
optimize-images.mjs  ← one-time image optimizer (dev tool, not part of the site)
package.json         ← holds `sharp` for the optimizer only
```

## Editing

It's plain HTML and CSS. Open `public/index.html` directly in a browser to preview, edit `public/index.html` / `public/styles.css` in any editor. No build step.

## Deploy

Cloudflare Workers static assets. Either:

- **Direct:** `npx wrangler login` once, then `npx wrangler deploy` from this folder.
- **Git-connected (preferred long-term):** connect this repo in the Cloudflare dashboard; it auto-deploys `public/` on every push to `main`.

## Images

Source photos were 24–36 MP camera files (~95 MB total). `optimize-images.mjs` resized them to a 1600px long edge at quality 80 (~1.2 MB total). To re-optimize after dropping new originals into `public/assets/`: `npm install && node optimize-images.mjs`.
