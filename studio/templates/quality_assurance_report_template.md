# Quality Assurance Report Template

---

**Document:** Quality Assurance Report Template
**File Name:** QA Report Template.md
**Location:** `studio/templates/`
**Status:** Template
**Version:** 1.0.0
**Owner:** Studio Director (Humphrey Nyanzi)
**Authority:** Studio Standard
**Last Updated:** June 2026

---

# Purpose

The Quality Assurance (QA) Report documents the testing, validation and review completed before a product release.

The objective is to provide evidence that the product has been evaluated against the Studio's quality standards.

Every public release should have a completed QA Report.

---

# Product Information

## Product Name

---

## Version

---

## QA Date

---

## Reviewer

Normally:

Studio Director

---

## Release Type

* Prototype
* Release Candidate
* Public Release
* Maintenance Release

---

# Testing Summary

Briefly summarise:

* what was tested
* overall outcome
* release recommendation

---

# Functional Testing

Verify all core workflows.

| Area          | Status        | Notes |
| ------------- | ------------- | ----- |
| Core Workflow | ☐ Pass ☐ Fail |       |
| Navigation    | ☐ Pass ☐ Fail |       |
| Data Entry    | ☐ Pass ☐ Fail |       |
| Reports       | ☐ Pass ☐ Fail |       |
| Dashboard     | ☐ Pass ☐ Fail |       |
| Exports       | ☐ Pass ☐ Fail |       |

Add additional rows where required.

---

# Formula Validation

Verify:

* calculations correct
* totals correct
* percentages correct
* lookup functions correct
* edge cases handled

Document any known limitations.

---

# Data Validation

Verify:

* required fields
* invalid input handling
* duplicate handling
* empty states
* protected cells
* dropdown lists

---

# Automation Testing

Where applicable.

Examples:

* Google Apps Script
* Python
* Email automation
* Scheduled triggers

Record:

Expected behaviour

Actual behaviour

Result

---

# Compatibility Testing

Platforms tested.

| Platform        | Tested | Notes |
| --------------- | ------ | ----- |
| Google Sheets   | ☐      |       |
| Microsoft Excel | ☐      |       |
| PDF Export      | ☐      |       |

Document any compatibility limitations.

---

# User Experience Review

Evaluate:

* clarity
* navigation
* visual consistency
* readability
* ease of use

List improvements if required.

---

# Documentation Review

Confirm:

* README complete
* User Guide complete
* Setup Guide complete
* FAQ updated
* Release Notes prepared
* Changelog updated

---

# Packaging Review

Confirm:

* product files included
* example data included
* screenshots prepared
* licence included
* release package organised

---

# Known Issues

List unresolved issues.

Include:

Description

Severity

Reason for accepting the release

No product is expected to be perfect.

Known issues should simply be documented.

---

# Risks

Identify remaining risks.

Examples:

* compatibility
* user error
* performance
* maintenance

Describe mitigation where appropriate.

---

# Release Recommendation

Choose one.

☐ Release Approved

☐ Release with Minor Limitations

☐ Release Not Recommended

Provide reasoning.

---

# Lessons Learned

Complete after testing.

Examples:

What worked well?

What should improve?

What surprised us?

How should future products benefit?

---

# Related GitHub Items

List:

* milestone
* Issues closed
* Pull Request
* Release

---

# Related Documents

* Release Standards
* Product Release Playbook
* Product Template

---

# QA Checklist

Before approving release confirm:

* Functional testing complete
* Formula validation complete
* Documentation reviewed
* Compatibility tested
* Packaging complete
* Known issues documented
* Release recommendation recorded

---

# Sign-Off

Reviewer

Signature (optional)

Date

Version

---

# Closing Statement

Quality Assurance is not intended to prove that a product is perfect.

Its purpose is to demonstrate that the product has been systematically reviewed, that known risks are understood and that the Studio can confidently stand behind the release.
