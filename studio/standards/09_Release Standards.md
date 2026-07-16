# Release Standards

---

**Document:** Release Standards
**File Name:** 09_Release Standards.md
**Status:** Authoritative
**Version:** 1.0.0
**Owner:** Studio Director (Humphrey Nyanzi)
**Authority:** High
**Last Updated:** June 2026
**Next Review:** Quarterly

---

# Purpose

This document defines the minimum quality required before any Studio product is released.

A product is considered complete only when it satisfies these standards.

Release standards protect the Studio's reputation and ensure every public product reflects the principles defined in the Studio Charter.

---

# Release Philosophy

Products are released when they are trusted, not when they are merely finished.

A smaller, reliable product is preferable to a larger product with uncertain quality.

Every release represents a promise to users.

---

# Release Authority

Only the Studio Director may approve a public release.

AI systems may recommend release.

They may not authorise release.

---

# Release Types

## Prototype

Internal only.

Purpose:

Validate ideas.

Not intended for public use.

---

## Release Candidate

Feature complete.

Awaiting final review.

Suitable for testing.

Not publicly distributed.

---

## Public Release

Approved by the Studio Director.

Available to users.

Supported according to the Studio lifecycle.

---

# Minimum Release Requirements

Every public release must satisfy all applicable requirements.

## 1. Product Purpose

The product clearly solves one primary problem.

Scope remains focused.

No unnecessary functionality exists.

---

## 2. Functional Accuracy

All workflows operate correctly.

No known critical defects remain.

Calculations produce accurate results.

---

## 3. Formula Validation

Every formula has been checked.

Edge cases have been considered.

Expected outputs have been verified.

No hidden calculation errors remain.

---

## 4. Data Integrity

Input validation functions correctly.

Data corruption risks are minimised.

Duplicate handling behaves correctly.

Outputs remain consistent.

---

## 5. Spreadsheet Quality

Where applicable:

* input areas are obvious
* formula cells are protected where appropriate
* documentation sheets exist
* navigation is clear
* hidden logic remains organised
* unnecessary worksheets are removed

---

## 6. Cross-Platform Compatibility

Products should function correctly in:

* Google Sheets
* Microsoft Excel

Where differences exist, they must be documented.

---

## 7. User Experience

The product is:

* easy to understand
* easy to navigate
* consistent
* calm
* professional

A first-time user should not require unnecessary assistance.

---

## 8. Documentation

Required documentation includes:

* README
* User Guide
* Setup Instructions
* Release Notes
* Change Log
* Known Limitations

Additional documentation may be included when appropriate.

---

## 9. Example Data

Products should include realistic demonstration data.

Users should understand how the system works immediately after opening it.

---

## 10. Visual Review

Confirm:

* spacing
* alignment
* colour consistency
* table formatting
* chart quality
* professional presentation

Visual polish contributes directly to trust.

---

## 11. Performance

Products should remain responsive.

Avoid unnecessary calculations.

Avoid excessive automation.

Large datasets should remain practical.

---

## 12. Error Handling

Products should gracefully handle common user mistakes.

Where possible:

* prevent errors
* detect errors
* explain errors
* guide recovery

---

## 13. Installation Test

A clean installation should be performed.

Assume no prior Studio knowledge.

Verify:

* setup
* configuration
* documentation
* permissions
* expected behaviour

For Google automation products, also verify:

* the customer copy owns its workbook, Form and response destination
* the copied script uses the intended Cloud project and application identity
* the OAuth consent flow is acceptable for the intended audience
* every requested scope is necessary and documented
* internal navigation and Form links resolve inside the customer copy
* submissions and automation affect only the customer copy
* no master URLs, data or private files are exposed

An unverified-app warning, a cross-copy link or an unclear permission request is a release blocker unless the Studio Director explicitly limits the release to a controlled test and documents the risk.

---

## 14. Packaging

Release package should include all required assets.

Examples:

* spreadsheet
* documentation
* example data
* screenshots
* licence
* tutorial video, where applicable

Templates should feel complete.

---

## 15. Licensing

Every release should clearly specify:

* licence
* usage rights
* redistribution policy
* commercial usage
* customisation policy

---

## 16. Versioning

Every release receives a version number.

The version should appear consistently across:

* product
* documentation
* release notes
* GitHub
* packaging

---

## 17. Changelog

Every release includes a changelog describing:

* new features
* improvements
* bug fixes
* known issues
* breaking changes

---

## 18. Product Page

Public products should include:

* description
* problem solved
* features
* screenshots
* requirements
* installation
* support information
* pricing, where applicable

---

## 19. Internal Review

Before release, confirm:

* the product reflects the Studio Charter
* documentation is complete
* quality standards have been met
* unnecessary functionality has been removed
* known limitations are documented

---

## 20. Director Approval

Final review should ask:

* Would I confidently recommend this product to someone I respect?
* Would I proudly include it in my portfolio?
* Would I trust an organisation to depend on it?

If the answer to any question is no, do not release.

---

# Release Checklist

Every release should satisfy:

* Purpose confirmed
* Scope reviewed
* Customer-copy isolation verified, where applicable
* OAuth identity, scopes and verification accepted, where applicable
* Public privacy policy and support contact published, where applicable
* Functionality verified
* Formula validation complete
* Documentation complete
* Visual review complete
* Compatibility reviewed
* Example data included
* Packaging complete
* Version assigned
* Changelog updated
* Licence included
* Installation tested
* Director approval granted

---

# Post-Release Responsibilities

Release is the beginning of maintenance.

Monitor:

* user feedback
* bug reports
* feature requests
* compatibility
* documentation
* performance
* customisation requests

Continuous improvement is expected.

---

# When Not To Release

Do not release because:

* a deadline exists
* the product is mostly finished
* marketing requires it
* someone requested it quickly
* the product feels close enough

Release only when the Studio can confidently stand behind the product.

---

# The Reputation Principle

Every release contributes to the Studio's reputation.

One poor product can damage trust built by many excellent ones.

Protecting long-term trust is more important than increasing release frequency.

---

# Related Documents

* Studio Charter
* Studio Manual
* Product Vocabulary
* Documentation Standards
* Design System
* Product Template
* Technology & Infrastructure

---

# Change Log

## 1.0.0 — June 2026

Initial release.

---

# Closing Statement

A release represents a promise.

It tells users that the Studio believes this product is reliable, professionally built and worthy of everyday use.

Every release should strengthen that promise.
