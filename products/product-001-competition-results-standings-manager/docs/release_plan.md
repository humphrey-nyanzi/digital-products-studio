# Release Plan

Product: Football Competition Results & Standings Manager  
Status: Prototype v0.1.0, release architecture and clean-copy isolation fixes required
Last verified: 16 July 2026

## Product State

The working lifecycle, buyer-facing workbook redesign, simplified Form workflow, reset path, populated post-reset regression, multi-group generation and bounded practical scheduling are substantially complete. A clean customer-account test proved that the copied script, customer-owned Form and isolated response flow work. Copy-local navigation is implemented in the master and v0.1.5.3, but public packaging remains blocked until a fresh copy passes and the OAuth consent experience is resolved.

## Required Before Packaging

1. Install v0.1.5.3 and verify the implemented copy-local workbook and configuration-driven Form links in a fresh customer copy.
2. Confirm the exact manifest scopes and decide whether automatic reset backups justify full Google Drive access.
3. Choose the Studio distribution identity and low-cost domain route.
4. Publish the Studio application homepage, privacy policy and support contact.
5. Configure the production standard Google Cloud project and OAuth consent screen.
6. Compare the master and customer-copy Cloud project identities and decide the verified distribution architecture.
7. Complete the applicable Google verification process.
8. Repeat the clean customer-copy, consent, permissions, navigation and ordinary-user regression.
9. Decide the support boundary, price, listing channel and first buyer test.

## Release Timeline

| Date | Gate | Required outcome |
|---|---|---|
| 16 July 2026 | First customer-copy QA | Ownership, copied script, customer Form and isolated response flow passed. Unverified OAuth and master-linked navigation were recorded as blockers. |
| 17 July 2026 | Copy-link repair and OAuth architecture check | Install v0.1.5.3, run fresh-copy link regression, inventory scopes and compare master versus copy Cloud project identity. |
| 24 July 2026 | Studio Google identity, domain and privacy foundation | Distribution identity, domain route, public policy content and support contact are decided. |
| 28 July 2026 | OAuth and clean-copy release gate | Consent configuration, verification route and a fresh copy regression determine pilot or hold status. |
| 31 July 2026 | Pricing and buyer comparison | Evidence-backed price range and buyer comparison completed only after the delivery architecture is credible. |
| 7 August 2026 | Packaging and demo release QA | Delivery package, manual export, screenshots and demo assets pass final QA. |
| 21 August 2026 | Earliest public offer gate | Publish only if verification and clean-copy isolation have passed. Otherwise reschedule without forcing release. |
| 24 to 31 August 2026 | Launch and first market signals | Prepare, distribute and review launch content after the public offer gate passes. |

Every scheduled Product 001 work block is at least 90 minutes. Calendar event descriptions contain the relevant runbook and canonical Product 001 folder link.

## Packaging Boundary

The v1.0 deliverable is a reusable workbook, linked Form, Apps Script automation and buyer guide. It does not include ongoing competition administration, custom formula rebuilding, player registration, scorer tracking, disciplinary administration or unlimited support.

## Current Blocker

Core product functionality and football logic are substantially verified. The first clean-copy test passed workbook ownership, copied-script availability, customer-owned Form creation, hidden response-tab behaviour and isolated result processing. The master-link defect is repaired in the canonical workbook and v0.1.5.3, but the public trust gate and fresh-copy verification remain open.

## Next Release Decision

Do not blank or distribute the working master yet. Preserve it as current implementation evidence. Repair links and settle the OAuth architecture in the master, then create a fresh disposable customer copy for the release gate. The existing QA copy may be retained temporarily as defect evidence but must not become the delivery file.

