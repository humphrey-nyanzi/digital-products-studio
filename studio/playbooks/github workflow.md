# GitHub Workflow

---

**Document:** GitHub Workflow
**File Name:** GitHub Workflow.md
**Location:** `studio/playbooks/`
**Status:** Authoritative
**Version:** 1.0.0
**Owner:** Studio Director (Humphrey Nyanzi)
**Authority:** High
**Last Updated:** June 2026
**Next Review:** Quarterly

---

# Purpose

This playbook defines how the Studio uses GitHub to plan, develop, review and release work.

GitHub is the Studio's operational workspace for engineering and product development.

Every contributor should follow this workflow to ensure work remains organised, traceable and maintainable.

---

# Philosophy

GitHub is more than a code repository.

Within the Studio it serves as the central system for:

* project management
* task management
* documentation
* version control
* release management
* product history

GitHub should always reflect the current state of the Studio.

---

# Core Components

The Studio uses the following GitHub features.

| Feature       | Purpose                           |
| ------------- | --------------------------------- |
| Repository    | Store products and documentation  |
| Issues        | Track individual pieces of work   |
| Projects      | Organise Issues into workflows    |
| Labels        | Categorise and filter work        |
| Milestones    | Group work into releases          |
| Pull Requests | Review completed work             |
| Releases      | Publish official product versions |

---

# Repository Principles

Every repository represents either:

* the Studio
* a product
* a shared library

Repositories should remain focused.

Do not combine unrelated products into the same repository.

---

# Branch Strategy

The Studio follows a simple branching strategy.

## Main Branch

`main`

Represents the latest stable version.

The `main` branch should always remain usable.

---

## Feature Branches

Use feature branches for substantial work.

Examples:

```text
feature/product-001

feature/dashboard-redesign

feature/excel-support
```

Feature branches should be merged after review.

Small documentation updates may be committed directly to `main`.

---

# Issues

Every significant piece of work begins as an Issue.

An Issue represents one clearly defined objective.

Examples:

* Fix incorrect standings calculation
* Write User Guide
* Design registration workflow
* Research tournament formats

Issues should not represent multiple unrelated tasks.

---

# When To Create An Issue

Create an Issue when work:

* exceeds approximately 30 minutes
* requires planning
* affects documentation
* changes product behaviour
* introduces new functionality
* fixes defects
* requires research

Very small changes may be completed without creating an Issue.

---

# Writing Good Issues

Every Issue should answer:

What needs to be done?

Why does it matter?

What defines completion?

Acceptance criteria should be specific and measurable.

---

# Labels

Every Issue should include at least:

## Type

Examples:

* documentation
* research
* design
* development
* testing
* release
* bug
* enhancement

---

## Priority

Examples:

* priority: critical
* priority: high
* priority: medium
* priority: low

---

## Product

Examples:

* studio
* competition-manager
* running-log

Labels should make filtering easy.

---

# Projects

Projects provide a visual representation of Studio work.

Projects organise Issues.

Projects do not replace Issues.

---

# Studio Pipeline

The Studio uses the following workflow.

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

Every significant Issue should move through this pipeline.

---

# Workflow

Every major piece of work follows this sequence.

```text
Create Issue

↓

Research

↓

Plan

↓

Implement

↓

Commit

↓

Push

↓

Pull Request

↓

Review

↓

Merge

↓

Close Issue

↓

Move Project Card
```

This workflow should remain consistent across products.

---

# Commits

Commits should describe completed work.

Good examples:

```text
Add Product Vocabulary

Implement registration module

Update Release Standards
```

Avoid:

```text
update

changes

final

misc
```

Commit history should tell the story of the project.

---

# Pull Requests

Pull Requests exist to review work before merging.

Review should consider:

* correctness
* documentation
* consistency
* maintainability
* product alignment
* design quality

Substantial work should be reviewed before merging into `main`.

---

# Definition of Done

An Issue is complete only when:

* acceptance criteria satisfied
* implementation complete
* documentation updated where applicable
* testing completed where applicable
* committed
* pushed
* merged
* Issue closed
* Project updated

Closing an Issue means the work is genuinely complete.

---

# Milestones

Milestones group Issues into releases.

Examples:

Studio v1.0

Competition Manager v1.0

Running Log v2.0

Milestones represent goals rather than deadlines.

---

# Releases

Every public release should include:

* version number
* release notes
* packaged assets
* documentation
* changelog

Releases should correspond to the Release Standards.

---

# Repository Maintenance

Repositories should remain organised.

Regularly:

* close completed Issues
* archive obsolete branches
* update documentation
* review labels
* maintain release history

GitHub should accurately reflect reality.

---

# AI Collaboration

AI contributors should work from Issues whenever possible.

Rather than requesting broad work, reference specific Issues.

Example:

> Complete Issue #17 according to the acceptance criteria.

Focused Issues improve AI performance and reduce context drift.

---

# Studio Discipline

The Studio follows these principles.

Work is tracked.

Work is documented.

Work is reviewed.

Work is versioned.

Work is released.

If work cannot be traced, it effectively does not exist.

---

# Related Documents

* Studio Manual
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

The Studio uses GitHub to create clarity rather than complexity.

By tracking work consistently through Issues, Projects, reviews and releases, every contributor can understand what has been done, what remains to be done and why each decision was made.

The workflow exists to make excellent engineering repeatable.
