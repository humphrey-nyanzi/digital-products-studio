# Architecture Decision Record (ADR) Template

---

**Document:** Architecture Decision Record Template
**File Name:** ADR Template.md
**Location:** `studio/templates/`
**Status:** Template
**Version:** 1.0.0
**Owner:** Studio Director (Humphrey Nyanzi)
**Authority:** Studio Standard
**Last Updated:** June 2026

---

# Purpose

Architecture Decision Records (ADRs) document significant technical, product and operational decisions made within the Studio.

The objective is to preserve reasoning rather than relying on memory.

Every ADR should explain:

* the problem
* the decision
* the reasoning
* the consequences

Future contributors should understand *why* a decision was made without needing to revisit previous discussions.

---

# When To Create An ADR

Create an ADR when a decision:

* significantly affects product architecture
* changes Studio workflow
* introduces a new technology
* establishes a long-term standard
* replaces an existing approach
* has multiple reasonable alternatives
* is likely to be questioned in the future

Do **not** create ADRs for routine implementation decisions.

---

# Naming Convention

Recommended format:

```text
ADR-001 Choose Google Sheets as the Primary Platform

ADR-002 Adopt Modular Product Architecture

ADR-003 Support Microsoft Excel Compatibility
```

Use sequential numbering.

Titles should clearly describe the decision.

---

# Template

---

## ADR Number

Example:

ADR-001

---

## Title

A concise description of the decision.

---

## Status

Examples:

* Proposed
* Accepted
* Superseded
* Deprecated

---

## Date

Decision date.

---

## Decision Owner

Normally:

Studio Director

---

## Related Products

List affected products.

If Studio-wide, state:

Studio-wide

---

# Context

Describe the problem or decision that prompted this ADR.

Explain:

* current situation
* constraints
* objectives
* background

Readers should understand why the decision was necessary.

---

# Decision

Clearly state the chosen approach.

Avoid ambiguity.

This section should be understandable without reading the rest of the ADR.

---

# Alternatives Considered

List reasonable alternatives.

For each alternative include:

* summary
* advantages
* disadvantages

Explain why it was not selected.

---

# Rationale

Explain why the chosen option is preferred.

Reference:

* Studio principles
* operational constraints
* technical considerations
* user experience
* maintenance
* long-term sustainability

---

# Consequences

Describe expected outcomes.

Include:

Positive consequences

Potential drawbacks

Trade-offs

Implementation considerations

No decision is without compromise.

---

# Follow-Up Actions

List any required work resulting from the decision.

Examples:

* update documentation
* create Issues
* refactor products
* modify templates

---

# Related Documents

Reference relevant Studio documents.

Examples:

* Studio Charter
* Technology & Infrastructure
* Product Template

---

# Review

Should this decision be reviewed?

Examples:

* Never
* After Version 2
* Annual Review

---

# Notes

Additional observations.

Optional.

---

# Example

## ADR-001

### Title

Choose Google Sheets as the Primary Product Platform

Context

Most target users already use spreadsheets.

Decision

Build products primarily for Google Sheets while supporting Microsoft Excel where practical.

Reasoning

Google Sheets offers accessibility, sharing and automation through Apps Script while remaining familiar to target users.

Trade-Off

Some advanced Excel features may not be available.

Outcome

Products remain simple, accessible and easy to distribute.

---

# Best Practices

A good ADR should:

* explain reasoning
* remain concise
* avoid implementation details
* reference related work
* remain valid over time

---

# Common Mistakes

Avoid:

Recording obvious decisions.

Writing implementation guides.

Including unnecessary technical detail.

Leaving decisions undocumented until months later.

---

# Closing Statement

Good decisions become valuable organisational knowledge only when they are documented.

Architecture Decision Records preserve that knowledge so future contributors understand not only *what* the Studio does, but *why* it does it.
