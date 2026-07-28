# Product 001: Football Competition Results & Standings Manager

Status: Working prototype v0.1.0, Google OAuth verification approved, public managed fulfilment approved
Last verified: 29 July 2026

Product 001 is a football-first Google Sheets and Google Forms system for small competition organisers, schools, academies, club networks and community tournaments.

## Current Authority

The live workbook and linked Form are the implementation authority. The canonical customer guide is the Google Doc User Manual. This repository holds the product requirements, architecture, decisions, QA plan and Apps Script checkpoints.

- Master workbook: [open](https://docs.google.com/spreadsheets/d/1a-oUlX_yVpSRbito9zdNWfFXj3x8GOcJOSIrnrlZqDg/edit)
- User Manual: [open](https://docs.google.com/document/d/1Ames7P4PMyqcGbKgfSXJlSuO-zqL8-kSi2SFXSGevGs/edit)
- Verified customer-copy checkpoint: [v0.1.5.9](scripts/product001_apps_script_automation_v0_1_5_9.gs)
- Verified least-privilege manifest: [appsscript v0.1.5.9](scripts/appsscript_v0_1_5_9.json)
- Prepared timezone-display checkpoint: [v0.1.6.0](scripts/product001_apps_script_automation_v0_1_6_0.gs)


## Product Scope

- 4 to 32 teams
- Up to 200 fixtures
- Up to 20 venue or playing-area records
- Single and double round-robin, multi-group round-robin, simple knockout shell and manual fixture entry
- Result submission, manager review, approved results, standings, reports and competition checks

Excluded from v0.1.0: player databases, goal-scorer tracking, head-to-head ranking, automatic knockout progression, venue optimisation, disciplinary administration and ongoing competition administration.

## Customer Workflow

1. Complete Setup, Teams and Venues.
2. Create a schedule in Create Fixtures or enter it directly in Fixtures.
3. Publish or confirm the official fixture list.
4. Share the Result Form for open Scheduled fixtures.
5. Review submissions and record the Official Outcome in Result Review.
6. Approved Played and Walkover outcomes update standings and Reports.
7. Confirm Reports shows Ready to publish and Items to Fix is 0.

Officials submit match facts only. They do not enter internal identifiers or correction references. The competition manager resolves duplicates, corrections, postponements and abandoned-match outcomes.

## Current Live State

The live master contains a populated eight-team competition with 28 fixtures. The active Form is published, its response tabs are hidden, 25 Scheduled fixtures are open for submission and all 23 Checks return OK.

Played, Walkover, Postponed and Abandoned submissions have passed through the Form. The official-outcome layer, approved-result counting, reset workflow and postponed-fixture rescheduling have passed live QA.

Create Fixtures supports multi-group generation, balanced pairing orientation, permitted match days, minimum days between rounds, a return-leg break and round-first ordering across groups. The combined schedule remains subject to the 200-fixture limit.

## Customer Language And Football Identity

The customer workbook, Form, menu, dialogs and User Manual use the product name Football Competition Results & Standings Manager and task-based customer language. Product codes, batch names, QA evidence, implementation versions and migration details remain in repository and project records.

The live workbook title and Start Here page explicitly identify football. Visible tabs use Create Fixtures and Checks. Review decisions use Pending, Approved, Replaced, Needs Clarification and Rejected. Apps Script v0.1.5.9 is the installed technical baseline. Fresh customer-copy regression confirmed copy-local navigation, customer-owned Form setup, automatic timezone detection, hidden response handling, submission processing and approval outputs.

## Visual Standard

Arial is the approved product font for the workbook and User Manual. It provides a consistent, readable and widely available sans-serif presentation across Google Sheets, Google Docs and exported documents. The Result Form should use Google's closest clean Basic sans-serif theme option because Google Forms does not expose Arial as a precise automation setting.

The canonical Google Doc User Manual was reformatted on 15 July 2026. It now uses Arial throughout, native numbered and bulleted lists, corrected heading levels and clearer operational subsections.

## Public Support Foundation

The domain `freydigitalstudio.com` is registered as release infrastructure, not as a final public brand decision. `support@freydigitalstudio.com` receives routed mail successfully and is attached to the dedicated product-support Google account. Branded outbound sending is not yet configured, so customer support must not begin until the Studio can send and retain messages through the support identity.

The support account owns the canonical User Manual. The manual is available to anyone with the link as Viewer, and the master workbook Start Here link now opens that support-owned document. Stable Product 001 routes are live at `/products/football-competition-manager/` and `/products/football-competition-manager/privacy/`. These routes let the domain root evolve into a future multi-product catalogue without changing Product 001 OAuth URLs.

Google verified and published the Product 001 branding on 20 July 2026. On 23 July 2026, Google paused the data-access review because the public privacy policy did not specify concrete data protection mechanisms. On 24 July 2026, the expanded policy was deployed and verified, the master Start Here notice and canonical User Manual were aligned, the unchanged application was returned to review and a direct response was sent in the Google review thread. Google approved OAuth verification on 25 July 2026. The verified app name, homepage URL, privacy URL, scopes, OAuth client and Cloud project remained unchanged.

## Approved Commercial Delivery

Product 001 may be listed publicly while each paid order is fulfilled through a Studio-prepared workbook. The marketplace is the checkout and entitlement layer. Google Drive is the ownership-delivery layer.

The approved first-release flow is:

1. The buyer purchases through the selected checkout and supplies a personal Gmail delivery address.
2. The checkout immediately provides a useful Delivery Pack containing the User Manual, fulfilment steps, licence, privacy and support information.
3. The Studio creates a fresh delivery workbook, associates its bound script with standard Cloud project `364546476326`, verifies the release checklist and shares it with the buyer.
4. The Studio requests ownership transfer.
5. The buyer accepts ownership, authorises the verified application and runs Set Up Result Form.
6. The buyer owns the workbook, Form and competition data. Studio access is removed unless the buyer explicitly requests temporary support access.

Direct File > Make a copy is not the release route because it creates a default Cloud project instead of retaining the verified application identity. The first public offer supports personal Gmail ownership only. Work, school and organisation-managed Google accounts require a separately tested delivery route.

Gumroad is the leading first checkout candidate because the Director has a legitimate active US bank account available for payouts. Gumroad remains a channel rather than the business. Seller identity, tax, country and beneficial-owner information must remain accurate, and a real payout test is required before the Studio depends on the route.

## Key Documents

- [Prototype Status](docs/prototype_status.md)
- [Product Requirements](docs/product_requirements.md)
- [Architecture Blueprint](docs/architecture_blueprint.md)
- [Google Form Specification](docs/google_form_spec.md)
- [QA Plan](docs/qa_plan.md)
- [Release Plan](docs/release_plan.md)
- [Decisions](docs/decisions.md)

## Next Action

Complete the market pricing and buyer-comparison task, qualify the Gumroad seller and payout route, configure a true Studio outbound support identity and finish the Delivery Pack. Then rehearse one complete managed fulfilment without changing the verified Apps Script or OAuth configuration. Public release remains conditional on packaging, checkout, support, fulfilment and Director gates.
