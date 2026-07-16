# Google Form Specification

Product: Football Competition Results & Standings Manager  
Status: Form workflow verified in v0.1.5.2; copy-isolation repair prepared in v0.1.5.3
Last verified: 16 July 2026

## Purpose

The Google Form collects one outcome for an eligible Scheduled fixture. It is a submission channel, not the official results register. Every submission is reviewed by the competition manager before it affects fixtures, standings or Reports.

The customer-facing Form title is Football Match Result Submission so its purpose is clear when opened outside the workbook.

## Per-copy Form Ownership

Each workbook copy uses its own Result Form. The workbook owner runs Competition Tools > Set Up Result Form once. The installer rejects a Form in the bin, a Form linked to another workbook and a missing response destination. It creates a new Form when no active linked Form exists, records the actual response-sheet name in Setup and hides every Form-linked response tab.

## Eligibility

Only eligible fixtures appear in Fixture Selection. A fixture is eligible when it is Scheduled, has valid active participants and venue, has no blocking check and has no Approved result. Once a result is approved, the fixture leaves the Form after sync.

## Official Workflow

Officials provide only match facts:

1. Select Fixture Selection.
2. Enter Submitted By and Submitter Role.
3. Optionally add Message to Competition Manager.
4. Choose Match Status.
5. Complete only the status-specific page shown.

Officials never enter Match IDs, Team IDs, Submission IDs, a correction type or a repeated match date.

## Status Pages

| Status | Form fields | Expected handling |
|---|---|---|
| Played | Home Score, Away Score | Both scores are whole numbers of zero or more. |
| Walkover | Walkover Winner: Home team or Away team | Script resolves the selected side to the fixture team. |
| Postponed | Reason or Context | No score is requested. |
| Abandoned | Reason or Context | No score is requested. |

Void is a manager-only Result Review decision. Goal-scorer tracking, Optional Scorer Text, Evidence Link, Submission Type and Match Date are excluded from the Form.

## Duplicate And Correction Policy

Before approval, an official may submit the same still-eligible fixture again with corrected information and a short message. Result Review surfaces the earlier and newest active submissions. The manager rejects the wrong row and approves the correct row.

After approval, the manager owns the correction. Use score overrides for a score-only correction. Preserve incorrect submissions for audit and do not delete them.

## Submitted Status And Official Outcome

Match Status records what the official reported. Official Outcome records the manager's final decision and is the value used by Fixtures and official outputs.

- Played normally resolves to Played.
- Walkover resolves to Walkover after the manager confirms Home team or Away team.
- Postponed resolves to Postponed and remains unavailable in the Form until rescheduled.
- Abandoned defaults to Postponed for review. The manager may resolve it as Played, Walkover, Postponed or Void according to the competition rules and evidence.

To reopen a postponed fixture, the manager updates its new date, time and venue in Fixtures, selects the row and runs `Competition Tools > Reschedule Selected Fixture`. The earlier postponement becomes Replaced and remains in the audit history.

## Response-Sheet Compatibility

The active response sheet is discovered when Set Up Result Form runs, its actual name is stored in Setup and every Form-linked response tab is hidden automatically. `PRODUCT001_valueByHeader_` scans matching headers from right to left and selects the newest nonblank value, with historical aliases for Walkover Winner, Message to Competition Manager and Reason or Context.

## Form Presentation

Use a restrained navy and pale-blue theme, the closest clean Basic sans-serif font available in Google Forms and no decorative header image. Arial is the workbook and User Manual standard, but Google Forms does not expose exact Arial selection through the installer. Keep pages only where a page contains status-specific fields. Do not retain empty or decorative sections.

## Regression Requirements

1. Set up the Form from the final bound script.
2. Sync fixtures and confirm only eligible Scheduled fixtures are offered.
3. Submit Played, Walkover, Postponed and Abandoned outcomes.
4. Submit the same fixture twice before approval, reject one row and approve the other.
5. Confirm a manager correction after approval preserves the audit trail.
6. Confirm Postponed remains closed until Reschedule Selected Fixture is run with a valid new schedule.
7. Confirm Abandoned preserves the submitted status while the manager records a separate Official Outcome.
8. Confirm no official sees an internal identifier or scorer field.
9. Confirm the raw response sheet, Result Review, Fixtures, Reports and Checks behave correctly.


