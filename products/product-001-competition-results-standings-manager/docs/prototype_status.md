# Prototype Status

Product: Football Competition Results & Standings Manager  
Status: Live Selar offer and public landing page; checkout and managed-fulfilment rehearsals passed; inbound discovery measurement in progress
Last verified: 10 September 2026

## Verified Product State

The live master contains a populated eight-team competition and 28 fixtures.

- The Result Form is Published and linked to the master workbook.
- All Form-linked response tabs are hidden from the customer workflow.
- Create Fixtures contains 8 active teams and generates 28 fixtures.
- Reports shows 2 score-bearing Approved Results and 25 Open Fixtures.
- All 23 Checks return OK and Publishing Status is Ready to publish.
- Create Fixtures is Ready to review and all prepared rows are Ready to publish.

## Current Customer Interface

Visible sheets are Start Here, Setup, Teams, Venues, Create Fixtures, Fixtures, Result Review, Reports and Checks.

Hidden sheets are Form response tabs, Rules, Lookups, Official Results, Standings, Goal Scorers and Archive. Goal Scorers remains parked future scope. Automation Setup and Example Data were removed.

The workbook title and first page explicitly identify football and no longer expose the Product 001 code, prototype terminology, batch labels or developer-facing menu wording.

## Current Form And Automation

The v0.1.5.9 bound-project package has passed copied-workbook technical regression. The copy retained the least-privilege permission configuration, created its own Result Form, detected timezone automatically, hid the response tab, processed a Played submission and applied approval updates to Fixtures, standings and Reports. Full Drive and account-wide Sheets access are not part of the approved scope set.

The Form collects fixture, submitter, optional message and Match Status. Played collects two scores, Walkover selects Home team or Away team, and Postponed or Abandoned collects a reason.

Result Review stores submitted Match Status separately from Official Outcome. Played and Walkover can count as approved results. Postponed remains closed until the manager enters a new schedule and runs Reschedule Selected Fixture. Abandoned starts as Postponed for review and may be resolved according to the competition rules.

## Verified QA

Fixture generation, fixture publishing, per-copy Form creation, response-tab hiding, submission intake, duplicate resolution, approval, standings, Reports, both reset actions, multi-group generation, practical match-day scheduling and sequential multi-group scheduling have passed their defined tests.

The Batch 8A workbook migration preserved 28 fixtures, 25 open fixtures, existing review history and all 23 passing Checks. The rewritten Google Doc User Manual contains customer instructions only and no forbidden dash characters.

The User Manual formatting was repaired on 15 July 2026. Arial is applied throughout, the opening workflow uses a native numbered list, supporting instructions use native bullets, and operational labels use consistent subsection headings. The exported PDF embeds Arial successfully.

## Clean-copy QA Evidence

The first customer-account test confirmed:

- the bound Apps Script copied with the workbook and the Competition Tools menu appeared;
- the second account became the workbook owner;
- a new Result Form was created under the second account;
- the response tab remained hidden from the normal workflow;
- a submitted result reached only the customer copy;
- the Start Here Form link resolved to the new customer Form.

The first test exposed two release blockers:

- the Google authorisation flow displayed an unverified-app warning and the temporary Apps Script project name `Computations`;
- the first customer copy exposed master workbook and master Form links.

On 17 July 2026, a fresh customer copy passed all seven approved regression steps. Internal navigation stayed within the customer workbook, both Form buttons prompted setup before a customer Form existed, Set Up Result Form created the customer-owned Form and both buttons then opened that Form. Customer-copy navigation isolation is no longer a release blocker.

## Final Ordinary-user QA

On 18 July 2026, an account that did not build the product completed the customer workflow in a fresh owned copy. The copied menu appeared without code editing, the approved four-scope consent set was shown, the customer-owned Form was created, response tabs stayed hidden, reset created a backup, a four-team competition generated six fixtures, one Played result was submitted and approved, and Fixtures, standings, Reports and Checks updated only in the customer copy. Editing a protected automatic cell was blocked.

The 18 July outcome is preserved by gate:

- Technical operation: passed.
- Permission and ownership: passed.
- Ordinary-user usability: partial pass.
- OAuth identity: failed because the application was unverified and used an unsuitable personal identity.
- Documentation and packaging: failed because the original User Manual required access.
- Public release: hold.

On 20 July 2026, the OAuth remediation passed its next gates. The standard Cloud project used the exact product application name, the owned domain, the public product homepage and privacy policy, and the dedicated support identity. Google verified and published the branding. The four approved scopes, their justifications and the unlisted workflow demonstration were submitted for data-access verification.

On 23 July 2026, Google requested one correction: the privacy policy must specify data protection mechanisms for sensitive data. The scope set, branding, homepage and Cloud project were not rejected. On 24 July 2026, the expanded policy was deployed and verified, the master Start Here privacy notice and canonical User Manual were aligned, the unchanged application returned to data-access review and a direct response was sent in the existing Google review thread.

The test also found that Google Sheets did not visibly select the detected Africa/Kampala timezone even though GMT+3 behaviour was correct. The repository-prepared v0.1.6.0 checkpoint maps equivalent East Africa timezone identifiers to Africa/Nairobi for a visible Settings value. This checkpoint is not installed or live-tested. Installation remains deferred until a controlled commercial requirement justifies changing the verified application.

## Remediation Foundation

- `freydigitalstudio.com` is registered as infrastructure while the final public brand remains undecided.
- `support@freydigitalstudio.com` inbound routing and branded outbound sending are verified.
- A dedicated support Google account owns the new canonical User Manual.
- The manual is public read-only and passed an unsigned access check.
- The master workbook Start Here link now opens the new manual.
- The product homepage and privacy policy are deployed from `site/` through Cloudflare Pages.
- The stable Product 001 homepage and privacy routes are deployed and passed public HTTPS, content, manual-link and support-address checks.
- Google verified and published the Product 001 branding on 20 July 2026.
- The data-access verification submission includes the four approved scopes and the workflow demonstration at `https://youtu.be/DZ81Cq88wOo`.
- Google approved OAuth verification on 25 July 2026.
- The 28 July commercial gate approved public managed fulfilment rather than a closed named-buyer pilot.
- The buyer must provide a personal Gmail address, accept ownership, authorise the verified application and run Set Up Result Form. No code or manifest editing is required.

## Commercial And Fulfilment Evidence

- Frey Digital Studio is live on Selar at `https://selar.com/m/frey_digital_studio`.
- The Service listing is live at `https://selar.com/football-competition-manager` for UGX 70,000 and USD 19. Currency switching remains enabled.
- The listing uses Software and Tech as its category and Data & Analytics as its subcategory.
- Terms, privacy and refunds pages are live. No shipping policy is used because the product is manually delivered digitally.
- Checkout requires a personal Gmail delivery address and acknowledgement of the one-business-day delivery and ownership-transfer conditions.
- The support-owned Quick Start Buyer Guide is the verified post-purchase redirect and links to the canonical User Manual.
- A zero-value order on 11 August 2026 recorded the checkout fields, issued the buyer receipt, issued the seller notification and opened the Quick Start Buyer Guide.
- Ugandan bank details were accepted and confirmed by email. Selar KYC, a paid transaction and successful payout remain unverified.
- A fresh rehearsal workbook was cleaned to the approved 15-sheet customer structure without changing the working master.
- The rehearsal then exposed a sequence error: the buyer-owned copy used a default Apps Script project and showed the unverified `Competitions` consent identity. The attempt stopped before permissions were granted. This is not a regression in the verified application. It confirms that the Studio must associate standard Cloud project `364546476326` while the support account owns the prepared copy, before transferring ownership.
- The corrected 17 August rehearsal passed the required sequence: support-owned preparation, standard-project association, ownership transfer, verified consent, buyer Form setup, fixture publication, result approval, output checks and Studio access removal.
- The Football Coaching Directory listing is public at `https://fcd.football/listing/football-competition-results-standings-manager`.
- The `freydigitalstudio.com` Google Search Console Domain property is verified. The canonical product page is indexed over HTTPS and the canonical privacy page has an active indexing request.

## Active Blockers

1. Measure the FCD and Search Console baseline through 24 September 2026. Separate exposure, click-through and conversion evidence.
2. Complete one real paid Selar transaction, any resulting KYC and a successful payout before treating settlement as dependable.
3. Keep v0.1.6.0 uninstalled unless a commercial requirement exposes a workflow-impact reason.
4. Add a sitemap only in a separately approved website-maintenance release.

## Next Action

Preserve the verified application and working master. Measure FCD visibility, Search Console impressions or clicks, product-page or Selar clicks, enquiries, checkout attempts, purchases and objections through 24 September 2026. Keep Selar KYC and successful payout open until a real paid order proves them.
