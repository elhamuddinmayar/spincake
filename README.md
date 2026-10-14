# Spin Cake · سپین کېک — Website

Website for **Spin Cake**, Sweets & Food in Kabul ([Google Maps](https://maps.app.goo.gl/bjbHALHnTxdYcjPq7) · [Facebook](https://www.facebook.com/SpinSahaar2021) · +93 77 166 4004).

**Stack:** React 19 · Vite · Tailwind CSS v4 · three.js + React Three Fiber + drei · Framer Motion · Lenis

## Run

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build in dist/
```

## Editing content (no coding needed)

| What | File |
| --- | --- |
| Menu items, prices, categories | `src/data/menu.js` |
| Phone, Facebook, address, opening hours, WhatsApp | `src/data/site.js` |
| All page text in English / Pashto / Dari | `src/i18n/translations.js` |
| Photos, logo, printed-menu pages | `public/img/` |

Add a dish by copying a line in `menu.js`; add a category by copying a block (pick an `icon` from those in `src/components/Menu.jsx`).
The hero stats (number of dishes, categories, lowest price) are calculated from the menu automatically.

## Performance

- The page (React + UI, ~118 KB gzip) renders first; the 3D engine (~270 KB gzip) is a separate chunk fetched when the browser is idle.
- No WebGL or "Data Saver" on → 3D is skipped and the logo is shown instead.
- All 3D scenes share one WebGL canvas; resolution drops automatically on slow devices.
- Images are WebP; printed-menu pages load as small thumbnails, full size only when opened.

## Structure

- `src/components/` — page sections (Hero, Menu, About, Craft, CakeStudio, Visit, Footer) and `Extras.jsx` (loader, cursor, progress bar, magnetic buttons, language switch)
- `src/three/` — 3D models (`Treats.jsx`), scenes (`Scenes.jsx`), the lazily loaded canvas/views (`views.jsx`, `lazy.jsx`)
- `src/i18n/` — language provider (RTL for Pashto/Dari) and translations
