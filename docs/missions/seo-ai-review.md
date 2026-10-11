# SEO and AI discovery review, 11/10/2026

## Implemented on astro-migration
- Natural-language service descriptions and Mallacoota context without fabricated credentials or service areas.
- WebSite, Person and Service JSON-LD graph (no invented physical office).
- Updated title/description and page version; retained canonical and social cards.
- Updated `llms.txt` with canonical site, contact, portfolio, work types and video/360 links.
- Replaced stale sitemap lastmod with 2026-10-11, the actual content-edit date.
- Maintained robots allow rules, image alt text and existing contact links.

## Live verification
- Public crawl of https://dronecraft.au/ on 11/10/2026 still returned **the prior intro copy**, not the latest SEO changes. Cloudflare Worker domain routing/deployment is unverified.
- Public retrieval of /llms.txt and www.dronecraft.au failed within the available web retrieval tool; these are **not** definitive HTTP-status checks.
- GitHub Actions Astro build check ran on the branch. Check latest commit status before merge.
- No Lighthouse mobile audit or Google Search Console inspection was possible with current access. Do not claim scoring/indexing success.

## After deployment
1. Verify GET /, /robots.txt, /sitemap.xml, /llms.txt and legacy image URLs return expected content/status.
2. Verify https://www.dronecraft.au/path?x=1 sends a single 301 to https://dronecraft.au/path?x=1, preserving query.
3. Run Lighthouse mobile on the live URL (all four categories), fix identified failures; verify media facades, theme, adnet, keyboard navigation and images.
4. In Google Search Console inspect URL https://dronecraft.au/ and submit sitemap if it is not already submitted. Check indexing and rich result/schema validity, noting eligibility doesn't mean search ranking.
5. Check response headers, canonical, Open Graph previews and generated JSON-LD using validator tools.
6. Preserve email-related DNS and do not merge draft PR until Colin approves the preview.
