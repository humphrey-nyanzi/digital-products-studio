# Product Decisions

Product: Football Competition Results & Standings Manager  
Last updated: 15 July 2026

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

Decision: final clean-copy and ordinary-user QA takes place on 16 July 2026, followed by QA closeout and delivery decisions on 17 July. Pricing, packaging and publication remain gated by those outcomes.

Consequence: no broad feature work is added during release closeout. Release-blocking defects are fixed, limitations are documented and non-blocking improvements move to later scope.
