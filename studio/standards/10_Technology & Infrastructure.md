# Technology & Infrastructure

---

**Document:** Technology & Infrastructure
**File Name:** 10_Technology & Infrastructure.md
**Status:** Authoritative
**Version:** 1.0.0
**Owner:** Studio Director (Humphrey Nyanzi)
**Authority:** High
**Last Updated:** June 2026
**Next Review:** Quarterly

---

# Purpose

This document defines the Studio's technology and infrastructure strategy.

It explains where products are built, where documentation lives, how version control works, and how Google Drive, GitHub and other tools should be used together.

The objective is to keep the Studio practical, organised and scalable without introducing unnecessary complexity.

---

# Technology Philosophy

Technology should support the product, not define it.

The Studio chooses tools because they help solve real problems.

Simple, reliable and accessible tools are preferred over complex tools that add unnecessary friction.

The Studio should adopt the simplest workflow that satisfies current needs while leaving a clear path to future capabilities.

---

# Global Product Configuration

Studio products should be usable by a global audience where practical.

Products should avoid hard-coding regional assumptions unless the product scope requires it.

Where relevant, products should make the following configurable or clearly documented:

* currency
* timezone
* date format
* time format
* measurement units
* English terminology or spelling convention
* competition season or reporting calendar
* local terminology

For spreadsheet products, prefer a visible setup or configuration sheet for these settings.

Dates and times should be stored in a consistent internal format and displayed in the user's configured format where practical.

Financial outputs should clearly state the selected currency. USD is the default for products involving money unless the product scope justifies another default. Products should not mix currencies unless conversion rules are explicitly defined.

Exports, reports and documentation should show the assumptions used to produce them. Products are English-first unless a specific product scope explicitly requires translation.

---

# Core Principle

Every product is developed as though it were a software product, regardless of its final format.

This means that even spreadsheets, dashboards, templates and documents should have:

* version control
* documentation
* quality review
* release notes
* changelogs
* maintenance
* clear ownership

---

# Primary Tools

The Studio currently uses:

* Google Sheets
* Microsoft Excel
* Google Forms
* Google Apps Script
* Markdown
* Git
* GitHub
* Google Drive
* Python, where useful
* Canva or equivalent design tools, where useful

Additional tools may be introduced when justified by product requirements.

---

# GitHub

GitHub is the Studio's engineering home.

It stores:

* Markdown documentation
* product documentation
* scripts
* source code
* exported release files
* changelogs
* issues
* product roadmaps
* prompt libraries
* shared assets
* release history

GitHub is the authoritative source for project history.

---

# Google Drive

Google Drive is the Studio's operational workspace.

It stores:

* live Google Sheets
* live Google Forms
* live Apps Script projects
* working spreadsheets
* exported PDFs
* exported DOCX files
* client-facing files
* screenshots
* videos
* marketing assets
* backup copies

Google Drive is optimised for editing, sharing and live collaboration.

---

# Important Clarification

GitHub does not replace Google Sheets.

Native Google Sheets remain in Google Drive.

GitHub stores the surrounding engineering assets:

* documentation
* exported Excel versions
* Apps Script source code, where applicable
* screenshots
* release notes
* user guides
* links to live Google files

The Google Sheet is the working product.

GitHub documents, versions and packages the product.

---

# Recommended Workflow

For a Google Sheets-based product:

```text
Google Drive
│
├── Live Google Sheet
├── Google Form
├── Apps Script Project
├── Working Assets
└── Exported Files
```

```text
GitHub Repository
│
├── README.md
├── CHANGELOG.md
├── LICENSE
├── docs/
├── scripts/
├── assets/
├── exports/
├── templates/
└── links.md
```

The live product remains in Google Drive.

The release package and project history live in GitHub.

---

# Repository Strategy

The Studio should use one central Studio repository and separate repositories for mature products where appropriate.

## Studio Repository

Example:

```text
digital-products-studio/
```

Contains:

* Studio Charter
* Studio Manual
* Product Vocabulary
* AI Collaboration Guide
* Documentation Standards
* Design System
* Release Standards
* Technology & Infrastructure
* Product Templates
* Shared prompts
* Shared assets
* Studio-level planning

---

## Product Repositories

Example:

```text
competition-manager/
gym-reporting-system/
running-log/
```

Each product repository contains the documentation, assets, releases and scripts for that product.

Product repositories should reference the Studio repository standards.

---

# Product Repository Structure

Recommended structure:

```text
product-name/
│
├── README.md
├── CHANGELOG.md
├── LICENSE
│
├── docs/
│   ├── Product Requirements.md
│   ├── User Guide.md
│   ├── Setup Guide.md
│   ├── Architecture.md
│   ├── QA Log.md
│   └── Release Notes.md
│
├── scripts/
│   └── Apps Script or automation files
│
├── assets/
│   ├── screenshots/
│   ├── images/
│   └── icons/
│
├── exports/
│   ├── product-name_v1.0.0.xlsx
│   └── product-name_v1.0.0.pdf
│
├── templates/
│   └── reusable templates
│
└── links.md
```

---

# links.md

Every product using live cloud files should include a `links.md` file.

It should contain:

* live Google Sheet link
* Google Form link
* Apps Script project link, if applicable
* demo video link
* published product page
* Gumroad or sales page
* documentation links
* internal working folder link

Do not rely on memory to locate important files.

---

# Version Control

Git should be used for:

* Markdown
* scripts
* source code
* exported release files
* product documentation
* changelogs
* structured templates

Git should not be used as the primary editor for live Google Sheets.

---

# Apps Script

For Version 1 products, Apps Script may remain inside Google Drive.

When the Studio matures, Apps Script source files should be copied or exported into GitHub.

Future maturity may include tools such as `clasp` for proper Apps Script version control.

Do not introduce advanced tooling before it provides clear value.

## Public Google Automation

Google Workspace products that request customer permissions require a trusted public identity and a repeatable release process. This applies to products using Apps Script, Google Forms, Drive access, installable triggers or other Google services.

### Shared Studio infrastructure

The Studio should establish and maintain these assets once, then reuse them where appropriate:

* a Studio-controlled distribution account with a professional sender name
* an owned domain and a public Studio or product-support website
* a public privacy policy and support contact
* one or more standard Google Cloud projects with clear production names
* a documented OAuth consent and verification procedure
* a register of approved scopes and why each scope is needed

The personal account of the Studio Director should not be the default customer-facing sharing identity once a Studio distribution identity is available.

### Per-product requirements

Every Google automation product must document and verify:

* the customer-facing application name and purpose
* the exact Google services, data and OAuth scopes used
* whether the product needs sensitive or restricted scopes
* which public privacy policy and support contact apply
* whether a copied bound script retains the intended Cloud project and consent identity
* who owns each customer workbook, Form and response destination
* that internal workbook links resolve inside the customer's copy
* that Form links come from the copy's current configuration rather than a master URL
* that a clean customer copy passes first-time setup and ordinary-user QA

### OAuth and scope rules

Use the least privilege required for the product to work. Prefer explicit scopes in the Apps Script manifest once the required scope set is understood.

Before public distribution:

1. associate the production script with the approved standard Google Cloud project;
2. configure the OAuth consent screen with the correct app name, support contact, domain and public policy links;
3. verify ownership of every domain used on the consent screen;
4. prepare accurate scope justifications and demonstration evidence;
5. complete the applicable Google verification process;
6. test the consent flow using an account that did not build the product;
7. record any warning, user cap or verification limitation as a release blocker.

Do not promise that verification of the master automatically covers customer copies. Confirm the Cloud project and consent identity in an actual copied workbook.

### Customer-copy isolation

A customer copy must operate independently from the Studio master.

Confirm that:

* the customer owns their workbook and newly created Form;
* submissions update only the customer workbook;
* the response tab is hidden from the normal customer workflow;
* navigation does not open the Studio master;
* no master Form, response destination or private Drive file is reused;
* repair and reset actions cannot alter another customer's copy or the Studio master.

Any cross-copy link or data leak is a release-blocking defect.

---

# Excel Support

Where practical, products should support Microsoft Excel.

Excel support should be tested separately from Google Sheets.

If a product behaves differently in Excel, document the limitation clearly.

For automated Google products, sharing permissions and OAuth permissions are separate concerns. Both must be tested. A workbook can be owned correctly while its script still displays an unverified-app warning or requests scopes under an unsuitable project identity.

A Google Sheets product may still be released without full Excel parity if:

* the limitation is documented
* the product remains useful
* the release notes explain compatibility clearly

---

# File Naming

Release files should use consistent names.

Recommended format:

```text
product-name_v1.0.0.xlsx
product-name_user-guide_v1.0.0.pdf
product-name_release-notes_v1.0.0.md
```

Avoid:

```text
final.xlsx
latest.xlsx
new version.xlsx
copy of template.xlsx
```

---

# Backups

Important live files should be backed up before major changes.

Recommended backup moments:

* before release
* before major formula changes
* before Apps Script changes
* before restructuring sheets
* before client delivery

Backups should be labelled with dates and versions.

---

# Permissions

Live Google files should use careful permission settings.

Avoid unrestricted editing access unless necessary.

Recommended access levels:

* Owner: Studio Director
* Editor: trusted collaborators only
* Viewer: demo users or reviewers
* Make a copy: public template distribution

For public templates, users should receive copy access rather than edit access to the master file.

---

# Distribution

Products may be distributed through:

* Gumroad
* GitHub Releases
* Google Drive copy links
* personal website
* newsletter
* direct client delivery

The distribution method should match the product type and audience.

---

# GitHub Issues

GitHub Issues should be used for:

* bugs
* feature requests
* documentation improvements
* release tasks
* product ideas
* technical debt

Issues should be specific and actionable.

---

# GitHub Projects

A Studio-level GitHub Project may track work across products.

Recommended pipeline:

```text
Ideas
↓
Research
↓
Requirements
↓
Planning
↓
Building
↓
Review
↓
Internal QA
↓
Packaging
↓
Release Candidate
↓
Released
↓
Maintenance
```

This pipeline should align with the Studio Manual.

---

# Infrastructure Maturity Model

The Studio should grow in stages.

## Stage 1 — Simple Hybrid Workflow

Current default.

* GitHub for documentation and releases
* Google Drive for live Google products
* manual exports
* manual testing

Public Google automation products must link to an accessible privacy policy that accurately explains the Google data accessed, the purpose of access, storage and retention, sharing, deletion or reset behaviour, security responsibilities and a contact route. The policy must match the released implementation and requested scopes.
* manual release review

This is sufficient for early products.

---

## Stage 2 — Structured Engineering Workflow

Introduce when products become more complex.

* Apps Script copied into GitHub
* clearer release branches
* issue-based development
* standard QA logs
* reusable scripts
* improved backup procedures

---

## Stage 3 — Automated Workflow

Introduce only when justified.

* Apps Script managed with `clasp`
* automated tests
* packaging scripts
* release automation
* CI/CD workflows
* automated documentation generation

The Studio should not skip stages unnecessarily.

---

# Security

Do not store sensitive credentials in GitHub.

Never commit:

* passwords
* API keys
* private client data
* personal financial data
* confidential organisation data
* private Google Drive links intended only for internal use

Use placeholders or environment variables where necessary.

---

# Data Privacy

Products should avoid including real personal data unless required and authorised.

Demo datasets should use fictional or anonymised data.

Client-specific files should remain private.

Public products should not expose operationally sensitive information.

Products intended for global use should also consider regional data protection expectations.

Where products may involve children, athletes, health, finance or client data, collect the minimum information needed and document the intended use clearly.

---

# Tool Adoption Criteria

Before adopting a new tool, ask:

* Does it solve a real problem?
* Does it reduce work or improve quality?
* Can the Studio maintain it?
* Will AI agents understand it?
* Does it fit the current maturity stage?
* Does it create unnecessary dependency?

If the answer is unclear, postpone adoption.

---

# Failure Recovery

Every major product should have a recovery plan.

At minimum:

* backups exist
* previous release can be restored
* known stable version is available
* changelog explains recent changes
* critical formulas are documented

---

# Related Documents

* Studio Charter
* Studio Manual
* Product Vocabulary
* AI Collaboration Guide
* Documentation Standards
* Release Standards
* Product Template

---

# Change Log

## 1.0.0 — June 2026

Initial release.

---

# Closing Statement

The Studio uses technology deliberately.

GitHub provides structure, history and engineering discipline.

Google Drive provides live collaboration and practical product delivery.

Together, they allow the Studio to build lightweight digital products with professional development standards.

The goal is not to make simple products complicated.

The goal is to make useful products reliable, maintainable and trustworthy.

