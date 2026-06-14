# Technology \& Infrastructure

\---

**Document:** Technology \& Infrastructure
**File Name:** 10\_Technology \& Infrastructure.md
**Status:** Authoritative
**Version:** 1.0.0
**Owner:** Studio Director (Humphrey Nyanzi)
**Authority:** High
**Last Updated:** June 2026
**Next Review:** Quarterly

\---

# Purpose

This document defines the Studio's technology and infrastructure strategy.

It explains where products are built, where documentation lives, how version control works, and how Google Drive, GitHub and other tools should be used together.

The objective is to keep the Studio practical, organised and scalable without introducing unnecessary complexity.

\---

# Technology Philosophy

Technology should support the product, not define it.

The Studio chooses tools because they help solve real problems.

Simple, reliable and accessible tools are preferred over complex tools that add unnecessary friction.

The Studio should adopt the simplest workflow that satisfies current needs while leaving a clear path to future capabilities.

\---

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

\---

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

\---

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

\---

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

\---

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

\---

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

\---

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
* Technology \& Infrastructure
* Product Templates
* Shared prompts
* Shared assets
* Studio-level planning

\---

## Product Repositories

Example:

```text
competition-manager/
gym-reporting-system/
running-log/
```

Each product repository contains the documentation, assets, releases and scripts for that product.

Product repositories should reference the Studio repository standards.

\---

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
│   ├── product-name\_v1.0.0.xlsx
│   └── product-name\_v1.0.0.pdf
│
├── templates/
│   └── reusable templates
│
└── links.md
```

\---

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

\---

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

\---

# Apps Script

For Version 1 products, Apps Script may remain inside Google Drive.

When the Studio matures, Apps Script source files should be copied or exported into GitHub.

Future maturity may include tools such as `clasp` for proper Apps Script version control.

Do not introduce advanced tooling before it provides clear value.

\---

# Excel Support

Where practical, products should support Microsoft Excel.

Excel support should be tested separately from Google Sheets.

If a product behaves differently in Excel, document the limitation clearly.

A Google Sheets product may still be released without full Excel parity if:

* the limitation is documented
* the product remains useful
* the release notes explain compatibility clearly

\---

# File Naming

Release files should use consistent names.

Recommended format:

```text
product-name\_v1.0.0.xlsx
product-name\_user-guide\_v1.0.0.pdf
product-name\_release-notes\_v1.0.0.md
```

Avoid:

```text
final.xlsx
latest.xlsx
new version.xlsx
copy of template.xlsx
```

\---

# Backups

Important live files should be backed up before major changes.

Recommended backup moments:

* before release
* before major formula changes
* before Apps Script changes
* before restructuring sheets
* before client delivery

Backups should be labelled with dates and versions.

\---

# Permissions

Live Google files should use careful permission settings.

Avoid unrestricted editing access unless necessary.

Recommended access levels:

* Owner: Studio Director
* Editor: trusted collaborators only
* Viewer: demo users or reviewers
* Make a copy: public template distribution

For public templates, users should receive copy access rather than edit access to the master file.

\---

# Distribution

Products may be distributed through:

* Gumroad
* GitHub Releases
* Google Drive copy links
* personal website
* newsletter
* direct client delivery

The distribution method should match the product type and audience.

\---

# GitHub Issues

GitHub Issues should be used for:

* bugs
* feature requests
* documentation improvements
* release tasks
* product ideas
* technical debt

Issues should be specific and actionable.

\---

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

\---

# Infrastructure Maturity Model

The Studio should grow in stages.

## Stage 1 — Simple Hybrid Workflow

Current default.

* GitHub for documentation and releases
* Google Drive for live Google products
* manual exports
* manual testing
* manual release review

This is sufficient for early products.

\---

## Stage 2 — Structured Engineering Workflow

Introduce when products become more complex.

* Apps Script copied into GitHub
* clearer release branches
* issue-based development
* standard QA logs
* reusable scripts
* improved backup procedures

\---

## Stage 3 — Automated Workflow

Introduce only when justified.

* Apps Script managed with `clasp`
* automated tests
* packaging scripts
* release automation
* CI/CD workflows
* automated documentation generation

The Studio should not skip stages unnecessarily.

\---

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

\---

# Data Privacy

Products should avoid including real personal data unless required and authorised.

Demo datasets should use fictional or anonymised data.

Client-specific files should remain private.

Public products should not expose operationally sensitive information.

\---

# Tool Adoption Criteria

Before adopting a new tool, ask:

* Does it solve a real problem?
* Does it reduce work or improve quality?
* Can the Studio maintain it?
* Will AI agents understand it?
* Does it fit the current maturity stage?
* Does it create unnecessary dependency?

If the answer is unclear, postpone adoption.

\---

# Failure Recovery

Every major product should have a recovery plan.

At minimum:

* backups exist
* previous release can be restored
* known stable version is available
* changelog explains recent changes
* critical formulas are documented

\---

# Related Documents

* Studio Charter
* Studio Manual
* Product Vocabulary
* AI Collaboration Guide
* Documentation Standards
* Release Standards
* Product Template

\---

# Change Log

## 1.0.0 — June 2026

Initial release.

\---

# Closing Statement

The Studio uses technology deliberately.

GitHub provides structure, history and engineering discipline.

Google Drive provides live collaboration and practical product delivery.

Together, they allow the Studio to build lightweight digital products with professional development standards.

The goal is not to make simple products complicated.

The goal is to make useful products reliable, maintainable and trustworthy.

