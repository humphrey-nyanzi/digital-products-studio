# Product 001 Automation Scripts

The live master workbook uses a spreadsheet-bound Apps Script project.

## Current Repository Checkpoint

product001_apps_script_automation_v0_1_5_7.gs is the prepared customer-copy checkpoint. It includes all verified v0.1.5.5 behaviour and adds:

- @OnlyCurrentDoc in Code.gs, so copied bound projects can infer current-workbook spreadsheet access without customer manifest work;
- an explicit runtime permission check before Form setup, so copied projects request Forms and trigger access before FormApp.create runs;
- automatic organiser timezone detection during Competition Tools > Set Up Result Form;
- automatic application of that timezone to the workbook and hidden system setting Setup!D8;
- preservation of the workbook timezone during Reset to Blank Template;
- automatic hiding of the timezone row and Form response tabs from the customer workflow.

The expected authorisation scopes are:

- https://www.googleapis.com/auth/spreadsheets.currentonly
- https://www.googleapis.com/auth/forms
- https://www.googleapis.com/auth/script.scriptapp

No full Google Drive or account-wide Google Sheets scope is required.

## Installation Status

The live bound project remains on the previously installed checkpoint until v0.1.5.7 is copied into the master Code.gs. The release no longer depends on installing or copying a prepared appsscript.json file. Earlier manifest files remain historical QA evidence only.

After installing the script in the master, verify a new disposable customer copy. Run Set Up Result Form, confirm the detected timezone under File > Settings, and inspect Project OAuth Scopes. Account-wide Sheets access and full Drive access must be absent.

## Historical Files

Earlier .gs and manifest files are historical checkpoints. Do not install them as the live Code.gs source. Script releases are stored as clean .gs files, not TXT wrappers.
