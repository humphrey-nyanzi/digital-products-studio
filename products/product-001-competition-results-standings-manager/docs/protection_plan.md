# Protection Plan

Owner: Humphrey Nyanzi  
Product: Football Competition Results & Standings Manager  
Status: Ordinary-user protection verification passed, support data controls prepared
Repository document version: 0.5.0
Last reconciled: 2026-07-24

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

## Verified Ordinary-user Result

On 18 July 2026, an ordinary-user account completed setup, fixture creation, Form submission, approval and reporting in its own workbook. Editing a protected automatic area was blocked. The protection gate therefore passed for the tested customer workflow.

This result does not by itself approve public release. Google privacy correction, data-access verification, packaging, support boundaries and the Director release decision remain open.

## Controlled Delivery And Support Access

1. The support account may prepare a delivery workbook and associate the standard Cloud project before ownership transfer.
2. The customer becomes the workbook owner and owns the Result Form created from that workbook.
3. The support account is removed after ownership transfer unless the customer explicitly requests temporary support access.
4. Temporary access is limited to the named file, the stated support purpose and the time needed to resolve the request.
5. When the support case closes, remove the support account and delete any downloaded support copy within 30 days unless a longer period is required by law or requested by the customer.
6. Record the ownership transfer, support removal and any approved temporary exception in the delivery checklist.

## Security Incident Response

If unauthorised access, disclosure, modification or loss involving Google user data is suspected:

1. contain the issue and revoke access that is not required;
2. preserve relevant evidence without copying more customer data than necessary;
3. identify the affected workbook, Form, account, customer and time window;
4. investigate the cause and correct the failed control;
5. notify affected customers and Google when appropriate or required; and
6. document closure and any follow-up prevention work in the owning Studio system.

## Change Log

### 0.5.0 - 2026-07-24

Added controlled-delivery support access, deletion and security incident-response controls for the Google verification correction.

### 0.4.0 - 2026-07-10

Replaced the obsolete Goal Scorers protection scope with the July hidden-sheet and ordinary-user verification model.

