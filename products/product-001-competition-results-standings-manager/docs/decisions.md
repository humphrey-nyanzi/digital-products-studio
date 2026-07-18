# Product Decisions

Product: Football Competition Results & Standings Manager  
Last updated: 17 July 2026

## D001 - Football-first self-service scope

Decision: Product 001 serves small football competition organisers using a reusable spreadsheet and Form workflow.

## D002 - Sheets, Form and bound Apps Script

Decision: v0.1.0 uses Google Sheets for structured operations, a workbook-specific Google Form for submissions and bound Apps Script for unsafe state changes.

## D003 - Fixtures are the official schedule

Decision: Create Fixtures creates drafts. Fixtures is the official register and the only fixture source for Form eligibility.

## D004 - Manager-owned result decisions

Decision: officials submit match facts. The competition manager owns Review Decisions, duplicate resolution, corrections, score overrides and Void decisions.

Consequence: the Form does not expose internal IDs, correction types or historical submission references.

## D005 - Status-based Form flow

Decision: the Form branches after Match Status. Played collects two scores; Walkover selects Home team or Away team; Postponed and Abandoned collect reason or context.

## D006 - Preserve audit history

Decision: do not delete incorrect submissions. Reject or supersede them and retain raw responses and Result Review history.

## D007 - Goal scorers excluded from v0.1.0

Decision: scorer tracking and Top Scorers reporting are parked future scope. Goal Scorers remains hidden and must not appear in Form, Reports or the buyer workflow.

## D008 - Hide or remove buyer-irrelevant surfaces

Decision: internal sheets remain hidden. Automation Setup and Example Data were removed and their useful guidance belongs in the canonical User Manual.

## D009 - Owner-only reset actions

Decision: provide Clear Match Data - Keep Setup and Reset to Blank Template, each with a backup and typed confirmation.

Current status: per-copy Form creation, response-tab hiding, reset and populated post-reset operation have passed live QA through Apps Script v0.1.5.0.

## D010 - Documentation authority

Decision: maintain the current state in the owning Product 001 documents, the canonical User Manual and the Product 001 Notion record. Do not create separate reconciliation documents for routine drift.
## D011 - Separate submitted status from competition outcome

Decision: preserve the official's submitted Match Status and record a separate manager-owned Official Outcome.

Consequence: an Abandoned report is not automatically a Walkover. It defaults to Postponed for review, while the manager may resolve it as Played, Walkover, Postponed or Void. Only Played and Walkover are score-bearing official results.

## D012 - Manager-controlled postponement reopening

Decision: a Postponed fixture remains unavailable in the Form until the manager enters a new schedule and runs Reschedule Selected Fixture.

Consequence: the earlier postponement is retained as Replaced, the fixture returns to Scheduled and the Form refreshes without deleting audit history.

## D013 - Complete multi-group generation

Decision: Group Round-robin generates every registered group in one draft schedule rather than generating one selected group at a time.

Consequence: Active teams must be assigned to a named group, pairings remain inside each group, each group requires at least two teams and the combined draft must fit the 200-fixture limit. A deterministic home and away balancing rule reduces repeated home or away runs without changing the official Fixtures register until transfer.

## D014 - Bounded practical scheduling controls

Decision: Create Fixtures supports permitted match days, minimum calendar days between rounds and an optional return-leg break for Double Round-robin.

Consequence: organisers can model common weekend, weekday and single-day schedules without manual date rebuilding. The controls operate at calendar-date level and do not claim exact-hour recovery, travel or venue optimisation.

## D015 - Interleave multi-group rounds

Decision: combined Group Round-robin output is ordered by round, then group and fixture position.

Consequence: every registered group completes MD1 before any group advances to MD2. Scheduling capacity is counted across all groups in the shared round, while pairings remain confined to their assigned group.

## D016 - Customer language boundary

Decision: customer-facing workbook pages, the Result Form, the Competition Tools menu, dialogs and the User Manual use the product name and task-based competition language only.

Consequence: Product 001, batch identifiers, QA evidence, implementation versions, migration notes and developer terminology remain in repository, Notion and project records. Customer-facing labels use Create Fixtures, Publish Fixture List, Checks, Approved Results, Open Fixtures, Items to Fix, Official Outcome, Approved and Replaced.

## D017 - Explicit football identity

Decision: the customer-facing product name is Football Competition Results & Standings Manager, and the customer-facing Form title is Football Match Result Submission.

Consequence: football is explicit in the workbook, Form and User Manual from the first screen. Soccer may be used in marketplace keywords or search metadata, but it is not added to the operational interface. Product 001 remains the internal project code.

## D018 - Arial product typography

Decision: Arial is the standard font for the customer workbook and User Manual. The Google Form uses the closest clean Basic sans-serif theme available in the Form editor.

Consequence: customer-facing documents use a consistent, readable and widely available typeface. The User Manual uses native headings and lists rather than manual styling that can break during export.

## D019 - Release gates before public launch

Decision: the 16 July clean-copy test is a partial pass. Customer ownership, copied automation, customer Form creation and isolated response processing passed. OAuth trust and copy-local navigation did not pass.

Consequence: public packaging and launch remain blocked while the Studio establishes its Google application identity, privacy and verification foundation and Product 001 repairs master-linked navigation.

## D020 - Studio-managed Google application identity

Decision: public Google automation products use a Studio-managed distribution identity, owned domain, public privacy policy, support contact and approved standard Google Cloud project rather than an informal personal or temporary project identity.

Consequence: the Studio foundation is reusable across future products, while each product still records its exact scopes, data use and verification evidence.

## D021 - Customer-copy isolation is mandatory

Decision: every visible workbook link, Form link, response destination and automated write in a customer copy must resolve to that customer's assets or an explicitly public support resource.

Consequence: a master workbook URL, old Form URL or cross-copy data write is a release-blocking defect.

## D022 - Preserve the working master during release architecture work

Decision: do not blank the current working master while link and OAuth architecture work is underway. Use disposable customer copies for reset, authorisation and delivery testing.

Consequence: the master remains implementation evidence and the current QA copy remains defect evidence only. A fresh customer copy is required for the final release gate.

## D023 - Copy-local navigation uses relative sheet links

Decision: customer-facing workbook navigation uses relative sheet links. Form buttons read the configured published Form URL from Setup. Apps Script repairs legacy navigation and clears inherited Form configuration when the stored linked spreadsheet ID belongs to another workbook.

Consequence: a copied workbook does not navigate back to the Studio master, and it does not expose the master Form before the customer owner sets up a copy-specific Result Form.

## D024 - Customer-copy navigation isolation passed

Decision: Apps Script v0.1.5.3 and the copy-local workbook formulas are the verified navigation baseline for the current prototype.

Evidence: on 17 July 2026, a fresh customer copy passed all seven approved steps covering internal workbook navigation, pre-setup Form prompts, customer-owned Form creation and both post-setup Form links.

Consequence: customer-copy navigation is no longer a release blocker. OAuth consent trust, exact scopes, Cloud project identity and the final ordinary-user release gate remain open.

## D025 - Least-privilege Apps Script scopes

Decision: the prepared v0.1.5.9 master bound project declares current-workbook spreadsheet access, Forms management, trigger management and bound-container dialog access through an explicit manifest. Full Google Drive and account-wide Sheets access are removed.

Consequence: reset backups use Spreadsheet.copy and are created in the owner account main My Drive area. The script no longer checks the bin state through DriveApp. A missing, binned or unusable Result Form is replaced through the owner-only Repair Tools > Replace Result Form action, which preserves Result Review and leaves old Form deletion to the owner.

Verification boundary: this decision is implemented in the repository package but is not live evidence until v0.1.5.9 is installed, reauthorised and regression-tested in a disposable customer copy.

## D026 - Blank reset restores usable scheduling defaults

Decision: Reset to Blank Template clears customer competition data but restores safe Create Fixtures defaults instead of leaving required scheduling controls blank. The defaults are Every day, one 09:00 kick-off slot, one match at a time, a one-day minimum gap between rounds, zero return-leg break and the MD prefix.

Consequence: a first-time organiser still chooses the format, teams and first match date, but is not blocked by a required Match Days value that the reset removed. Set Up Result Form installs the submission and approval triggers automatically. Trigger repair commands remain owner-only recovery tools rather than normal setup steps.
## D027 - Automatic competition timezone

Decision: competition organisers do not choose a timezone from a limited workbook list. Set Up Result Form detects the organiser browser timezone, applies it to the workbook and stores it as a hidden system setting.

Consequence: dates, times, backups and Form operations use the organiser context without adding setup burden. If detection fails, the workbook retains its existing timezone.

## D028 - Bound-project permission boundary

Decision: @OnlyCurrentDoc cannot be used because it also reduces Forms access to forms.currentonly, while this product must create a separate Result Form. The master bound project therefore owns an explicit least-privilege manifest.

Consequence: the Studio configures Code.gs and appsscript.json once in the master. Customers copy the bound project with the workbook and do not edit code or the hidden manifest. Clean-copy QA must confirm that the copied project retains current-workbook Sheets, Forms, trigger and container UI scopes without full Drive or account-wide Sheets access.
## D029 - v0.1.5.9 copied-workbook technical regression passed

Decision: v0.1.5.9 is the verified technical baseline for copied-workbook Form setup and result processing.

Evidence: on 18 July 2026, a workbook copy successfully detected timezone, created its Result Form, hid the response tab, processed a Played submission and applied an approved result to Fixtures, standings and Reports.

Consequence: copied-workbook technical operation is no longer the active blocker. Separate-account consent identity, protection behaviour, delivery usability and the final release decision remain open.
