# QA Plan

Product: Football Competition Results & Standings Manager  
Status: Technical, ownership, privacy, OAuth, Selar checkout, managed fulfilment and outbound support gates passed; local landing-page release review in progress
Last verified: 31 August 2026

## Purpose

Verify that a normal organiser can run a competition without damaging the workbook, losing audit data or publishing incorrect standings.

## Current Gate

The populated end-to-end lifecycle, per-copy Form setup, reset, response-tab privacy, manager outcome workflow, multi-group generation and bounded practical scheduling have passed their defined QA.

The 16 and 17 July copy-isolation regressions passed. The v0.1.5.9 copied-workbook regression passed automatic timezone behaviour, hidden response-tab handling, Played submission processing and approval updates. The 18 July ordinary-user test passed the complete operational customer workflow, ownership, isolation and protection checks. On 20 July, a support-prepared delivery workbook retained standard Cloud project 364546476326 after ownership transfer and passed the consent and operational checks. Customer File > Make a copy did not retain the standard project. Google verified and published the branding. On 24 July, the requested privacy correction passed targeted policy, Start Here and User Manual checks, the unchanged application returned to review and the reviewer was notified. Google approved OAuth verification on 25 July 2026. Public managed fulfilment is approved.

On 11 August 2026, the live Selar offer passed a zero-value checkout rehearsal. The order recorded the required Gmail and delivery acknowledgement, sent the buyer receipt, sent the seller notification and redirected to the public Quick Start Buyer Guide. An initial fulfilment attempt exposed that the copy had been created under the buyer account before standard-project association. It showed the default unverified `Competitions` identity and was stopped before permission was granted. The corrected 17 August rehearsal passed support-owned preparation, standard-project association, ownership transfer, verified consent, buyer Form setup, fixture publication, result approval, output checks and Studio access removal. Branded outbound support was also verified.

## 31 August Landing-Page Release Review

The local landing page was checked against the approved positioning, delivery and privacy boundaries. Its Selar destination, USD and UGX prices, service type, personal-Gmail requirement, one-business-day delivery promise, support boundary, public User Manual and privacy route match the live offer.

At desktop and 375-pixel mobile widths, the local product and privacy routes had no page-level horizontal overflow. All public assets loaded, the page had one H1, complete image alternative text, valid landmarks, no duplicate IDs and no browser warnings or errors. The demonstration screenshots contain fictional teams and no buyer, order or private-account information.

The release branch must include the untracked page assets and canonical landing-page brief, retain the historical v0.1.5.3 script unless an explicit archival decision is made, and receive Director approval before deployment. Dense screenshots now provide direct full-size links so mobile readers can inspect the underlying interface without relying on the cropped preview.

## 18 July Ordinary-user QA Result

| Gate | Result | Evidence |
|---|---|---|
| Technical operation | Passed | Copied script, menu, customer Form, fixture creation, submission, approval, standings, Reports and Checks worked. |
| Permission and ownership | Passed | The customer account owned the copy and Form. Consent showed only the four approved permission categories. Full Drive and account-wide Sheets access were absent. |
| Ordinary-user usability | Partial pass | The main workflow and reset wording were understandable. Timezone behaviour was correct, but the Settings control did not visibly show Africa/Kampala. |
| OAuth identity | Failed | Google showed an unverified warning, the application name `Competitions` and a personal developer identity. |
| Documentation and packaging | Failed, remediation prepared | The original User Manual required access. A support-owned public copy now passes unsigned viewing and the master link is repaired. |
| Public release | Hold at test date | The 18 July test did not itself authorise public commercial release. |

The table records the state observed during the 18 July test. Later work repaired the documentation and identity defects, secured OAuth approval, launched the Selar offer, passed checkout and managed-fulfilment rehearsals, and verified branded outbound support. New publication and promotion actions still require Director approval.

## Required Regression

| Area | Test | Pass condition |
|---|---|---|
| Reset | Clear Match Data - Keep Setup | Backup is created, competition setup remains, match data clears and no error occurs. |
| Reset | Reset to Blank Template | Backup is created, editable setup clears, formulas and automation remain intact. Create Fixtures restores Every day, one 09:00 slot, one match at a time, a one-day round gap, zero return-leg break and the MD prefix. |
| Setup | New competition configuration | Checks resolve after a name, 4 to 32 teams and one active venue are entered. |
| Builder | Generate and transfer fixtures | Builder is Ready to review and Fixtures receives the correct fields and statuses. |
| Group builder | Generate every registered group | Each group has complete internal pairings, no cross-group fixture exists and the combined count is within 200. |
| Group scheduling | Compare equal and unequal group sizes | The same round across all groups is scheduled before the next round, dates remain chronological and capacity rules still apply. |
| Group builder | Reject incomplete assignments | Active teams assigned to League and groups with fewer than two teams block generation with a corrective message. |
| Round-robin fairness | Review home and away runs | Pair coverage remains complete and repeated home or away runs are kept within the verified balancing standard. |
| Match days | Generate weekends and one named weekday | Every generated fixture date falls on an allowed day. |
| Round spacing | Force one round across multiple dates | The next round starts from the final date used by the previous round plus the configured minimum gap. |
| Return leg | Generate Double Round-robin with an added break | The extra break is applied once before the second leg and all 56 eight-team fixtures remain complete. |
| Scheduling validation | Clear Match Days or enter an invalid break | Builder Status blocks transfer with a corrective message. |
| Form setup | Run Set Up Result Form | The Form is created or repaired and both automatic triggers are installed without separate customer menu actions. |
| Timezone | Run Set Up Result Form from a customer account in the intended location | The browser timezone is applied automatically. Equivalent East Africa zones display as Africa/Nairobi in Google Sheets Settings and retain GMT+3 behaviour. |
| Form sync | Sync eligible fixtures | Only valid Scheduled fixtures appear. |
| Played | Submit and approve | Result Review, Fixtures, standings, Reports and Form eligibility update. |
| Duplicate | Submit one fixture twice before approval | Manager can reject one and approve one while preserving both records. |
| Walkover | Select Home team or Away team | Correct winner and default score reach official outputs. |
| Postponed | Submit, approve and reschedule | Fixture stays closed until a valid new schedule is entered, then rescheduling reopens it and preserves the earlier report. |
| Abandoned | Submit and resolve | Submitted status remains Abandoned and the manager records Played, Walkover, Postponed or Void. |
| Reports | Compare approvals and official results | Official Results counts only Approved Played and Walkover outcomes. |
| Correction | Correct after approval | Manager workflow preserves one Approved record and audit history. |
| Language | Sweep customer-facing surfaces | No product code, prototype, batch, QA or developer terminology appears in the workbook, Form, menu, dialogs or User Manual. |
| Identity | Check the workbook, Form and User Manual first screen | Each surface explicitly identifies football without relying on surrounding context. |
| Typography | Check workbook, Form theme and User Manual | Workbook and User Manual use Arial; the Form uses the closest clean Basic sans-serif theme; no text is clipped or visually inconsistent. |
| Access | Test with intended non-owner user | Form access works and protected areas cannot be damaged. |
| OAuth identity | Authorise from an account that did not build the product | Consent screen uses the approved public application name, verified domain and acceptable warning state. |
| OAuth scopes | Compare requested permissions with the release scope inventory | Every scope is necessary, documented and represented accurately in the privacy policy. |
| Privacy policy | Open the live product-specific privacy URL | The unchanged verified URL returns 200 and states storage, transport, access control, support access, retention, deletion, incident response, prohibited uses and Cloudflare website processing. |
| In-product privacy | Open Start Here and the User Manual | Both surfaces link to the same live product-specific privacy policy and warn against unnecessary sensitive data. The Result Form remained unchanged through approval. |
| Delivery access removal | Complete a controlled ownership transfer | The customer is owner and the support account is removed unless the customer explicitly requests temporary support access. |
| Least-privilege authorisation | Prepare a controlled delivery workbook, associate the standard project, transfer ownership and reauthorise | The transferred bound project retains the hidden manifest and standard Cloud project without customer editing. Consent requests current workbook access, Forms management, trigger management and permission to display the setup dialog only. Full Drive and account-wide Sheets access are absent. |
| Reset backup | Run both reset actions after scope reduction | A complete backup is created in the owner account main My Drive area and the reset completes. |
| Replace Result Form | Remove or bin the disposable copy Form, then run Repair Tools > Replace Result Form | A new Form and hidden response sheet are created, Result Review is preserved and the old Form is not deleted automatically. |
| Copy navigation | Open every navigation and Form link in a customer copy | Every destination belongs to the customer copy or its configured Form. No master URL opens. |
| Cloud project | Compare support-prepared delivery and transferred-buyer project numbers | The controlled delivery workbook retains standard Cloud project 364546476326 after ownership transfer. |
| Capacity | Run representative high-volume tests | Limits, performance and usable layout are confirmed. |

## Managed-Fulfilment Rehearsal

Run this rehearsal using the live checkout, Quick Start Buyer Guide, User Manual and legal pages. It is a commercial process test, not a repeat of football-logic QA.

| Step | Test | Pass condition |
|---|---|---|
| Order eligibility | Review the checkout record | Payment is recorded, the personal Gmail delivery address is complete and the account requirement is acknowledged. |
| Immediate content | Open the buyer receipt or content page | The Quick Start Buyer Guide, User Manual, licence boundary, privacy, support and ownership instructions are available without asking the buyer to message the Studio. |
| Fresh delivery file | Create from the approved master process | The working master remains unchanged and no prior customer data, Form URL or response destination is present. |
| Verified identity | Associate and inspect the bound project | Standard Cloud project `364546476326`, v0.1.5.9 and the four approved scopes are present. |
| Workbook safety | Check links, protections and reset wording | Customer links are copy-local or public, protected areas remain protected and no destructive action is run unnecessarily. |
| Ownership request | Share and request transfer | The eligible personal Gmail account receives the ownership request without a call or code change. |
| Buyer instructions | Follow only the Quick Start Buyer Guide and linked User Manual | The buyer can accept ownership, authorise the app and run Set Up Result Form without handholding. |
| Data ownership | Inspect the final files | The buyer owns the workbook, Form and responses. Studio access is removed unless temporary support access was requested. |
| Delivery evidence | Close the order checklist | Delivery time, file ID, owner, support window and any exception are recorded without retaining competition data. |
| Support route | Send and receive a test message | `support@freydigitalstudio.com` can send, receive and retain the case without exposing the personal inbox. |

## 11 August Commercial Rehearsal Result

| Gate | Result | Evidence |
|---|---|---|
| Selar order eligibility | Passed for zero value | Order `S12T8H33F6636` recorded the buyer, personal Gmail delivery address and required acknowledgement. Checkout also required the buyer's name, contact email and human verification. |
| Immediate buyer content | Passed | Successful checkout redirected to the public Quick Start Buyer Guide, which links to the canonical User Manual. |
| Buyer and seller notices | Passed | The buyer receipt and seller sale notification were received. |
| Paid transaction and settlement | Not tested | The 100 percent coupon reduced the USD 19 order to USD 0. No payment, transaction fee, KYC or payout was exercised. |
| Fresh delivery-file sanitation | Passed | Historical competition, fixture, result, Form metadata and response tabs were removed from the rehearsal copy. The working master remained unchanged. |
| Customer structure | Passed | The clean copy retained the approved 15 sheets, formulas, validations, formats, protections and hidden states. |
| Standard-project association | Failed sequence | The copy was already buyer-owned and still used a default project when consent was opened. The support-owned standard-project association step had been skipped. |
| OAuth consent | Stopped safely | The unverified `Competitions` screen was closed before permissions were granted. This is not evidence against the approved standard project. |
| Ownership transfer | Pending | Repeat from a support-owned prepared copy after associating standard Cloud project `364546476326`. |
| Buyer Form and isolation | Pending | Test only after the correctly prepared workbook is transferred and the verified consent completes. |
| Outbound support | Passed | Inbound routing and branded outbound sending through the public support address are verified. |

## Evidence To Retain

- Apps Script version and execution-log result.
- Form URL and response destination for a clean copy.
- Concise records of lifecycle tests.
- Checks result after each high-risk action.
- Consent-screen screenshots and the tested Cloud project numbers.
- A link-isolation checklist covering every visible customer navigation control.
- The exact OAuth scope inventory and applicable privacy policy URL.

## Release Rule

Release readiness requires the final bound Apps Script source, passing football-logic regression, ordinary-user access verification and a final clean-copy end-to-end regression. Any remaining limitation must be plainly stated in the buyer guide and listing.

The first 16 July regression is recorded as a partial pass. The 17 July fresh-copy regression closed navigation isolation. The 18 July ordinary-user regression closed the operational and protection gates. The manual defect is repaired. The 20 July controlled-delivery regression confirmed standard Cloud project retention after ownership transfer, and branding verification passed. The privacy correction and OAuth verification are complete. The 11 August zero-value Selar rehearsal closed the checkout-data, notification and immediate-content checks only.

Do not repeat the complete operational QA unless a later change affects that workflow. Complete the remaining managed-fulfilment steps as a process test: support-owned preparation, standard-project association, ownership transfer, verified consent, Form setup, isolation and support removal. Keep paid settlement, KYC and payout open until real evidence closes them.



