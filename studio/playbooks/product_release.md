# Product Release Playbook

---

**Document:** Product Release Playbook
**File Name:** Product Release Playbook.md
**Location:** `studio/playbooks/`
**Status:** Authoritative
**Version:** 1.0.0
**Owner:** Studio Director (Humphrey Nyanzi)
**Authority:** High
**Last Updated:** June 2026
**Next Review:** Quarterly

---

# Purpose

This playbook defines the Studio's standard process for preparing, reviewing and publishing products.

The objective is to ensure every public release is complete, trustworthy and professionally presented.

Releasing a product is a deliberate process rather than a single action.

---

# Release Philosophy

A release is a promise.

It communicates that the Studio believes the product is reliable enough for real users.

Products should be released with confidence rather than urgency.

Shipping quickly should never compromise trust.

---

# Release Workflow

Every release follows the same sequence.

```text
Feature Complete

↓

Internal QA

↓

Release Candidate

↓

Documentation Review

↓

Packaging

↓

Final Review

↓

GitHub Release

↓

Distribution

↓

Post-Release Review
```

Each stage should be completed before moving to the next.

---

# Stage 1 — Feature Complete

The product has reached its planned Version 1 scope.

Before proceeding:

* all planned features implemented
* scope unchanged
* no critical functionality missing

Version 1 should not continue expanding.

---

# Stage 2 — Internal QA

Perform structured testing.

Verify:

* calculations
* formulas
* workflows
* navigation
* reports
* dashboards
* automations
* compatibility

Critical issues must be resolved before continuing.

---

# Stage 3 — Release Candidate

Assign a release candidate version.

Example:

```text
v1.0.0-rc1
```

Conduct a complete product walkthrough.

Review the product as though you were a first-time customer.

## Google Automation Release Gate

Complete this gate before a Google Workspace product becomes a public release candidate.

### Studio identity and policy

Confirm:

* the distribution account and sender name are appropriate for customers;
* the Studio controls the domain used for public application information;
* the public privacy policy and support contact are live;
* the production Google Cloud project has a clear customer-facing name.

### Product permission review

Record:

* every Google service and OAuth scope used;
* why each scope is necessary;
* whether any scope is sensitive or restricted;
* the verification status and any remaining warning or user cap.

### Customer-copy test

Using an account that did not build the master:

1. create the delivery copy;
2. confirm the customer account owns the copy;
3. authorise the bound script and record the consent experience;
4. create the product's Form or other connected assets;
5. confirm all connected assets belong to the customer account;
6. submit a test record and confirm only the customer copy changes;
7. inspect every workbook and Form link for master references;
8. compare the master and copy Cloud project identities;
9. complete the ordinary-user protection and recovery tests.

Do not distribute a customer copy that links back to the Studio master or an obsolete Form. Do not assume that copying a bound script preserves the intended verified application identity.

### Evidence and decision

Retain:

* consent-screen screenshots;
* Cloud project numbers for the tested master and copy;
* the final scope inventory and justifications;
* privacy policy and support URLs;
* customer-copy ownership and isolation results;
* the Director's release or controlled-pilot decision.

---

# Stage 4 — Documentation Review

Confirm all documentation is complete.

Examples:

* README
* User Guide
* Setup Guide
* FAQ
* Known Limitations
* Release Notes
* Changelog

Documentation should match the product exactly.

---

# Stage 5 — Packaging

Prepare the final package.

Typical contents include:

* product files
* documentation
* example dataset
* screenshots
* licence
* release notes
* branding assets
* tutorial video (where applicable)

Package contents should be clearly organised.

---

# Stage 6 — Final Review

The Studio Director performs a final review.

Questions include:

* Does the product solve the intended problem?
* Is the experience professional?
* Are the calculations trustworthy?
* Would I confidently recommend this product?
* Does it reflect the Studio's standards?

Only approved products proceed to release.

---

# Stage 7 — GitHub Release

Create a GitHub Release.

Include:

* version number
* release title
* release notes
* packaged assets

The GitHub Release becomes the official historical record.

---

# Stage 8 — Distribution

Publish the product through the appropriate channels.

Examples:

* Gumroad
* GitHub Releases
* Studio website
* Direct client delivery

Ensure the published files match the GitHub Release.

---

# Stage 9 — Post-Release Review

Within a reasonable period after release:

Review:

* user feedback
* downloads
* bug reports
* support requests
* customisation enquiries

Capture lessons for future releases.

---

# Version Numbering

The Studio follows semantic versioning where practical.

Examples:

```text
v1.0.0
```

First public release.

```text
v1.1.0
```

New features.

```text
v1.1.1
```

Bug fixes.

```text
v2.0.0
```

Major redesign.

Version numbers should remain consistent across all documentation.

---

# Release Assets

Every public release should include:

* product
* documentation
* licence
* release notes
* changelog
* example data (where applicable)

Optional:

* tutorial video
* screenshots
* promotional images

---

# Gumroad Checklist

Before publishing:

* title reviewed
* description completed
* screenshots updated
* pricing confirmed
* download package verified
* licence attached
* product thumbnail prepared

The Gumroad page should communicate quality before download.

---

# GitHub Checklist

Before publishing:

* latest commit pushed
* release created
* version tag assigned
* changelog updated
* documentation committed
* assets attached

GitHub should accurately represent the released version.

---

# Customer Experience

Assume every user is opening the product for the first time.

Ask:

* Is installation obvious?
* Is navigation intuitive?
* Are examples helpful?
* Can users succeed without contacting support?

The first experience strongly influences trust.

---

# Handling Issues After Release

If a critical issue is discovered:

* create a GitHub Issue
* investigate
* prioritise appropriately
* document the fix
* publish an updated release if necessary

Do not silently replace released files.

Every public change should be traceable.

---

# Release Metrics

Track where possible:

* downloads
* purchases
* refunds
* bug reports
* feature requests
* customisation enquiries
* customer satisfaction

These metrics guide future improvements.

---

# Related Documents

* Release Standards
* GitHub Workflow
* Product Development Playbook
* Product Template

---

# Change Log

## 1.0.0 — June 2026

Initial release.

---

# Closing Statement

A successful release is not simply a completed product.

It is a product that has been carefully reviewed, professionally packaged and confidently presented to users.

Every release should strengthen the Studio's reputation and increase the trust users place in future products.
