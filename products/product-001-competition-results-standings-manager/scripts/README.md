# Product 001 Automation Scripts

The live master workbook uses a spreadsheet-bound Apps Script project.

## Current Repository Checkpoint

The verified technical baseline is:

- product001_apps_script_automation_v0_1_5_9.gs
- appsscript_v0_1_5_9.json

It includes all verified v0.1.5.5 behaviour, automatic organiser timezone detection, reset defaults and a runtime permission guard before Result Form setup.

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

The verified scope set remains current-workbook Sheets, Forms, trigger management and bound-container UI. Full Drive and account-wide Sheets access are absent. The remaining release gate is a separate-account ordinary-user test plus the Studio Google application identity and consent-screen decision.

## Historical Files

Earlier .gs and manifest files are historical checkpoints. Do not install them as the live project source. Script releases are stored as clean .gs files, not TXT wrappers.