# Architecture Blueprint

Product: Football Competition Results & Standings Manager  
Status: Live workbook architecture, verified 16 July 2026

## Components

Product 001 consists of a Google Sheets master workbook, a workbook-specific Google Form and a bound Apps Script.

- Sheets store competition data, calculations, review decisions and reports.
- The Form collects submissions for eligible fixtures.
- Apps Script handles Form repair, fixture transfer, fixture sync, response processing, approval sync, rescheduling, QA and reset operations.

## Data Flow

```text
Setup, Teams, Venues, Rules
  -> Create Fixtures or manual Fixtures entry
  -> Fixtures, the official schedule
  -> eligible fixture list in Google Form
  -> hidden Form response tab
  -> Result Review submitted Match Status
  -> manager-owned Official Outcome
  -> internal Official Results and Standings
  -> Reports and Checks
```

## Sheet Ownership

| Sheet | Role | Buyer visibility |
|---|---|---|
| Start Here | Buyer navigation | Visible |
| Setup | Competition identity and Form configuration | Visible, technical rows hidden |
| Teams | Team records | Visible |
| Venues | Venue records | Visible |
| Create Fixtures | Draft schedule generation | Visible |
| Fixtures | Official schedule | Visible |
| Result Review | Manager decision queue | Visible |
| Reports | Publication output | Visible |
| Checks | Troubleshooting and publication gate | Visible |
| Form response tabs | Raw submission audit | Hidden |
| Rules, Lookups | Supporting calculations and settings | Hidden |
| Official Results, Standings | Derived calculation layers | Hidden |
| Goal Scorers | Parked future scope | Hidden |
| Archive | Manual archive area | Hidden |

Automation Setup and Example Data were removed from the buyer workbook.

## Fixture Generation Boundary

Create Fixtures generates a complete draft before transfer. Group Round-robin reads every registered non-League group, creates pairings only within each group and combines the results into one transfer-compatible preview. The combined output is sorted by round, group and fixture position so every group completes the same round before the schedule advances. Hidden helper columns retain group counts, raw pairing positions and filtered output while the buyer-facing preview remains unchanged.

The builder blocks incomplete group assignments, groups outside the supported size and combined schedules above 200 fixtures. Home and away orientation uses a deterministic balancing rule to reduce repeated home or away runs. Fixtures remains the official schedule and Batch 7B does not alter existing official fixture records until the owner deliberately runs Publish Fixture List.

The date engine applies a permitted-day pattern to every generated date. Match Days supports every day, weekdays, weekends or one named weekday. Minimum Days Between Rounds is measured from the final fixture date used by one round to the first permitted date of the next. Return Leg Break Days adds an optional calendar-day pause before the second leg of a Double Round-robin. This is a date-level scheduling aid, not exact-hour recovery, venue or travel optimisation.

## Apps Script v0.1.5.8 Prepared Checkpoint

The prepared checkpoint includes:

- `Set Up Result Form`
- `Publish Fixture List`
- `Refresh Result Form`
- `Reschedule Selected Fixture`
- `Replace Result Form` under Repair Tools
- `Process Unread Submissions`
- `Refresh Approved Results`
- `Check Competition Status`
- owner-only reset actions

The installer reuses a Form only when it can be opened and is linked to the current workbook. Replace Result Form is the explicit owner action when the stored Form is missing, in the bin or unusable. It creates a new Form and response sheet while preserving Result Review. The old Form is not deleted automatically.

Customer-facing workbook navigation uses relative sheet links rather than master workbook URLs. On open and during Form setup, v0.1.5.3 repairs legacy links and clears inherited Form configuration when the stored linked spreadsheet ID belongs to another workbook. Start Here and Fixtures then read the copy-specific published Form URL from Setup.

Result Review stores submitted Match Status separately from Official Outcome. The manager outcome drives Fixtures and Official Results. Official Walkover winners are resolved from Home team or Away team. Postponed fixtures use the rescheduling action to preserve audit history before reopening the Form.

## OAuth Scope Inventory

The master and tested customer copy currently use separate bound Script projects with default Google Cloud projects. Their inferred v0.1.5.3 authorisation requested broad spreadsheet and Drive access plus Forms and trigger management.

The prepared v0.1.5.8 package uses an explicit manifest in the master bound project. This is required because @OnlyCurrentDoc also converts Forms access to forms.currentonly, which cannot create a new Result Form. The manifest combines current-workbook spreadsheet access with full Forms management and trigger management. ScriptApp.requireScopes remains as a runtime guard so Form setup cannot continue with partial consent.

| Scope | Product use |
|---|---|
| https://www.googleapis.com/auth/spreadsheets.currentonly | Read, update and copy the current competition workbook. |
| https://www.googleapis.com/auth/forms | Create, configure and update the workbook-specific Result Form. |
| https://www.googleapis.com/auth/script.scriptapp | Create and repair Form-submit and approval-edit triggers. |

No Drive, Gmail, Calendar, external-request, user-profile or account-wide Sheets scope is required. Reset backups use Spreadsheet.copy and are created in the owner account's main My Drive area. The script no longer inspects whether a Form file is in the bin through DriveApp. A missing, binned or unusable Form is handled through Repair Tools > Replace Result Form.

Set Up Result Form opens a short bound dialog that reads the browser IANA timezone, applies it to the workbook and stores it in hidden system setting Setup!D8. If the browser returns an unsupported value, the existing workbook timezone is retained. Reset to Blank Template preserves the system timezone instead of clearing it.

The bound-project scope and timezone package is prepared in the repository. Code.gs and appsscript.json must be installed once in the master. A fresh copy must then confirm that the hidden manifest is inherited and that consent and timezone behaviour match the release requirements.

## Reset Boundary

Reset is an owner-only workflow. It creates a full-workbook backup in the owner account main My Drive area, clears linked records together and safely closes or reopens the connected Form. Reset, Form ownership, response-tab privacy and populated post-reset operation have passed live QA.

## Protection Boundary

Buyer-editable cells must be distinct from formula and ID areas. Hidden sheets, technical columns and Form response records are protected operational layers. A final clean-copy, non-owner test remains required before release.


