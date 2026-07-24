# Prototype Status

Product: Football Competition Results & Standings Manager  
Status: Working prototype v0.1.0, Google privacy correction required, public release on hold
Last verified: 24 July 2026

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

On 23 July 2026, Google requested one correction: the privacy policy must specify data protection mechanisms for sensitive data. The scope set, branding, homepage and Cloud project were not rejected. The correction batch expands the existing privacy policy, adds a non-functional Start Here privacy notice and formalises temporary support access, deletion and incident-response controls before resubmission. On 24 July 2026, the master workbook Start Here page received a visible privacy and data-use panel linked to the stable product-specific privacy URL.

The test also found that Google Sheets did not visibly select the detected Africa/Kampala timezone even though GMT+3 behaviour was correct. The repository-prepared v0.1.6.0 checkpoint maps equivalent East Africa timezone identifiers to Africa/Nairobi for a visible Settings value. This checkpoint is not installed or live-tested, and installation is deferred during the active Google review.

## Remediation Foundation

- `freydigitalstudio.com` is registered as infrastructure while the final public brand remains undecided.
- `support@freydigitalstudio.com` routing is verified.
- A dedicated support Google account owns the new canonical User Manual.
- The manual is public read-only and passed an unsigned access check.
- The master workbook Start Here link now opens the new manual.
- The product homepage and privacy policy are deployed from `site/` through Cloudflare Pages.
- The stable Product 001 homepage and privacy routes are deployed and passed public HTTPS, content, manual-link and support-address checks.
- Google verified and published the Product 001 branding on 20 July 2026.
- The data-access verification submission includes the four approved scopes and the workflow demonstration at `https://youtu.be/DZ81Cq88wOo`.

## Active Blockers

1. Deploy and live-verify the expanded privacy policy at the existing verified URL.
2. Update the User Manual. The master Start Here notice is live, and the Result Form remains unchanged during review.
3. Keep v0.1.6.0 uninstalled until Google completes the active review or explicitly requests an application change.
4. Resubmit the unchanged four-scope application and reply directly to the Google review email.
5. Decide the controlled-pilot package, support boundary, price, payment method and first revenue target.
6. Make an explicit public-release or hold decision after verification and packaging pass.

## Next Action

Complete the privacy correction batch, verify the affected public and in-product surfaces, resubmit the unchanged OAuth configuration and reply directly to Google. Preserve the approved app name, homepage URL, privacy URL, scope set and Cloud project. Continue private pricing and packaging work while public release remains on hold.