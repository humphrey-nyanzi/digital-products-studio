# Asset And Template Map

Owner: Humphrey Nyanzi  
Product: Football Competition Results & Standings Manager  
Status: Working prototype asset map  
Last reconciled: 2026-07-17

## Current Assets

| Asset | Location | Current status |
|---|---|---|
| Live master workbook | Google Drive, see `links.md` | Current implementation authority. Populated eight-team QA state with 28 fixtures. |
| Linked result Form | Google Forms, see `links.md` | Simplified status-based flow with per-copy ownership and verified response-tab privacy. |
| Canonical user manual | Google Docs, see `links.md` | Updated and reformatted through 15 July 2026 using Arial, native lists and corrected heading levels. |

| Installed Apps Script checkpoint | scripts/product001_apps_script_automation_v0_1_5_3.gs | Installed source. Copy-local workbook and Form navigation passed fresh customer-copy QA. |
| Prepared customer-copy checkpoint | scripts/product001_apps_script_automation_v0_1_5_9.gs and scripts/appsscript_v0_1_5_9.json | Uses explicit least-privilege scopes in the master bound project, keeps the owner-only Result Form replacement path and detects timezone automatically during Form setup. Live installation and copy regression pending. |
| Legacy script files | `scripts/form_setup_installer.gs`, `scripts/form_fixture_sync.gs`, v0.1.2 files | Historical only. Do not install as current automation. |

## Planned Release Assets

| Asset | Purpose | Status |
|---|---|---|
| Final bound Apps Script export | Preserve the final release source | v0.1.5.9 Code.gs and manifest prepared. Master installation, copied-manifest verification, reauthorisation, timezone detection and customer-copy regression remain. |
| User manual Google Doc | Canonical buyer instructions | Current and structurally repaired in Arial. |
| User manual Word export | Marketplace delivery document | Regenerate after the 16 and 17 July release gates. |
| Buyer quick-start guide | Short setup path | Pending packaging. |
| Product screenshots | Listing and manual support | Pending final UI and clean-copy QA. |
| Listing copy | Marketplace positioning and scope | Pending release preparation. |
| Release checklist | Confirm package and support boundaries | Pending final QA. |

## Scope Note

Goal scorer tracking and Top Scorers are not v1.0 release assets. The hidden Goal Scorers sheet is parked future work. Automation Setup and Example Data were removed from the buyer workbook.

## Current Constraint

Reset tools are owner-only. Per-copy Form provisioning, response-tab hiding, populated post-reset operation and copy-local navigation have passed live QA. Apps Script v0.1.5.3 is installed. Exact least-privilege scopes are prepared. Live consent verification, copied Cloud project architecture and public OAuth trust remain release constraints.

