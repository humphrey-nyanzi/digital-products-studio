# Product 001: Football Competition Results & Standings Manager

Status: Working prototype v0.1.0, customer-copy isolation passed, OAuth release gate pending
Last verified: 17 July 2026

Product 001 is a football-first Google Sheets and Google Forms system for small competition organisers, schools, academies, club networks and community tournaments.

## Current Authority

The live workbook and linked Form are the implementation authority. The canonical customer guide is the Google Doc User Manual. This repository holds the product requirements, architecture, decisions, QA plan and Apps Script checkpoints.

- Master workbook: [open](https://docs.google.com/spreadsheets/d/1a-oUlX_yVpSRbito9zdNWfFXj3x8GOcJOSIrnrlZqDg/edit)
- User Manual: [open](https://docs.google.com/document/d/175zrNdp8QMkO5hCle0QyVysWicAMdKVIFdfSBfRQR5o/edit)
- Installed script checkpoint: [v0.1.5.3](scripts/product001_apps_script_automation_v0_1_5_3.gs)


## Product Scope

- 4 to 32 teams
- Up to 200 fixtures
- Up to 20 venue or playing-area records
- Single and double round-robin, multi-group round-robin, simple knockout shell and manual fixture entry
- Result submission, manager review, approved results, standings, reports and competition checks

Excluded from v0.1.0: player databases, goal-scorer tracking, head-to-head ranking, automatic knockout progression, venue optimisation, disciplinary administration and ongoing competition administration.

## Customer Workflow

1. Complete Setup, Teams and Venues.
2. Create a schedule in Create Fixtures or enter it directly in Fixtures.
3. Publish or confirm the official fixture list.
4. Share the Result Form for open Scheduled fixtures.
5. Review submissions and record the Official Outcome in Result Review.
6. Approved Played and Walkover outcomes update standings and Reports.
7. Confirm Reports shows Ready to publish and Items to Fix is 0.

Officials submit match facts only. They do not enter internal identifiers or correction references. The competition manager resolves duplicates, corrections, postponements and abandoned-match outcomes.

## Current Live State

The live master contains a populated eight-team competition with 28 fixtures. The active Form is published, its response tabs are hidden, 25 Scheduled fixtures are open for submission and all 23 Checks return OK.

Played, Walkover, Postponed and Abandoned submissions have passed through the Form. The official-outcome layer, approved-result counting, reset workflow and postponed-fixture rescheduling have passed live QA.

Create Fixtures supports multi-group generation, balanced pairing orientation, permitted match days, minimum days between rounds, a return-leg break and round-first ordering across groups. The combined schedule remains subject to the 200-fixture limit.

## Customer Language And Football Identity

The customer workbook, Form, menu, dialogs and User Manual use the product name Football Competition Results & Standings Manager and task-based customer language. Product codes, batch names, QA evidence, implementation versions and migration details remain in repository and project records.

The live workbook title and Start Here page explicitly identify football. Visible tabs use Create Fixtures and Checks. Review decisions use Pending, Approved, Replaced, Needs Clarification and Rejected. Apps Script v0.1.5.3 is installed. A fresh customer-copy regression confirmed copy-local navigation, customer-owned Form setup and customer-specific Form links across all seven approved steps.

## Visual Standard

Arial is the approved product font for the workbook and User Manual. It provides a consistent, readable and widely available sans-serif presentation across Google Sheets, Google Docs and exported documents. The Result Form should use Google's closest clean Basic sans-serif theme option because Google Forms does not expose Arial as a precise automation setting.

The canonical Google Doc User Manual was reformatted on 15 July 2026. It now uses Arial throughout, native numbered and bulleted lists, corrected heading levels and clearer operational subsections.

## Key Documents

- [Prototype Status](docs/prototype_status.md)
- [Product Requirements](docs/product_requirements.md)
- [Architecture Blueprint](docs/architecture_blueprint.md)
- [Google Form Specification](docs/google_form_spec.md)
- [QA Plan](docs/qa_plan.md)
- [Release Plan](docs/release_plan.md)
- [Decisions](docs/decisions.md)

## Next Action

Inspect the live appsscript.json, confirm the exact OAuth scopes and compare the Google Cloud project identity in the master and customer copy. Then decide whether automatic reset backups justify full Google Drive access before the Studio identity and verification work continues.
