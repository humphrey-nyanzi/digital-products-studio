# QA Plan

Product: Football Competition Results & Standings Manager  
Status: Customer-copy isolation passed, least-privilege package prepared, OAuth and final release checks remain
Last verified: 17 July 2026

## Purpose

Verify that a normal organiser can run a competition without damaging the workbook, losing audit data or publishing incorrect standings.

## Current Gate

The populated end-to-end lifecycle, per-copy Form setup, reset, response-tab privacy, manager outcome workflow, multi-group generation and bounded practical scheduling have passed their defined QA.

The 16 July customer-account test passed copied-script availability, second-account ownership, per-copy Form creation, hidden response-tab behaviour and isolated result processing. It exposed an unverified OAuth consent screen and master-linked workbook navigation. Apps Script v0.1.5.3 repaired the navigation defect, and the 17 July fresh customer-copy regression passed all seven approved isolation steps. Public release remains blocked by the OAuth and Cloud project trust path.

## Required Regression

| Area | Test | Pass condition |
|---|---|---|
| Reset | Clear Match Data - Keep Setup | Backup is created, competition setup remains, match data clears and no error occurs. |
| Reset | Reset to Blank Template | Backup is created, editable setup clears, formulas and automation remain intact. Create Fixtures restores Every day, one 09:00 slot, one match at a time, a one-day round gap, zero return-leg break and the MD prefix. |
| Setup | New competition configuration | Checks resolve after a name, 4 to 32 teams and one active venue are entered. |
| Builder | Generate and transfer fixtures | Builder is Ready to review and Fixtures receives the correct fields and statuses. |
| Group builder | Generate every registered group | Each group has complete internal pairings, no cross-group fixture exists and the combined count is within 200. |
| Group scheduling | Compare equal and unequal group sizes | The same round across all groups is scheduled before the next round, dates remain chronological and capacity rules still apply. |
| Group builder | Reject incomplete assignments | Active teams assigned to League and groups with fewer than two teams block generation with a corrective message. |
| Round-robin fairness | Review home and away runs | Pair coverage remains complete and repeated home or away runs are kept within the verified balancing standard. |
| Match days | Generate weekends and one named weekday | Every generated fixture date falls on an allowed day. |
| Round spacing | Force one round across multiple dates | The next round starts from the final date used by the previous round plus the configured minimum gap. |
| Return leg | Generate Double Round-robin with an added break | The extra break is applied once before the second leg and all 56 eight-team fixtures remain complete. |
| Scheduling validation | Clear Match Days or enter an invalid break | Builder Status blocks transfer with a corrective message. |
| Form setup | Run Set Up Result Form | The Form is created or repaired and both automatic triggers are installed without separate customer menu actions. |
| Timezone | Run Set Up Result Form from a customer account in the intended location | The browser timezone is applied to the workbook automatically, the hidden Setup timezone value matches it and the customer is not asked to choose a timezone. |
| Form sync | Sync eligible fixtures | Only valid Scheduled fixtures appear. |
| Played | Submit and approve | Result Review, Fixtures, standings, Reports and Form eligibility update. |
| Duplicate | Submit one fixture twice before approval | Manager can reject one and approve one while preserving both records. |
| Walkover | Select Home team or Away team | Correct winner and default score reach official outputs. |
| Postponed | Submit, approve and reschedule | Fixture stays closed until a valid new schedule is entered, then rescheduling reopens it and preserves the earlier report. |
| Abandoned | Submit and resolve | Submitted status remains Abandoned and the manager records Played, Walkover, Postponed or Void. |
| Reports | Compare approvals and official results | Official Results counts only Approved Played and Walkover outcomes. |
| Correction | Correct after approval | Manager workflow preserves one Approved record and audit history. |
| Language | Sweep customer-facing surfaces | No product code, prototype, batch, QA or developer terminology appears in the workbook, Form, menu, dialogs or User Manual. |
| Identity | Check the workbook, Form and User Manual first screen | Each surface explicitly identifies football without relying on surrounding context. |
| Typography | Check workbook, Form theme and User Manual | Workbook and User Manual use Arial; the Form uses the closest clean Basic sans-serif theme; no text is clipped or visually inconsistent. |
| Access | Test with intended non-owner user | Form access works and protected areas cannot be damaged. |
| OAuth identity | Authorise from an account that did not build the product | Consent screen uses the approved public application name, verified domain and acceptable warning state. |
| OAuth scopes | Compare requested permissions with the release scope inventory | Every scope is necessary, documented and represented accurately in the privacy policy. |
| Least-privilege authorisation | Install v0.1.5.7 Code.gs in the master, create a disposable copy and reauthorise | The copied project infers current workbook access from Code.gs. Consent requests current workbook access, Forms management and trigger management only. Full Drive and account-wide Sheets access are absent. |
| Reset backup | Run both reset actions after scope reduction | A complete backup is created in the owner account main My Drive area and the reset completes. |
| Replace Result Form | Remove or bin the disposable copy Form, then run Repair Tools > Replace Result Form | A new Form and hidden response sheet are created, Result Review is preserved and the old Form is not deleted automatically. |
| Copy navigation | Open every navigation and Form link in a customer copy | Every destination belongs to the customer copy or its configured Form. No master URL opens. |
| Cloud project | Compare master and customer-copy project numbers | The copied-script verification architecture is confirmed rather than assumed. |
| Capacity | Run representative high-volume tests | Limits, performance and usable layout are confirmed. |

## Evidence To Retain

- Apps Script version and execution-log result.
- Form URL and response destination for a clean copy.
- Concise records of lifecycle tests.
- Checks result after each high-risk action.
- Consent-screen screenshots and the tested Cloud project numbers.
- A link-isolation checklist covering every visible customer navigation control.
- The exact OAuth scope inventory and applicable privacy policy URL.

## Release Rule

Release readiness requires the final bound Apps Script source, passing football-logic regression, ordinary-user access verification and a final clean-copy end-to-end regression. Any remaining limitation must be plainly stated in the buyer guide and listing.

The first 16 July regression is recorded as a partial pass. Customer ownership and operational isolation passed, while OAuth trust and navigation isolation failed. The 17 July fresh-copy regression closed the navigation-isolation failure. A controlled pilot may be considered only through an explicit Director decision; public release still requires the OAuth, Cloud identity and final ordinary-user gates to pass.



