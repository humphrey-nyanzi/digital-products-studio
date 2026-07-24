# Product 001 Automation Scripts

The live master workbook uses a spreadsheet-bound Apps Script project.

## Current Repository Checkpoint

The verified technical baseline is:

- product001_apps_script_automation_v0_1_5_9.gs
- appsscript_v0_1_5_9.json

It includes all verified v0.1.5.5 behaviour, automatic organiser timezone detection, reset defaults and a runtime permission guard before Result Form setup.

The repository-prepared next checkpoint is:

- product001_apps_script_automation_v0_1_6_0.gs
- appsscript_v0_1_6_0.json

v0.1.6.0 keeps the same four scopes. It normalises East Africa browser timezone equivalents such as Africa/Kampala to Africa/Nairobi so Google Sheets can display the selected GMT+3 timezone in Settings. It also adds the verified product-specific privacy URL and a data-minimisation warning to the Result Form description. This checkpoint requires syntax and targeted live testing before installation is considered verified.

## Permission Architecture

The master manifest explicitly declares:

- https://www.googleapis.com/auth/spreadsheets.currentonly
- https://www.googleapis.com/auth/forms
- https://www.googleapis.com/auth/script.scriptapp
- https://www.googleapis.com/auth/script.container.ui

An explicit manifest is necessary. @OnlyCurrentDoc also converts Forms access to forms.currentonly, but FormApp.create requires the full Forms scope to create the workbook-specific Result Form.

The manifest is part of the bound Apps Script project. Google hides appsscript.json in the editor by default. The Studio installs it once in the master project, and customers should receive it through the copied bound project without viewing or editing it.

No full Google Drive or account-wide Google Sheets scope is required.

## Verification Status

v0.1.5.9 passed copied-workbook technical regression on 18 July 2026. The copied project created its Result Form, detected timezone, hid the response tab, processed a Played submission and applied approval updates to Fixtures, standings and Reports.

The verified scope set remains current-workbook Sheets, Forms, trigger management and bound-container UI. Full Drive and account-wide Sheets access are absent. The separate-account ordinary-user operational workflow passed on 18 July 2026. On 20 July, a support-prepared delivery workbook retained standard Cloud project 364546476326 after ownership transfer and showed the approved product identity and four permissions. Google verified and published the branding. On 23 July, Google requested concrete privacy-policy protection mechanisms. v0.1.6.0 supports that correction without changing the scope set. Public release remains on hold.

## Historical Files

Earlier .gs and manifest files are historical checkpoints. Do not install them as the live project source. Script releases are stored as clean .gs files, not TXT wrappers.