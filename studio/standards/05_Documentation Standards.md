# Documentation Standards

---

**Document:** Documentation Standards
**Status:** Authoritative
**Version:** 1.0.0
**Owner:** Studio Director (Humphrey Nyanzi)
**Authority:** High
**Last Updated:** June 2026
**Next Review:** Quarterly

---

# Purpose

This document defines how documentation is created, maintained and versioned throughout the Studio.

Documentation is treated as a first-class engineering artifact.

Every document should improve understanding, reduce ambiguity and support long-term maintainability.

---

# Documentation Philosophy

Documentation exists to make excellent work repeatable.

Good documentation should allow another contributor—human or AI—to understand a project without relying on previous conversations.

If important knowledge exists only in memory, the documentation is incomplete.

---

# Documentation Principles

Documentation should always be:

* Accurate
* Concise
* Practical
* Searchable
* Modular
* Versioned
* Maintainable
* Easy to navigate

---

# Documentation Hierarchy

Studio documentation is organised into three levels.

## Level 1 — Authoritative Documents

These define the Studio.

Examples:

* Studio Charter
* Studio Manual
* Product Vocabulary
* AI Collaboration Guide
* Documentation Standards
* Design System
* Brand System

These documents require Studio Director approval before modification.

---

## Level 2 — Product Documents

These define individual products.

Examples:

* Product Requirements
* Architecture
* User Guide
* Technical Guide
* Roadmap
* Release Notes

These inherit standards from the authoritative documents.

---

## Level 3 — Working Documents

Temporary or evolving documents.

Examples:

* Research Notes
* Meeting Notes
* QA Logs
* Testing Results
* Customer Feedback
* Product Ideas

Working documents inform decisions but are not considered authoritative.

---

# File Format

Studio documentation should use Markdown whenever practical.

Reasons:

* Plain text
* Version control friendly
* AI friendly
* Platform independent
* Easy to review

Exceptions may include:

* PDFs
* DOCX
* Presentations

These should normally be generated from Markdown rather than replacing it.

---

# Standard Document Structure

Every Studio document should begin with metadata.

Example:

```yaml
Document:
Status:
Version:
Owner:
Authority:
Last Updated:
Next Review:
```

Metadata allows contributors to quickly determine:

* purpose
* ownership
* authority
* currency

---

# Required Sections

Most Studio documents should include:

Purpose

Scope

Main Content

Related Documents

Change Log

Not every document requires every section, but consistency is preferred.

---

# Naming Convention

Document names should be:

* descriptive
* concise
* stable

Avoid abbreviations unless universally understood.

Examples:

Studio Manual

Product Vocabulary

Release Standards

Avoid:

Guide2

Notes Final

Draft Latest

---

# Writing Style

Documentation should be:

direct

professional

neutral

clear

Avoid:

marketing language

motivational language

unnecessary repetition

long introductions

Document what is necessary.

Nothing more.

---

# Headings

Use consistent heading hierarchy.

Example:

```text
#

##

###

####
```

Avoid skipping heading levels.

---

# Lists

Use lists when they improve readability.

Use paragraphs when explaining reasoning.

Avoid excessive nesting.

---

# Tables

Use tables for:

comparisons

definitions

decision matrices

metadata

Avoid tables for long prose.

---

# Code Blocks

Use fenced code blocks for:

folder structures

commands

configuration

examples

Specify language whenever appropriate.

---

# Diagrams

Simple text diagrams are preferred during planning.

Complex diagrams should only be introduced when they improve understanding.

---

# Cross References

Documents should reference related documents where appropriate.

Avoid duplicating information.

Instead:

link

reference

summarise

The Studio should maintain a single source of truth.

---

# Versioning

Documentation follows semantic versioning where practical.

Examples:

1.0.0

1.1.0

2.0.0

Minor editorial corrections do not necessarily require a major version increment.

---

# Change Logs

Important changes should be recorded.

Include:

date

summary

version

Change logs improve traceability.

---

# Ownership

Every document has one owner.

Ownership includes responsibility for:

accuracy

maintenance

review

approval

Ownership may be delegated but remains clearly defined.

---

# Review Cycle

Documents should define a review schedule.

Typical reviews:

Quarterly

Biannual

Annual

Review does not imply modification.

---

# AI Readability

Documentation should be written for both humans and AI.

Prefer:

explicit language

consistent terminology

clear structure

predictable formatting

Avoid unnecessary ambiguity.

---

# Examples

Examples should illustrate principles rather than replace explanation.

Examples should remain realistic and professionally presented.

---

# Images

Images should support understanding.

Avoid decorative graphics.

Screenshots should:

be clear

be current

be labelled

---

# File Organisation

Documentation should remain modular.

Prefer:

Many focused documents

instead of

One extremely large document.

---

# Decision Records

Significant architectural or strategic decisions should be documented.

Decision records should include:

Problem

Decision

Reasoning

Consequences

Date

This prevents future contributors from repeating previous discussions.

---

# Deprecation

Deprecated documentation should remain accessible.

Mark clearly as:

Deprecated

Archived

Superseded

Do not silently delete historical decisions.

---

# Documentation Quality Checklist

Before publishing documentation, verify:

Purpose is clear.

Terminology follows Product Vocabulary.

Structure follows Studio Standards.

Grammar is correct.

Links are valid.

Examples are accurate.

Metadata is complete.

Related documents are referenced.

Version updated where necessary.

---

# Success

Successful documentation should allow a new contributor to:

understand the project

understand the reasoning

find relevant information quickly

contribute confidently

without requiring additional explanation.

---

# Closing Statement

Documentation is part of the product.

Well-written documentation reduces future effort, improves collaboration and preserves institutional knowledge.

Every document should make the Studio easier to understand, easier to maintain and easier to improve.
