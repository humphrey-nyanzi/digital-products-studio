# Product 001 Automation Scripts

The live master workbook uses a spreadsheet-bound Apps Script project.

## Current Repository Checkpoint

product001_apps_script_automation_v0_1_5_3.gs is the installed 17 July 2026 copy-isolation checkpoint. It parses successfully and contains:

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
- repair of every customer-facing workbook navigation link to a copy-local sheet target;
- a dynamic Fixtures Form link that reads the configured Form URL;
- automatic clearing of inherited Form configuration when a copied workbook first opens.

## Prepared Scope-Reduction Checkpoint

product001_apps_script_automation_v0_1_5_4.gs and appsscript_v0_1_5_4.json are prepared but are not yet installed in the live bound project. This checkpoint removes DriveApp, creates reset backups with Spreadsheet.copy, adds the owner-only Replace Result Form repair action and declares only these scopes:

- https://www.googleapis.com/auth/spreadsheets.currentonly
- https://www.googleapis.com/auth/forms
- https://www.googleapis.com/auth/script.scriptapp

The manifest also changes the script timezone from Africa/Nairobi to Africa/Kampala.

## Installation Status

The live bound project is running v0.1.5.3. v0.1.5.4 remains an implementation package until it is installed, reauthorised and tested in a disposable copy. A fresh customer copy already passed all seven v0.1.5.3 isolation steps: copy-local navigation worked immediately, both Form buttons requested setup before a Form existed, Set Up Result Form created the customer-owned Form and both buttons then opened that Form.

## Historical Files

Earlier `.gs` files are historical checkpoints. Do not install them as the live Code.gs source. Script releases are stored as clean `.gs` files, not TXT wrappers.
