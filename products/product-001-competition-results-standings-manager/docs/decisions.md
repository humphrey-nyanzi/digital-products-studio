# Product Decisions

Product: Football Competition Results & Standings Manager  
Last updated: 29 July 2026

## D001 - Football-first self-service scope

Decision: Product 001 serves small football competition organisers using a reusable spreadsheet and Form workflow.

## D002 - Sheets, Form and bound Apps Script

Decision: v0.1.0 uses Google Sheets for structured operations, a workbook-specific Google Form for submissions and bound Apps Script for unsafe state changes.

## D003 - Fixtures are the official schedule

Decision: Create Fixtures creates drafts. Fixtures is the official register and the only fixture source for Form eligibility.

## D004 - Manager-owned result decisions

Decision: officials submit match facts. The competition manager owns Review Decisions, duplicate resolution, corrections, score overrides and Void decisions.

Consequence: the Form does not expose internal IDs, correction types or historical submission references.

## D005 - Status-based Form flow

Decision: the Form branches after Match Status. Played collects two scores; Walkover selects Home team or Away team; Postponed and Abandoned collect reason or context.

## D006 - Preserve audit history

Decision: do not delete incorrect submissions. Reject or supersede them and retain raw responses and Result Review history.

## D007 - Goal scorers excluded from v0.1.0

Decision: scorer tracking and Top Scorers reporting are parked future scope. Goal Scorers remains hidden and must not appear in Form, Reports or the buyer workflow.

## D008 - Hide or remove buyer-irrelevant surfaces

Decision: internal sheets remain hidden. Automation Setup and Example Data were removed and their useful guidance belongs in the canonical User Manual.

## D009 - Owner-only reset actions

Decision: provide Clear Match Data - Keep Setup and Reset to Blank Template, each with a backup and typed confirmation.

Current status: per-copy Form creation, response-tab hiding, reset and populated post-reset operation have passed live QA through Apps Script v0.1.5.0.

## D010 - Documentation authority

Decision: maintain the current state in the owning Product 001 documents, the canonical User Manual and the Product 001 Notion record. Do not create separate reconciliation documents for routine drift.
## D011 - Separate submitted status from competition outcome

Decision: preserve the official's submitted Match Status and record a separate manager-owned Official Outcome.

Consequence: an Abandoned report is not automatically a Walkover. It defaults to Postponed for review, while the manager may resolve it as Played, Walkover, Postponed or Void. Only Played and Walkover are score-bearing official results.

## D012 - Manager-controlled postponement reopening

Decision: a Postponed fixture remains unavailable in the Form until the manager enters a new schedule and runs Reschedule Selected Fixture.

Consequence: the earlier postponement is retained as Replaced, the fixture returns to Scheduled and the Form refreshes without deleting audit history.

## D013 - Complete multi-group generation

Decision: Group Round-robin generates every registered group in one draft schedule rather than generating one selected group at a time.

Consequence: Active teams must be assigned to a named group, pairings remain inside each group, each group requires at least two teams and the combined draft must fit the 200-fixture limit. A deterministic home and away balancing rule reduces repeated home or away runs without changing the official Fixtures register until transfer.

## D014 - Bounded practical scheduling controls

Decision: Create Fixtures supports permitted match days, minimum calendar days between rounds and an optional return-leg break for Double Round-robin.

Consequence: organisers can model common weekend, weekday and single-day schedules without manual date rebuilding. The controls operate at calendar-date level and do not claim exact-hour recovery, travel or venue optimisation.

## D015 - Interleave multi-group rounds

Decision: combined Group Round-robin output is ordered by round, then group and fixture position.

Consequence: every registered group completes MD1 before any group advances to MD2. Scheduling capacity is counted across all groups in the shared round, while pairings remain confined to their assigned group.

## D016 - Customer language boundary

Decision: customer-facing workbook pages, the Result Form, the Competition Tools menu, dialogs and the User Manual use the product name and task-based competition language only.

Consequence: Product 001, batch identifiers, QA evidence, implementation versions, migration notes and developer terminology remain in repository, Notion and project records. Customer-facing labels use Create Fixtures, Publish Fixture List, Checks, Approved Results, Open Fixtures, Items to Fix, Official Outcome, Approved and Replaced.

## D017 - Explicit football identity

Decision: the customer-facing product name is Football Competition Results & Standings Manager, and the customer-facing Form title is Football Match Result Submission.

Consequence: football is explicit in the workbook, Form and User Manual from the first screen. Soccer may be used in marketplace keywords or search metadata, but it is not added to the operational interface. Product 001 remains the internal project code.

## D018 - Arial product typography

Decision: Arial is the standard font for the customer workbook and User Manual. The Google Form uses the closest clean Basic sans-serif theme available in the Form editor.

Consequence: customer-facing documents use a consistent, readable and widely available typeface. The User Manual uses native headings and lists rather than manual styling that can break during export.

## D019 - Release gates before public launch

Decision: the 16 July clean-copy test is a partial pass. Customer ownership, copied automation, customer Form creation and isolated response processing passed. OAuth trust and copy-local navigation did not pass.

Consequence: public packaging and launch remain blocked while the Studio establishes its Google application identity, privacy and verification foundation and Product 001 repairs master-linked navigation.

## D020 - Studio-managed Google application identity

Decision: public Google automation products use a Studio-managed distribution identity, owned domain, public privacy policy, support contact and approved standard Google Cloud project rather than an informal personal or temporary project identity.

Consequence: the Studio foundation is reusable across future products, while each product still records its exact scopes, data use and verification evidence.

## D021 - Customer-copy isolation is mandatory

Decision: every visible workbook link, Form link, response destination and automated write in a customer copy must resolve to that customer's assets or an explicitly public support resource.

Consequence: a master workbook URL, old Form URL or cross-copy data write is a release-blocking defect.

## D022 - Preserve the working master during release architecture work

Decision: do not blank the current working master while link and OAuth architecture work is underway. Use disposable customer copies for reset, authorisation and delivery testing.

Consequence: the master remains implementation evidence and the current QA copy remains defect evidence only. A fresh customer copy is required for the final release gate.

## D023 - Copy-local navigation uses relative sheet links

Decision: customer-facing workbook navigation uses relative sheet links. Form buttons read the configured published Form URL from Setup. Apps Script repairs legacy navigation and clears inherited Form configuration when the stored linked spreadsheet ID belongs to another workbook.

Consequence: a copied workbook does not navigate back to the Studio master, and it does not expose the master Form before the customer owner sets up a copy-specific Result Form.

## D024 - Customer-copy navigation isolation passed

Decision: Apps Script v0.1.5.3 and the copy-local workbook formulas are the verified navigation baseline for the current prototype.

Evidence: on 17 July 2026, a fresh customer copy passed all seven approved steps covering internal workbook navigation, pre-setup Form prompts, customer-owned Form creation and both post-setup Form links.

Consequence: customer-copy navigation is no longer a release blocker. OAuth consent trust, exact scopes, Cloud project identity and the final ordinary-user release gate remain open.

## D025 - Least-privilege Apps Script scopes

Decision: the prepared v0.1.5.9 master bound project declares current-workbook spreadsheet access, Forms management, trigger management and bound-container dialog access through an explicit manifest. Full Google Drive and account-wide Sheets access are removed.

Consequence: reset backups use Spreadsheet.copy and are created in the owner account main My Drive area. The script no longer checks the bin state through DriveApp. A missing, binned or unusable Result Form is replaced through the owner-only Repair Tools > Replace Result Form action, which preserves Result Review and leaves old Form deletion to the owner.

Verification boundary: this decision is implemented in the repository package but is not live evidence until v0.1.5.9 is installed, reauthorised and regression-tested in a disposable customer copy.

## D026 - Blank reset restores usable scheduling defaults

Decision: Reset to Blank Template clears customer competition data but restores safe Create Fixtures defaults instead of leaving required scheduling controls blank. The defaults are Every day, one 09:00 kick-off slot, one match at a time, a one-day minimum gap between rounds, zero return-leg break and the MD prefix.

Consequence: a first-time organiser still chooses the format, teams and first match date, but is not blocked by a required Match Days value that the reset removed. Set Up Result Form installs the submission and approval triggers automatically. Trigger repair commands remain owner-only recovery tools rather than normal setup steps.
## D027 - Automatic competition timezone

Decision: competition organisers do not choose a timezone from a limited workbook list. Set Up Result Form detects the organiser browser timezone, applies it to the workbook and stores it as a hidden system setting.

Consequence: dates, times, backups and Form operations use the organiser context without adding setup burden. If detection fails, the workbook retains its existing timezone.

## D028 - Bound-project permission boundary

Decision: @OnlyCurrentDoc cannot be used because it also reduces Forms access to forms.currentonly, while this product must create a separate Result Form. The master bound project therefore owns an explicit least-privilege manifest.

Consequence: the Studio configures Code.gs and appsscript.json once in the master. Customers copy the bound project with the workbook and do not edit code or the hidden manifest. Clean-copy QA must confirm that the copied project retains current-workbook Sheets, Forms, trigger and container UI scopes without full Drive or account-wide Sheets access.
## D029 - v0.1.5.9 copied-workbook technical regression passed

Decision: v0.1.5.9 is the verified technical baseline for copied-workbook Form setup and result processing.

Evidence: on 18 July 2026, a workbook copy successfully detected timezone, created its Result Form, hid the response tab, processed a Played submission and applied an approved result to Fixtures, standings and Reports.

Consequence: copied-workbook technical operation is no longer the active blocker. Separate-account consent identity, protection behaviour, delivery usability and the final release decision remain open.

## D030 - Final ordinary-user operational QA passed

Decision: the 18 July 2026 separate-account test passes technical operation and permission ownership, partially passes usability, and fails OAuth identity and documentation packaging.

Consequence: public release remains on hold. The tested operational workflow does not need a full repeat unless a later change affects it. Targeted regressions will cover repaired links, timezone display and Cloud project identity.

## D031 - Dedicated support identity and owned domain

Decision: `freydigitalstudio.com` is the release infrastructure domain and `support@freydigitalstudio.com` is the support and Google application account. The domain does not settle the final public brand name.

Consequence: the personal developer identity can be removed from customer-facing ownership and OAuth surfaces without forcing a premature Studio rebrand.

## D032 - Public support-owned User Manual

Decision: the canonical User Manual is owned by the dedicated support Google account and shared to anyone with the link as Viewer. The master workbook links to this document as an explicitly public support resource.

Consequence: customer workbook copies can open the manual without requesting access, while editing remains controlled by the support identity.

## D033 - Visible East Africa timezone normalisation

Decision: repository-prepared v0.1.6.0 maps equivalent East Africa GMT+3 browser timezone identifiers to Africa/Nairobi before applying the spreadsheet timezone. Other timezone identifiers pass through unchanged.

Consequence: Google Sheets can visibly display the selected timezone while competition dates and times retain the verified GMT+3 behaviour. Installation and a targeted live check remain required.

## D034 - Product support site before OAuth configuration

Decision: publish a small static product homepage and accurate privacy policy on the owned domain before configuring the production OAuth consent screen.

Consequence: the site uses the product name and support contact only. The internal Studio name and undecided public brand are not presented as settled customer identity.

Verification: on 19 July 2026, Cloudflare Pages served the homepage and privacy policy over HTTPS at `freydigitalstudio.com`. Both pages returned 200, linked to the support-owned User Manual and exposed the verified support address through Cloudflare email protection.

## D035 - Stable product routes on a shared release domain

Decision: `freydigitalstudio.com` remains shared infrastructure for multiple products. Product 001 uses `/products/football-competition-manager/` and `/products/football-competition-manager/privacy/` as its stable OAuth homepage and privacy routes.

Consequence: the domain root can later become a product catalogue or public brand page without changing Product 001 trust URLs or repeating verification solely because the root purpose changes.

Status: deployed and live-verified on 20 July 2026. Google verified and published the Product 001 branding using these stable routes.

## D036 - Controlled delivery is the verified pilot architecture

Decision: prepare each pilot delivery workbook through the support account, associate its bound script with standard Cloud project `364546476326`, then transfer workbook ownership to the customer. The customer owns the workbook and the Form created from it.

Evidence: on 20 July 2026, the transferred workbook retained the standard Cloud project and passed consent, Form creation, submission, approval, isolation and protection checks. A customer-created File > Make a copy received a default Cloud project instead.

Consequence: direct self-service copying is not the approved release route. A Google Sheets Editor add-on remains a possible future distribution architecture only after pilot demand justifies the extra build, review and support burden.

## D037 - Branding passed and data-access verification entered review

Decision: publish the verified Product 001 branding and submit the four approved scopes for Google data-access verification under standard project `decoded-vision-502911-q6`.

Evidence: on 20 July 2026, Google confirmed that branding is verified and shown to users. The Verification Centre confirmed receipt of the data-access submission. The submission includes scope justifications and the workflow demonstration at `https://youtu.be/DZ81Cq88wOo`.

Consequence: public release remains on hold during review. Preserve the submitted app name, domains, scopes and Cloud project unless Google requests a correction. Commercial preparation may continue privately.

## D038 - Customer data protection and support access

Decision: customer competition data remains in customer-owned Google files. Frey Digital Studio does not keep a continuing data copy or OAuth tokens. Controlled delivery removes the support account after ownership transfer unless the customer explicitly requests temporary support access. Temporary access is limited to the named file and purpose, removed when the case closes, and any downloaded support copy is deleted within 30 days unless a longer period is required by law or requested by the customer.

Consequence: the public privacy policy, Start Here, User Manual and controlled-delivery process must describe the same ownership, access, retention, deletion and data-minimisation boundary. Customer information is not used for advertising, credit decisions, data brokerage, unrelated databases or general artificial intelligence model training. A documented incident-response procedure covers containment, access revocation, evidence, investigation, correction and appropriate notification.

## D039 - Google privacy correction preserves verified OAuth identity

Decision: respond to Google's 23 July 2026 request by expanding the existing product-specific privacy policy and adding a non-functional Start Here privacy notice. Keep the verified app name, homepage URL, privacy URL, four scopes, OAuth client and standard Cloud project unchanged.

Evidence: Google's review email identified one issue: the privacy policy did not specify data protection mechanisms for sensitive data. It did not reject the branding, product purpose, scope set or standard Cloud project.

Consequence: deploy and verify the correction, resubmit through the Verification Centre and reply directly to the review email. Run targeted public-policy, Start Here, User Manual and ownership-transfer support-removal checks only. Keep the live Apps Script unchanged during review. Do not repeat the completed end-to-end operational QA without a workflow-impact reason.

## D040 - Privacy correction completed and Google review resumed

Decision: treat the 23 July privacy request as completed after the expanded policy, Start Here notice and canonical User Manual were verified on 24 July 2026. Preserve the reviewed app name, homepage URL, privacy URL, four scopes, OAuth client, standard Cloud project, Apps Script and Result Form while Google continues review.

Evidence: the expanded policy was deployed at the unchanged product privacy URL, the workbook and manual show aligned customer-data guidance, the application returned to data-access review and a direct response was sent in the existing Google review thread.

Consequence: the external blocker is now Google approval rather than an outstanding privacy edit. Continue private controlled-pilot, pricing, payment and packaging work without reopening completed operational QA.

## D041 - Inbound support routing is not an outbound support identity

Decision: do not treat inbound forwarding for support@freydigitalstudio.com as a complete customer-support mailbox. Before buyer support begins, configure a Studio-controlled mailbox that sends and retains mail through the public support address without exposing the Director's personal address.

Evidence: the Google reviewer reply had to be sent from the personal receiving account because the routed support address was unavailable as an outbound sender.

Consequence: establish the sending mailbox, access controls, recovery, SPF, DKIM, DMARC and retention procedure as shared Studio infrastructure. Do not change the active OAuth support contact during review unless Google requests it.

## D042 - Google OAuth approval closes the external verification gate

Decision: record Google approval on 25 July 2026 as the closure of the external verification gate. Preserve the approved application name, homepage URL, privacy URL, four scopes, OAuth client, standard Cloud project and v0.1.5.9 Apps Script baseline unless a commercial requirement exposes a workflow-impact reason.

Evidence: Google confirmed OAuth verification approval after the 24 July privacy correction and reviewer response. The approval required no Apps Script, Result Form, scope, OAuth client or Cloud-project change.

Consequence: move Product 001 into commercialisation. The open gates are branded outbound support, pricing, payment qualification, packaging, fulfilment rehearsal, market validation and the Director release decision.

## D043 - Public managed fulfilment is the commercial release model

Decision: Product 001 may be listed publicly while every paid order is fulfilled through a Studio-prepared workbook and customer ownership transfer. Public availability does not require a closed group of named pilot customers.

Consequence: the checkout platform handles payment, order evidence and immediate Delivery Pack access. Google Drive handles workbook ownership. The Studio does not distribute the working master or instruct buyers to use File > Make a copy.

## D044 - Personal Gmail is the first-release ownership requirement

Decision: the first public offer requires a personal Gmail account for workbook ownership. Work, school and organisation-managed Google accounts are excluded until a separate Workspace delivery route is tested.

Consequence: checkout must collect a required personal Gmail delivery address and an acknowledgement of the account requirement. The buyer's unavoidable actions are to provide the address, accept ownership, authorise the verified application and run Set Up Result Form. The buyer never edits Apps Script code or the manifest.

## D045 - Gumroad is a channel, not the business

Decision: qualify Gumroad as the first public checkout candidate because the Director has a legitimate active US bank account available for payouts. Keep the owned product page as the permanent product destination and Google Drive as the ownership-delivery layer.

Consequence: Gumroad onboarding must use the Director's real identity, residence, tax and beneficial-owner information. The US bank account improves payout viability but does not change the seller's country or remove compliance checks. Complete a real payout test before treating Gumroad as dependable. Preserve regional payment alternatives for later use.

## D046 - Self-service support boundary

Decision: the product is designed for independent end-to-end use. Customers may contact `support@freydigitalstudio.com` for delivery or setup difficulty, reproducible defects, comments and feature requests.

Consequence: standard email support lasts seven calendar days after delivery with a target response within two business days. Support excludes competition administration, data entry, custom formulas, redesign, unsupported formats, account recovery, deliberate damage, unlimited training and guaranteed feature development. A feature request is recorded and considered, not promised. Temporary workbook access follows D038.

## D047 - Public market evidence replaces assumed friend pilots

Decision: validate the commercial offer through measured public exposure and real buyer behaviour. A friend may provide useful feedback but is not a release dependency.

Consequence: record product-page reach where available, checkout starts, completed purchases, enquiries, objections, refunds, support incidents and substantive buyer conversations. Review early signals without reopening product development, then make a continue, revise, pause or close decision only after sufficient evidence.

## D048 - Low-risk launch pricing tests buyer demand

Decision: offer Product 001 to the first 10 paid buyers at $19, then use $29 as the planned standard self-service price. Keep assisted setup separate at $79. Custom implementation remains separately scoped and quoted.

Evidence: relevant buyer alternatives range from free spreadsheets and free hosted tournament tools to Tournify Pro at $79 per year and Competize Small Tournaments at EUR 19 per month. Product 001 has a narrower customer-owned workflow and no public hosted platform. It has no paid-buyer history, reviews or established product brand. A $19 launch price reduces buyer risk while preserving a usable direct-sale contribution after Gumroad fees.

Consequence: the first revenue signal is three independent paid buyers. The full initial cohort target is 10 paid buyers. Pricing may change only from buyer, conversion, support and fulfilment evidence. Weak sales are not attributed to price until the offer receives sufficient relevant exposure. The working licence covers one purchasing organisation using the product for its own competitions and prohibits resale or redistribution.
