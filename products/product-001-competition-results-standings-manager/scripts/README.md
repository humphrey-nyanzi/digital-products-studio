# Product 001 Automation Scripts

The live master workbook uses a spreadsheet-bound Apps Script project.

## Current Repository Checkpoint

`product001_apps_script_automation_v0_1_5_2.gs` is the 15 July 2026 customer-language and football-identity checkpoint. It parses successfully and contains:

- the customer-facing Competition Tools menu;
- per-copy Result Form provisioning;
- Publish Fixture List from Create Fixtures to Fixtures;
- Result Form refresh and response processing;
- approval updates that change fixture outcomes and Form eligibility;
- dynamic response-sheet discovery and duplicate-header compatibility;
- separate submitted status and Official Outcome handling;
- postponed-fixture rescheduling;
- customer-facing competition status checks;
- reset and backup actions;
- migration of legacy review decisions to Pending, Approved and Replaced;
- compatibility aliases for the former Fixture Builder and Validation tab names;
- the customer-facing Football Match Result Submission title.

## Installation Status

The live bound project is still running v0.1.5.0. Install v0.1.5.2 as the next Code.gs source, reload the workbook and run Competition Tools > Set Up Result Form once. This updates the menu, dialogs and Form wording without changing the Form ID or response destination.

## Historical Files

Earlier `.gs` files are historical checkpoints. Do not install them as the live Code.gs source. Script releases are stored as clean `.gs` files, not TXT wrappers.
