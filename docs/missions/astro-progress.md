# Astro migration progress

Branch: `astro-migration`.

Confirmed: this is a static, one-page aerial art site, not WordPress. Hostinger wording must be removed. `www` must 301 to apex at Cloudflare routing level, retaining paths and queries.

**Mail safety:** No MX, SPF, DKIM, DMARC, forwarding, mailbox or other mail DNS record may be altered, removed or created without explicit approval from Colin. The absence of a published `@dronecraft.au` address does not prove no mailboxes exist.

Build and Cloudflare routing are **not yet verified**. Before PR merge: capture legacy screenshots (desktop/mobile, both themes), migrate assets, optimise images, check links, Lighthouse and preview.
