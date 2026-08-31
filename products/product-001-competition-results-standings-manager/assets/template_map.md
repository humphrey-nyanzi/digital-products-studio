# Asset And Template Map

Owner: Humphrey Nyanzi  
Product: Football Competition Results & Standings Manager  
Status: Current Product 001 asset map
Last reconciled: 2026-08-31

## Current Assets

| Asset | Location | Current status |
|---|---|---|
| Live master workbook | Google Drive, see `links.md` | Current implementation authority. Populated eight-team QA state with 28 fixtures. |
| Linked result Form | Google Forms, see `links.md` | Simplified status-based flow with per-copy ownership and verified response-tab privacy. |
| Canonical user manual | Google Docs, see `links.md` | Support-owned, public Viewer access verified. Privacy, ownership and support-access guidance was updated and read back on 24 July 2026. |
| Quick Start Buyer Guide | Google Docs, see `links.md` | Support-owned, public Viewer access verified and configured as the Selar post-purchase redirect. |
| Product support site | Repository root `site/` and stable route `/products/football-competition-manager/` | Verified OAuth routes are unchanged. The approved landing page is implemented and tested locally, while the currently deployed public page remains unchanged pending Director review. |
| Selar listing and legal pages | Selar, see `links.md` | Service listing, UGX and USD prices, product image, checkout fields, terms, privacy and refunds pages are live. |
| Fulfilment folders | Google Drive, see `links.md` | Fulfilment System and Customer Deliveries folders are active. The first rehearsal order folder and clean workbook are retained as process evidence. |

| Installed and verified Apps Script checkpoint | scripts/product001_apps_script_automation_v0_1_5_9.gs and scripts/appsscript_v0_1_5_9.json | Copied-workbook permissions, timezone behaviour, Form setup, hidden response tab, Played submission and approval-output regression passed on 18 July 2026. |
| Prepared timezone-display checkpoint | scripts/product001_apps_script_automation_v0_1_6_0.gs and scripts/appsscript_v0_1_6_0.json | East Africa equivalent zones normalise to Africa/Nairobi. Syntax and helper tests pass. Live installation remains deferred during Google review. |
| Legacy script files | `scripts/form_setup_installer.gs`, `scripts/form_fixture_sync.gs`, v0.1.2 files | Historical only. Do not install as current automation. |

## Public Asset Provenance

The square product cover is a Studio-provided product asset. The four workflow images are cropped screenshots from a Studio-created fictional demonstration competition. They contain no buyer, customer, order or private-account information. These public assets are limited to product demonstration and listing use.

## Planned Release Assets

| Asset | Purpose | Status |
|---|---|---|
| Final bound Apps Script export | Preserve the final release source | v0.1.5.9 operational baseline passed. v0.1.6.0 remains an uninstalled timezone-display checkpoint. |
| User manual Google Doc | Canonical buyer instructions | Support-owned public Viewer copy is current and accessible. |
| User manual Word export | Optional offline buyer reference | Not required for the current Selar redirect flow. Regenerate only if a later channel requires a file upload. |
| Buyer quick-start guide | Short setup path | Current support-owned Google Doc is live and verified through the zero-value checkout redirect. |
| Product image | Selar listing, store card and `site/products/football-competition-manager/assets/product-cover.webp` | The corrected square image is live on Selar and included locally as the landing-page product identifier. |
| Public landing-page brief and listing pack | `docs/public_landing_page_and_listing_pack.md` | Canonical reusable positioning, copy, claim controls and asset requirements. Approved and implemented locally; publication still requires explicit Director approval. |
| Authentic workflow screenshots | `site/products/football-competition-manager/assets/` | Four current WebP screenshots cover Create Fixtures, Result Form, Result Review and Standings and Reports. Personal account details and rehearsal labels are not exposed. |
| Release checklist | Confirm package and support boundaries | Checkout, managed fulfilment, branded outbound support and local landing-page checks passed. Deployment review remains open, while paid settlement qualification is event-driven. |

## Scope Note

Goal scorer tracking and Top Scorers are not v1.0 release assets. The hidden Goal Scorers sheet is parked future work. Automation Setup and Example Data were removed from the buyer workbook.

## Current Constraint

Reset tools are owner-only. Form provisioning, response-tab hiding, reset, copy-local navigation, result processing and protected automatic areas passed ordinary-user QA. The correctly sequenced managed-fulfilment rehearsal passed on 17 August 2026, including standard-project association before transfer, buyer consent, Form setup, isolation and Studio access removal. Branding, OAuth verification and branded outbound support are approved or verified. The Selar checkout and immediate buyer guide passed a zero-value rehearsal. The public screenshots and local landing-page implementation are ready for review. A real paid transaction, KYC if requested, settlement and payout remain event-driven qualification gates.

