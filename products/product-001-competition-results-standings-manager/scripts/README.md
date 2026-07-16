# Product 001 Automation Scripts

The live master workbook uses a spreadsheet-bound Apps Script project.

## Current Repository Checkpoint

product001_apps_script_automation_v0_1_5_3.gs is the 16 July 2026 copy-isolation checkpoint. It parses successfully and contains:

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

## Installation Status

The live bound project is running v0.1.5.2. Install v0.1.5.3 as the next Code.gs source, save and reload the master workbook. The next fresh customer copy should show copy-local navigation immediately and should show Set up the Result Form first until its owner runs Competition Tools > Set Up Result Form.

## Historical Files

Earlier `.gs` files are historical checkpoints. Do not install them as the live Code.gs source. Script releases are stored as clean `.gs` files, not TXT wrappers.
