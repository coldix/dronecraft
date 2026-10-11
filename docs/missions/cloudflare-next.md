# Cloudflare Workers deployment sequence

Status (11 Oct 2026, 15:15 AEDT, Grok Bot): **LIVE on Cloudflare Workers.**
- Build verified locally and in GitHub Actions. Worker `dronecraft` deployed with wrangler from `astro-migration`.
- Preview: https://dronecraft.col-ab2.workers.dev
- `dronecraft.au` attached as Worker custom domain (Hostinger A/AAAA removed). Always Use HTTPS on.
- `www.dronecraft.au/*` 301 to `https://dronecraft.au/*` via zone Redirect Rule (www = proxied AAAA 100::), query string preserved.
- Nameservers already Cloudflare (dilbert/jewel); no registrar change needed.
- Hostinger email removed at Colin's request: MX mx1/mx2.hostinger.com, SPF TXT, autoconfig/autodiscover CNAMEs, ftp A (46.202.196.151). Google site verification TXT kept. dronecraft.au now has no mail; site contact is col@dixon.au.
- PR #1 still draft. Merge after Colin approves; then set up Workers Builds (or Actions deploy) on `main` so future pushes deploy.

1. Wait for the GitHub Actions **Astro build check** to pass on `astro-migration`. Inspect its downloadable `dronecraft-dist` artefact.
2. In Cloudflare Workers & Pages, create Worker `dronecraft` connected to GitHub `coldix/dronecraft`. Select branch `astro-migration` for an initial preview where supported, or create a non-production preview deployment. Build: `npm run build`, Node 22, config `wrangler.jsonc`.
3. Confirm the resulting preview on `*.workers.dev`. The preview URL does **not** exist until Cloudflare deploys it.
4. Test hero/gallery, responsive images, dark/light, YouTube play, Kuula, adnet, links, GA and SEO files. Fix any failures. Do not merge PR yet.
5. After explicit preview approval, merge PR and configure Workers Builds production branch `main`.
6. Attach apex `dronecraft.au` to Worker using Cloudflare custom domain, replacing **web** DNS as appropriate. Configure `www.dronecraft.au/*` as Cloudflare Redirect Rule with **301**, target `https://dronecraft.au/${uri.path}` (proper Cloudflare expression syntax must be verified in dashboard) and preserve query strings.
7. Check web responses: apex 200, www 301 with path and query preserved, TLS, cache, header policy and all content.
8. Before any registrar or Hostinger account changes, record the original DNS and confirm the preserved mail and Google verification TXT records.

## Critical boundary
Leave **MX, SPF, DKIM, DMARC, mailboxes, routing, forwarding and all other email DNS** untouched without explicit permission from Colin. Cloudflare Active does not imply unused Hostinger mail. Do not alter `ops.dixon.au` or cancel Hostinger.

## Limits
Current chat runtime cannot clone Github nor download dependencies due to network DNS restrictions. GitHub Actions provides an auditable real build rather than claiming a local success. No Cloudflare account API access is available in this session.
