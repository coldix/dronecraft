# Astro migration progress

Branch: `astro-migration`.

Confirmed: this is a static, one-page aerial art site, not WordPress. Hostinger wording must be removed. `www` must 301 to apex at Cloudflare routing level, retaining paths and queries.

**Mail safety:** No MX, SPF, DKIM, DMARC, forwarding, mailbox or other mail DNS record may be altered, removed or created without explicit approval from Colin. The absence of a published `@dronecraft.au` address does not prove no mailboxes exist.

Build and Cloudflare routing are **not yet verified**. Before PR merge: capture legacy screenshots (desktop/mobile, both themes), migrate assets, optimise images, check links, Lighthouse and preview.

## 11/10/2026 Cloudflare status

Colin reports that `dronecraft.au` now appears **Active** in his Cloudflare account (`ab29454df8dbb469d259956fcf482075`). Treat DNS onboarding as completed by owner report, not as evidence the Astro Worker or site routing is deployed. An external request still showed the legacy homepage text. The external environment could not independently query DNS records; check authoritative NS, MX, SPF, DKIM, DMARC and Google verification TXT in Cloudflare before routing changes.

Next: test/build branch, connect Workers Builds to `coldix/dronecraft`, obtain a preview, then route apex and 301 www only after approval. Never alter mail records without explicit permission.
