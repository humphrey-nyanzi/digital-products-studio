# Product 001 Automation Scripts

The live master workbook uses a spreadsheet-bound Apps Script project.

## Current Repository Checkpoint

The prepared release package is:

- product001_apps_script_automation_v0_1_5_8.gs
- appsscript_v0_1_5_8.json

It includes all verified v0.1.5.5 behaviour, automatic organiser timezone detection, reset defaults and a runtime permission guard before Result Form setup.

## Permission Architecture

The master manifest explicitly declares:

- https://www.googleapis.com/auth/spreadsheets.currentonly
- https://www.googleapis.com/auth/forms
- https://www.googleapis.com/auth/script.scriptapp

An explicit manifest is necessary. @OnlyCurrentDoc also converts Forms access to forms.currentonly, but FormApp.create requires the full Forms scope to create the workbook-specific Result Form.

The manifest is part of the bound Apps Script project. Google hides appsscript.json in the editor by default. The Studio installs it once in the master project, and customers should receive it through the copied bound project without viewing or editing it.

No full Google Drive or account-wide Google Sheets scope is required.

## Installation Status

The live bound project remains on the previously installed checkpoint until both v0.1.5.8 files are installed in the master. After installation, create a disposable customer copy and inspect its hidden manifest before running Set Up Result Form.

The copy must retain the three approved scopes. Form setup must request any missing consent before FormApp.create runs, detect the browser timezone, create the Result Form and install the automatic triggers.

## Historical Files

Earlier .gs and manifest files are historical checkpoints. Do not install them as the live project source. Script releases are stored as clean .gs files, not TXT wrappers.