# ChatGPT mission: dronecraft.au → Astro on Cloudflare

Version 1 · 11 Oct 2026 13:30 AEDT
For: ChatGPT / Codex, working in this repo with GitHub access as `coldix`
Repo: https://github.com/coldix/dronecraft
Live now: https://dronecraft.au (Hostinger, served straight from this repo's `main`)

## The goal
Rebuild Drone Craft as an Astro site on Cloudflare (Workers with static assets, or Pages if simpler), auto-deploying from `main`. Same content and facts, better UI. Then Colin flips DNS and Hostinger goes away.

Drone Craft is Colin Dixon's one-page site for Mallacoota aerial art: drone photos, a cinematic YouTube reel, a Kuula 360, and links to his socials and booking.

You have a free hand on the UI. Make it faster, cleaner and more striking. Keep it one page unless a second page clearly helps. Downtime during the DNS switch is fine.

## What's there now (read the repo, this is a summary)
Plain static HTML/CSS/JS. No build step, no forms, no PHP, no WordPress. The repo matches the live site.

- `index.html`: the whole site. Sections: nav (Work, Video, 360, Connect, theme toggle) · hero · intro · `#work` gallery · `#video` · `#panorama` · adnet ad slot · `#connect` · footer.
- `style.css`: dark/light themes, frosted glass, "ice frame" borders, drone animation.
- `script.js`: scroll reveal, theme toggle saved in `localStorage` (dark default), footer year/version/timestamp from meta tags.
- `css/adnet.css` + `https://ads.oze.au/t.js`: oze adnet house-ad slot. Source of truth is `coldix/adnet` (`embed/adnet.css`).
- `images/`: `betka-clouds` (hero, OG image), `mavic-4-pro-cutout.png` (transparent drone, with red/green nav lights and a "Hasselblad" label overlaid in CSS), `Colin-Pebbly1-2k` (portrait), `Sunrise Coota` (filename has a space), `dronecraft-logo`, favicons and app icons. Most have `.webp` + `.jpg/.png`.
- `manifest.json`, `robots.txt`, `sitemap.xml`. No `llms.txt` yet.
- `.htaccess`: Hostinger cache, security headers, HTTPS and www→apex redirect. Note: `https://www.dronecraft.au` currently returns 200, not a 301. Fix that on Cloudflare.
- `README.md`: Hostinger deploy notes and a stale version number (README says 26.06.010, `index.html` says 26.08.011).

## Facts to keep exactly
Do not change, drop or invent any of these.

- Name: Drone Craft. Person: Colin Dixon, "Aerial artist and digital strategist". Base: Mallacoota, VIC. Platform: DJI Mavic 4 Pro. Media: Drone / 360 / Video.
- Email: `col@dixon.au` · Phone: 0419 415 000 (`tel:0419415000`)
- "Schedule a Chat": https://calendly.com/colindixon
- "View Aerial Work" button: https://coota.au/
- YouTube reel: video id `hMtv0z8pSFc` · Channel: https://www.youtube.com/@mallacoota2020
- Kuula 360: `https://kuula.co/share/hnh4w?logo=1&info=1&fs=1&vr=1&zoom=1&sd=1&autorotate=0.51&thumbs=1` · Profile: https://kuula.co/profile/mallacoota
- Socials: Facebook group https://www.facebook.com/groups/dronecraft · Instagram https://www.instagram.com/coldix/ · X https://x.com/colindixon · Substack https://oze.unleashed.substack.com/ · Discord https://discord.gg/NvmM3ny2TV · LinkedIn https://www.linkedin.com/in/colindixon/
- Footer: "© <year> Colin Dixon · All rights reserved · <version> · <timestamp> · Website by oze.au" (link https://oze.au)
- Google Analytics: `G-HZEBQGV488`
- Google site verification lives in DNS TXT (`google-site-verification=L7Han...`). Keep that record.
- JSON-LD `Person` block in `index.html`: keep it, same values. Add a `WebSite` block if you like.
- Meta title, description, keywords, OG and Twitter tags: keep the meaning, tidy wording is fine.

## Copy rules
- Keep facts exact (list above). Light polish only, same voice.
- Remove anything about hosting. The intro currently says the site is "ready for Hostinger static hosting". Replace that line with something about the work.
- No em dashes in site copy. Use a full stop, comma or middle dot.
- No made-up clients, testimonials, prices, awards or stats.
- Australian spelling.

## Step 0: before you change anything
1. Work on a branch: `astro-migration`.
2. Screenshot the live site at desktop and phone width (dark and light) and save to `docs/legacy-screenshots/`. Keep the old static files in git history; you don't need a `legacy/` copy since the repo already matches live.

## Build it
1. New Astro project at the repo root (Node 22.12+). Static output.
2. Components, roughly: `BaseLayout`, `Header` (nav + theme toggle), `Hero`, `Intro`, `Gallery`, `YouTubeFacade`, `KuulaEmbed`, `AdnetSlot`, `Connect`, `Footer`. Your call on exact split.
3. Move images to `src/assets/` and use Astro's image pipeline (AVIF/WebP, responsive sizes). Rename `Sunrise Coota.*` to `sunrise-coota.*`. The portrait PNG is 1.6 MB and the hero JPG 1.7 MB: let the pipeline shrink them.
4. Keep the drone: transparent cutout, nav lights, gentle motion. Respect `prefers-reduced-motion`.
5. Theme: dark default, light toggle, saved in `localStorage`, no flash on load (inline script in `<head>`).
6. **Video: YouTube only.** Don't host video files. Use a facade (poster image + play button, load the iframe on click). Use `youtube-nocookie.com`.
7. Kuula: lazy-load (load when scrolled near, or click to load).
8. Adnet: keep the "Sponsored" row of three 300x250 slots (`data-ad-zone` = `in-content`, `in-content-2`, `in-content-3`) and `t.js`. Copy `css/adnet.css` as is (it reserves fixed space to avoid layout shift).
9. Fonts and icons: self-host Inter (or a better pairing) and swap Font Awesome CDN for inline SVG icons. Fewer third-party requests.
10. SEO: canonical `https://dronecraft.au/`, `robots.txt`, `sitemap.xml` (Astro sitemap integration is fine), `manifest.json`, favicons, and a new `public/llms.txt` (short plain-text summary + contact).
11. Version and timestamp: keep the `<meta name="version">` and `<meta name="timestamp">` pattern, format `YY.MM.NNN` and `DD/MM/YYYY hh:mm AM/PM AEDT (Mallacoota)`. Bump on each release. Show in the footer.
12. Only the built site is public. `README.md`, `docs/`, `CHANGELOG.md` must never be served.
13. Targets: Lighthouse mobile 95+ on all four, good on a phone, keyboard accessible, alt text on every content image.

## Free UI improvement (ideas, not rules)
- Full-bleed aerial hero with the drone floating over it.
- Gallery with a lightbox, room for more shots later (data-driven from one list).
- Keep the "ice frame" idea if it still looks good, or retire it for something cleaner. Your call.
- Clear calls to action: Schedule a Chat, Email Colin, View Aerial Work.

## Deploy on Cloudflare
1. `wrangler.jsonc` for a Worker named `dronecraft` with static assets from `dist/`. Pages is fine if simpler.
2. Security headers (from `.htaccess`) in `public/_headers` or the Worker: `X-Content-Type-Options: nosniff`, `X-Frame-Options: SAMEORIGIN`, `Referrer-Policy: strict-origin-when-cross-origin`, `Permissions-Policy: geolocation=(), microphone=(), camera=()`. Long cache on hashed assets, short on HTML.
3. Redirects: `www.dronecraft.au/*` → 301 `https://dronecraft.au/*` (keep path and query). Old asset paths that might be linked elsewhere (`/images/betka-clouds.jpg` is the OG/sitemap image) should still resolve or 301.
4. Auto-deploy from `main`: either Cloudflare Workers Builds (Colin connects the repo in the dashboard) or a GitHub Action running `wrangler deploy` with repo secrets `CLOUDFLARE_API_TOKEN` (Edit Cloudflare Workers) and `CLOUDFLARE_ACCOUNT_ID`. No secrets in the repo.
5. Get a preview on `*.workers.dev` and give Colin the link.
6. Remove `.htaccess` and Hostinger notes. Rewrite `README.md` for Astro + Cloudflare (dev, build, deploy, versioning). Add `CHANGELOG.md`.
7. Open a PR from `astro-migration` to `main`. Don't merge until Colin has seen the preview.

## Email and DNS (read before the switch)
Current DNS is on Hostinger (`ns1/ns2.dns-parking.com`), with Hostinger MX (`mx1/mx2.hostinger.com`) and an SPF TXT for Hostinger mail. The site uses `col@dixon.au`, not a dronecraft.au address.

- Ask Colin: is any Hostinger mailbox on `@dronecraft.au` in use? Assume no unless he says yes.
- If no: after the switch, drop Hostinger MX/SPF and set up free Cloudflare Email Routing `info@dronecraft.au` → `col@dixon.au` (optional).
- Keep the `google-site-verification` TXT record.

## Who does what
**Colin:**
1. Add `dronecraft.au` to Cloudflare (Free plan) when asked.
2. Check the preview and say go.
3. Change nameservers at the registrar to Cloudflare's. Downtime is fine.
4. Add `CLOUDFLARE_API_TOKEN` to the repo's Actions secrets if you use the Action route.
5. Cancel Hostinger for dronecraft.au once live and checked.

**ChatGPT:**
1. Step 0, build, preview, PR.
2. Once Colin approves: merge, attach custom domain `dronecraft.au` (and `www`) to the Worker, set the www redirect.
3. Clean DNS in Cloudflare: no Hostinger A records left, MX/SPF per Colin's answer, keep verification TXT.
4. After NS is active, check: HTTPS, home page, every link in "Facts to keep exactly", www 301, YouTube facade plays, Kuula loads, adnet slot shows, theme toggle, GA firing, `robots.txt` / `sitemap.xml` / `llms.txt`, and a push to `main` auto-deploys.

## Guardrails
- Don't touch the registrar or delete anything on Hostinger. Colin does that.
- Don't spend money. Ask first if anything isn't free.
- Don't change facts, links or contact details.
- Don't edit ops.dixon.au.

## When it's live: handoff for the Chief of Staff (Grok Bot)
Grok Bot keeps ops.dixon.au up to date. Don't edit it yourself. Give Colin this to paste into his Grok Bot chat, and commit it as `docs/missions/static-to-astro-cloudflare-done.md`.

```
Drone Craft is live on Cloudflare. Please update ops.dixon.au:
- Site: dronecraft.au (www → 301 to dronecraft.au)
- Hosting: Cloudflare Workers (Astro), auto-deploy from coldix/dronecraft main
- Main AI: ChatGPT (Codex)
- Live since: <date time AEDT>
- Preview/PR: <workers.dev link> · <PR link>
- Checked: page, links, www redirect, HTTPS, YouTube, Kuula, adnet, GA, Lighthouse <scores>
- Email: <none / Email Routing info@dronecraft.au → col@dixon.au>
- Hostinger: safe to cancel
- Follow-ups: <anything open>
```

## Done when
dronecraft.au serves the new Astro site over HTTPS from Cloudflare, www 301s to the apex, every fact and link above is unchanged, video is a YouTube facade, pushing to `main` deploys, Hostinger files and notes are gone from the repo, and Colin has the handoff above.

## End-of-job summary report (required)

Every AI (Codex, Claude, Antigravity, ChatGPT, Grok Bot) must end its PR body and its final reply with this block, exactly as laid out, so the jobs.oze.au dashboard can read it. One field per line, keep the labels as written, fill every line. Use "not shown" when the tool does not show a value. Dates are dd/mm/yyyy, times are AEDT (Melbourne).

```
## Job report
- Repo: coldix/<repo>
- Website: <live or preview URL, or none>
- AI: <agent, e.g. Antigravity>
- Model: <model and effort as shown in the tool, e.g. Gemini 3 Pro High>
- Started: dd/mm/yyyy HH:MM AEDT
- Ended: dd/mm/yyyy HH:MM AEDT
- Time taken: <minutes>
- Usage: <tokens, credits or requests if the tool shows them, else not shown>
- PR: <url>
- Status: <merged/open/blocked>
- Summary: <1 to 3 lines>
```

Full rule: https://github.com/coldix/jobs/blob/main/AGENTS-REPORTING.md
