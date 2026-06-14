# Drone Craft Website

Static website for [dronecraft.au](https://dronecraft.au/), Colin Dixon's Mallacoota aerial media and digital storytelling site.

## Overview

The site is a lightweight static build: no package manager, bundler, or build step is required. It uses plain HTML, CSS, and JavaScript, with local image assets and embedded YouTube/Kuula media.

Current published version: `26.06.010`

## File Structure

- `index.html` - Main page markup, metadata, structured data, content sections, embeds, and cache-busted asset references.
- `style.css` - Responsive layout, dark/light theme variables, frosted glass styling, ice frames, drone positioning, and animations.
- `script.js` - Scroll reveal behavior, dark/light theme toggle with `localStorage`, and dynamic footer metadata.
- `.htaccess` - Hostinger/Apache rules for static hosting, cache headers, compression, HTTPS, and security headers.
- `manifest.json` - PWA/mobile manifest and app icon references.
- `robots.txt` and `sitemap.xml` - Search engine discovery files.
- `images/` - Site imagery, icons, logo, and the transparent Mavic 4 Pro-style drone cutout.

## Main Visual Features

- Cinematic Mallacoota hero using `images/betka-clouds`.
- Animated Mavic 4 Pro-style drone cutout: `images/mavic-4-pro-cutout.png`.
- Triple-camera gimbal treatment with visible `Hasselblad` label overlay.
- Red/green navigation light overlays on the drone.
- Dark/light theme toggle in the top navigation.
- Frosted ice-style headings.
- Chunky 3D ice frames around portrait, gallery images, YouTube video, and Kuula panorama.

## Local Preview

Run a local static server from the repository root:

```bash
python3 -m http.server 8080
```

Then open:

```text
http://localhost:8080/
```

Stop the server with `Ctrl+C`, or kill it from another terminal:

```bash
lsof -ti tcp:8080 | xargs -r kill
```

## Versioning

The visible version is stored in `index.html`:

```html
<meta name="version" content="26.06.010" />
<meta name="timestamp" content="14/06/2026 03:42 PM AEST (Mallacoota)" />
```

The same version is used as a query string on `style.css` and `script.js` to bust Hostinger/CDN/browser cache:

```html
style.css?v=26.06.010
script.js?v=26.06.010
```

When changing CSS or JavaScript, update all three version references.

## Deployment

The repository remote is:

```text
https://github.com/coldix/dronecraft.git
```

Pushing to `main` updates GitHub. Hostinger is configured externally to serve the site from this repository. There is no GitHub Actions workflow and GitHub Pages is not enabled.

After pushing, verify the live site with a cache-busting query:

```text
https://dronecraft.au/?v=260610
```

Hostinger may cache the plain homepage for up to one hour.

## Asset Notes

- Keep `.webp` and original `.jpg`/`.png` variants where both are referenced by `<picture>` fallback markup.
- Do not commit `.DS_Store`; it is ignored by `.gitignore`.
- The drone cutout is project-bound and should remain in `images/mavic-4-pro-cutout.png`.
- If replacing the drone, preserve a transparent PNG/WebP with generous padding so the CSS light overlays stay alignable.

## Common Checks

Before pushing, check:

```bash
git status --short
python3 -m http.server 8080
```

Then visually inspect desktop and mobile layouts, especially:

- Theme toggle visibility.
- Hero drone placement.
- Button text wrapping.
- Ice frame thickness around images and embeds.
- Footer version and timestamp.
