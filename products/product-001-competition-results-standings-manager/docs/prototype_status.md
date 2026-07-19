# Prototype Status

Product: Football Competition Results & Standings Manager  
Status: Working prototype v0.1.0, ordinary-user operational QA passed, public release on hold
Last verified: 19 July 2026

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

The outcome is separated by gate:

- Technical operation: passed.
- Permission and ownership: passed.
- Ordinary-user usability: partial pass.
- OAuth identity: failed because the application was unverified and used an unsuitable personal identity.
- Documentation and packaging: failed because the original User Manual required access.
- Public release: hold.

The test also found that Google Sheets did not visibly select the detected Africa/Kampala timezone even though GMT+3 behaviour was correct. The repository-prepared v0.1.6.0 checkpoint maps equivalent East Africa timezone identifiers to Africa/Nairobi for a visible Settings value. This change is not installed or live-tested yet.

## Remediation Foundation

- `freydigitalstudio.com` is registered as infrastructure while the final public brand remains undecided.
- `support@freydigitalstudio.com` routing is verified.
- A dedicated support Google account owns the new canonical User Manual.
- The manual is public read-only and passed an unsigned access check.
- The master workbook Start Here link now opens the new manual.
- The product homepage and privacy policy are deployed from `site/` through Cloudflare Pages.
- `https://freydigitalstudio.com/` and `https://freydigitalstudio.com/privacy/` passed public HTTPS, content, manual-link and support-address checks on 19 July 2026.

## Active Blockers

1. Configure the approved standard Google Cloud project and OAuth consent identity.
2. Confirm whether a copied bound script retains the intended standard Cloud project and consent identity.
3. Install and target-test v0.1.6.0 timezone display normalisation.
4. Make an explicit release or controlled-pilot decision after the remaining gates.

## Next Action

Configure the standard Google Cloud project and production OAuth consent screen under the dedicated support identity. Then confirm the copied bound-project identity in a fresh workbook copy.
