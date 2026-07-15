# Protection Plan

Owner: Humphrey Nyanzi  
Product: Football Competition Results & Standings Manager  
Status: Release-readiness verification required  
Repository document version: 0.4.0  
Last reconciled: 2026-07-10

## Purpose

Keep normal organiser inputs editable while reducing the chance that a buyer damages IDs, formulas, raw submissions, sync state or report calculations.

## July Workbook Boundary

Buyer-facing inputs include Setup values, Teams entries, Venues entries, Create Fixtures settings, Fixtures editable schedule fields and Result Review decision fields.

Automatic or technical areas include Match IDs, team and venue IDs, Form labels, Form eligibility, check columns, raw Form responses, Official Results, Standings, Lookups, Validation helpers, Archive and the parked Goal Scorers sheet.

The July UX pass hides most internal tabs and several helper columns. Hiding is not a substitute for protection.

## Required Protection Checks Before Release

1. Use a clean buyer copy and an ordinary editor account where practical.
2. Confirm users can complete Setup, Teams, Venues and Create Fixtures.
3. Confirm users cannot accidentally overwrite Match IDs, lookup formulas, fixture labels, Form eligibility, raw responses or report calculations without a warning or protected-range boundary.
4. Confirm filters, sorting and normal fixture review work without breaking stable Match IDs.
5. Confirm hidden internal sheets remain recoverable by the owner without becoming part of the normal buyer workflow.
6. Confirm Apps Script actions still work when the buyer cannot edit technical cells.

## Recommended Native Settings

- Protect formula and ID columns in Fixtures and Result Review.
- Protect Setup Form identifiers and sync-status cells.
- Protect hidden helper sheets and raw Form response columns.
- Keep editable cells visually distinct from automatic cells.
- Keep an unchanged master copy before major structural changes.

## Current Caveat

The workflow has passed owner-led functional testing, but normal-user protection behaviour has not yet been fully verified. Do not claim release readiness until that test passes.

## Change Log

### 0.4.0 - 2026-07-10

Replaced the obsolete Goal Scorers protection scope with the July hidden-sheet and ordinary-user verification model.

