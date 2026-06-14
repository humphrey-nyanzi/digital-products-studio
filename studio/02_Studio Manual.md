# Studio Manual

---

**Document:** Studio Manual
**Status:** Authoritative
**Version:** 1.0.0
**Owner:** Studio Director (Humphrey Nyanzi)
**Authority:** High (Subordinate only to the Studio Charter)
**Last Updated:** June 2026
**Next Review:** Quarterly

---

# Purpose

The Studio Manual defines how the Studio operates.

Where the Studio Charter explains **why** the Studio exists, the Studio Manual explains **how** work is planned, executed, reviewed, released and maintained.

Every contributor, whether human or AI, should understand this document before contributing to the Studio.

---

# Relationship to the Charter

The Studio Charter is the highest authority.

The Studio Manual must always remain consistent with the Charter.

If a conflict exists:

**The Charter always takes precedence.**

---

# Studio Structure

The Studio is organised into four product categories.

## 1. Sports Competitions

Systems supporting tournaments, leagues and competitions.

Examples:

* Competition Management
* Registration
* Results Collection
* Standings
* Officials
* Scheduling

---

## 2. Sports Businesses

Systems supporting commercial sports organisations.

Examples:

* Membership Management
* Attendance Tracking
* Revenue Reporting
* Customer Analytics
* Operations Dashboards

---

## 3. Sports Performance & Sports Science

Systems supporting coaches, analysts and practitioners.

Examples:

* Athlete Monitoring
* Wellness Tracking
* GPS Analysis
* Training Load
* Performance Dashboards

---

## 4. Personal Systems

Systems for individuals.

Examples:

* Running Logs
* Gym Trackers
* Personal Analytics
* Finance
* Habits
* Health

---

# Studio Hierarchy

```
Studio

↓

Category

↓

Product

↓

Module

↓

Feature

↓

Release
```

Every level exists for a specific purpose.

Products should remain modular.

Modules should remain reusable.

---

# Product Philosophy

Every product must:

* solve one primary problem
* target one primary user
* deliver one primary outcome

Additional functionality should only strengthen that objective.

---

# Product Lifecycle

Every product follows the same lifecycle.

```
Idea

↓

Research

↓

Requirements

↓

Planning

↓

Design

↓

Prototype

↓

Development

↓

Internal QA

↓

Packaging

↓

Release Candidate

↓

Public Release

↓

Maintenance

↓

Iteration

↓

Retirement (if necessary)
```

No stages should be skipped intentionally.

If a stage does not apply, it should be documented as such.

---

# Quality Gates

Every product passes three quality gates.

## Gate 1 — Prototype

Purpose:

Validate the concept.

Requirements:

* Core workflow works.
* Primary problem solved.
* Internal use possible.

Visual polish is not required.

---

## Gate 2 — Release Candidate

Purpose:

Internal approval.

Requirements:

* Features complete.
* Documentation drafted.
* Branding applied.
* Formula validation completed.
* Cross-platform testing performed where applicable.

---

## Gate 3 — Public Release

Purpose:

Customer-ready product.

Requirements:

* Documentation complete.
* Packaging complete.
* Version assigned.
* Changelog updated.
* Example data included.
* FAQ completed.
* Installation tested.
* Final approval by Studio Director.

---

# Decision Authority

The Studio operates using clear decision ownership.

## Studio Director

Responsibilities:

* Product vision
* Final approval
* Quality review
* Product acceptance
* Strategic direction

Only the Studio Director can approve a public release.

---

## AI Contributors

AI systems may assist with:

* research
* planning
* documentation
* coding
* scripting
* design
* testing support
* writing

AI never has release authority.

---

# Development Workflow

Every task should follow this workflow.

```
Understand

↓

Research

↓

Plan

↓

Build

↓

Review

↓

Test

↓

Improve

↓

Approve

↓

Release
```

Skipping planning to begin implementation is discouraged.

---

# Product Modularity

Products should be composed of reusable modules.

Example:

Competition Manager

↓

Registration Module

Fixtures Module

Results Module

Standings Module

Reports Module

Discipline Module

Each module should function independently whenever practical.

---

# Technology Philosophy

Technology should support the product rather than define it.

Preferred technologies include:

* Google Sheets
* Microsoft Excel
* Google Forms
* Google Apps Script
* Python
* PostgreSQL
* Markdown
* Git
* GitHub

Additional technologies may be introduced when they improve the product.

---

# Technology Infrastructure

The Studio uses a hybrid infrastructure.

## GitHub

Primary engineering repository.

Stores:

* documentation
* prompts
* scripts
* source code
* release history
* changelogs
* issues
* templates
* exported assets

GitHub is the authoritative source for project history.

---

## Google Drive

Operational workspace.

Stores:

* live Google Sheets
* live Google Forms
* Apps Script projects
* exported PDFs
* working assets
* client files

Google Drive is optimised for editing and collaboration.

---

## Infrastructure Maturity

The Studio adopts technology progressively.

Stage 1

* GitHub
* Google Drive

Stage 2

* Apps Script version control
* automation improvements

Stage 3

* automated testing
* build pipelines
* release automation

Complexity should only be introduced when justified.

---

# Documentation Rules

Every significant decision must be documented.

Documentation should always be:

* Markdown
* modular
* searchable
* concise
* versioned

Documentation is treated as a product asset.

---

# Product Repository Structure

Every product should follow a consistent structure.

```
Product

README

docs/

assets/

scripts/

exports/

templates/

links.md
```

Products should remain organised and predictable.

---

# Release Philosophy

Products are released when they are trusted, not merely completed.

A smaller reliable product is preferable to a larger unfinished one.

Version numbers should follow semantic versioning where practical.

---

# Product Support

Every released product enters maintenance.

Maintenance includes:

* bug fixes
* documentation updates
* compatibility improvements
* customer feedback
* feature evaluation

Products are expected to evolve.

---

# Product Retirement

Products may eventually become:

Supported

↓

Maintenance Mode

↓

Deprecated

↓

Archived

Retirement decisions should be documented.

---

# Continuous Improvement

The Studio itself is continuously improved.

Processes may evolve.

Standards may improve.

Documentation may expand.

However, improvements should always reduce friction rather than increase bureaucracy.

---

# Operating Principle

Whenever uncertainty exists, ask:

* Does this solve a real problem?
* Is it simpler?
* Is it more reliable?
* Is it modular?
* Would a new contributor understand this?
* Does it align with the Studio Charter?

If the answer is no, reconsider the decision.

---

# Closing Statement

The Studio Manual exists to make excellent work repeatable.

Good products should not depend on memory, luck or individual effort alone.

By following shared standards, clear workflows and disciplined engineering practices, the Studio creates systems that remain trustworthy, maintainable and continuously valuable.
