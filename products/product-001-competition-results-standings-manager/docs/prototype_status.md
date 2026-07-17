# Prototype Status

Product: Football Competition Results & Standings Manager  
Status: Working prototype v0.1.0, customer-copy isolation passed with OAuth release blockers
Last verified: 17 July 2026

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

The installed bound script is v0.1.5.3. It repairs legacy customer-copy links and clears inherited Form configuration when a copied workbook first opens.

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

## Active Blockers

1. Establish the Studio Google application identity, domain, public privacy policy, standard Cloud project and least-privilege scope inventory.
2. Confirm whether a copied bound script retains the intended standard Cloud project and verified consent identity.
3. Repeat clean-copy and ordinary-user QA after the OAuth architecture decisions are implemented.

## Next Action

Inspect the live appsscript.json, confirm the exact requested scopes and compare the Cloud project identity in the master and customer copy. Decide whether automatic reset backups justify full Google Drive access, then build the shared Studio identity and privacy foundation before OAuth verification and the final clean-copy release gate. Keep the current master as the working prototype and use disposable copies for reset and delivery testing.
