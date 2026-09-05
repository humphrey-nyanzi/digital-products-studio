# Public Landing Page Brief And Listing Pack

Document: Public Landing Page Brief And Listing Pack
Status: Redesigned locally after approved release audit, awaiting Director review
Version: 0.3.0
Owner: Humphrey Nyanzi
Authority: Product document
Last Updated: 31 August 2026
Next Review: Before deployment to the verified product route

## Purpose

This document is the canonical source for public Product 001 positioning outside the live Selar listing. It contains:

- the requirements for a conversion-focused public landing page;
- reusable copy for product directories, catalogues and relevant community listings;
- the approved claim, delivery and support boundaries;
- the minimum asset set needed before wider distribution.

It does not authorise publication. The Studio Director must approve each destination and the final submitted copy.

## Release Readiness

Status: Public-ready with conditions.

The product, Selar listing, checkout fields, immediate Quick Start redirect, managed fulfilment sequence and branded outbound sending have been tested. A zero-value order did not test payment collection, KYC, settlement or payout.

Before directing new traffic to the offer:

1. Confirm that the live Selar name, prices, delivery promise and checkout fields still match this document.
2. Use only destinations where the intended buyer is likely to organise a football competition.
3. Submit one channel at a time so enquiries, checkout starts and purchases can be attributed accurately.

## Implementation Status

The approved landing-page brief has been redesigned locally at `site/products/football-competition-manager/index.html`. The verified public route has not been changed or deployed.

Four authentic workflow screenshots are stored in `site/products/football-competition-manager/assets/`:

- `create-fixtures.webp`;
- `result-form.webp`;
- `result-review.webp`;
- `standings-reports.webp`.

The corrected square product cover is stored beside them as `product-cover.webp`. It is retained for Selar and social-sharing metadata, not the public-page header or workflow evidence.

The 31 August release audit approved a calmer, evidence-led revision: text-only header, standings-and-reports hero proof, three-step workflow evidence, a factual privacy summary and a single green closing action. The release candidate includes Cloudflare redirects from the duplicate root routes to the product-specific canonical routes. These redirects have not been deployed. The local page has been checked at desktop and mobile widths, and dense workflow screenshots include direct full-size links for constrained screens. Director review and explicit deployment approval remain required before any verified public route changes.

## Positioning Foundation

### Primary buyer

Small football tournament and league organisers who currently coordinate fixtures, results and standings through disconnected spreadsheets, messages or manual tables.

The most relevant organisations are:

- schools and school competition organisers;
- football academies;
- community tournaments;
- club networks;
- sports facilities that run recurring football competitions.

### Buyer problem

The organiser needs one dependable record of fixtures, submitted results, approved outcomes, standings and reports. Their current process can create repeated data entry, correction disputes, delayed tables and uncertainty about which result is official.

### Product outcome

The organiser receives a structured Google Sheets workbook with a connected Google Result Form. They can create or enter fixtures, collect match results, review submissions before approval, and maintain current standings and reports in one workflow.

### Positioning statement

Football Competition Results & Standings Manager is a customer-owned Google Sheets and Google Forms system for small football competition organisers who need a clearer way to manage fixtures, approve results and maintain official standings without adopting a full tournament platform.

### Differentiation

- Customer-owned Google files rather than a hosted platform account.
- A connected Result Form for structured match submissions.
- Manager approval before a submission affects official results.
- Football-specific fixtures, standings, reports and validation checks.
- No recurring product subscription.
- A documented one-business-day ownership-transfer delivery process.

### Honest limits

The offer is not:

- an instant workbook download;
- a public tournament website or mobile app;
- a player registration or goal-scorer database;
- an automatic knockout progression tool;
- ongoing competition administration or data entry;
- a custom implementation or redesign service;
- proof that payment settlement or payout has been completed successfully.

## Public Landing Page Brief

### Page objective

Help an eligible organiser decide whether the product fits their competition, understand the managed delivery process and continue to the live Selar checkout.

The primary conversion is a qualified click to:

`https://selar.com/football-competition-manager`

### Existing route boundary

Keep the verified product route stable:

`https://freydigitalstudio.com/products/football-competition-manager/`

The current page supports the verified Google application, privacy information and customer help. Keep the verified product route, product identity, privacy link and support link stable. On the next approved deployment, redirect `/` to the product route and `/privacy/` to the product privacy route so no public duplicate remains.

### Required page sequence

#### 1. Hero

Context label:

For football organisers

Heading:

Run fixtures, results and standings from one official record.

Supporting copy:

Create the fixture list, collect results in a connected Form and approve each score before it updates the table.

Primary action:

View the $19 offer

Secondary action:

See the workflow

#### 2. Problem and outcome

Heading:

One record for the result that counts.

Copy:

When fixtures, result messages and standings live in separate places, corrections take longer and it becomes harder to confirm what is official. This workflow keeps the schedule, submitted results, review decisions and current reports connected.

#### 3. Workflow

Heading:

Prepare the schedule. Review the score. Publish the table.

Steps:

1. Prepare fixtures with the generated schedule or manual entry.
2. Collect eligible results in the connected Form and review the submitted score.
3. Publish current standings after approval.

#### 4. Best fit

Heading:

Fit, delivery and ownership

Best-fit buyers:

- schools, academies and community tournaments;
- club networks and local leagues;
- sports facilities running recurring football competitions;
- organisers managing 4 to 32 teams and up to 200 fixtures.

Not a fit for:

- organisers who need a hosted public tournament portal;
- competitions requiring player registration or goal-scorer tracking;
- organisations that can only accept ownership through a work, school or organisation-managed Google account;
- buyers seeking ongoing administration or custom development within the listed price.

#### 5. Delivery and ownership

This is a manually prepared service, not an instant download. At checkout, you provide the personal Gmail address that should own the files. The workbook is prepared and transferred within one business day after a complete eligible order. You then accept ownership, authorise the verified Google application and create your Result Form through the guided setup.

Required notice:

Work, school and organisation-managed Google accounts are not currently supported for ownership delivery.

#### 6. Price and support

Price:

- USD 19 on the public website. Selar may offer local currency at checkout.

Support copy:

The purchase includes standard email support for delivery and setup difficulties, reproducible product defects, and feedback for seven calendar days after delivery. Responses are targeted within two business days. Competition administration, data entry, customisation and guaranteed feature development are not included.

#### 7. Trust and privacy

Required points:

- The buyer owns the workbook, Result Form and competition data after transfer.
- Studio access is removed after delivery unless the buyer explicitly requests temporary support access.
- The application works in the product workbook and its connected Form.
- The application does not request full Google Drive access or account-wide Google Sheets access.
- Link to the public privacy policy and User Manual.

#### 8. Final action

Heading:

Start your next competition with one official record.

Action:

View the offer on Selar

Supporting notice:

You will need a personal Gmail account and must accept the ownership transfer after delivery.

### Page design requirements

- Use a calm, capable and practical layout with shorter sections and clear descriptive headings.
- Use navy as the evidence field, green as the action and ownership colour, white and cool grey as reading surfaces, and gold only for small details.
- Use self-hosted Barlow Regular and SemiBold for reading copy, with Source Serif 4 SemiBold for headings. Retain the SIL Open Font Licenses beside the font files.
- Use the corrected square cover only for Selar and social-sharing metadata, not in the page header.
- Use authentic screenshots with realistic sample data for workflow evidence.
- Avoid stock football photography, synthetic interface mock-ups and decorative dashboards.
- Keep the primary Selar action near the top and repeat it once in the green closing section.
- Make the delivery, account and support boundaries readable without opening another page.
- Preserve the existing privacy, User Manual and support links.
- Support mobile reading without hiding eligibility or delivery notices.
- Do not use repeated all-caps kickers, equal card grids, coloured side stripes or divider-heavy scaffolding.

### Required evidence assets

Prepare four current screenshots from a clean demonstration competition:

1. Create Fixtures showing a complete draft schedule.
2. The connected Result Form showing an eligible fixture selection.
3. Result Review showing a submitted result ready for an organiser decision.
4. Standings and Reports showing current outputs after approval.

Screenshot rules:

- use realistic but fictional team and competition names;
- remove personal email addresses, order details and internal file identifiers;
- show only the relevant part of each screen;
- retain readable interface text at mobile and desktop display sizes, with a direct full-size view for dense screenshots on constrained screens;
- make a dense screenshot itself the full-size link, with a zoom pointer, restrained hover scale and new-tab behaviour rather than visible link copy;
- do not expose hidden response tabs, technical configuration or internal test labels.

Optional demonstration:

A 45 to 60 second silent screen recording may show the path from result submission to approved standings. It should not imply instant delivery or automatic competition administration.

## Reusable Listing Pack

### Product name

Football Competition Results & Standings Manager

### One-line description

Manage football fixtures, approve submitted results and keep official standings current in one connected Google Sheets and Google Forms workflow.

### Short description

A customer-owned Google Sheets and Google Forms system for small football competition organisers who need a structured way to manage fixtures, review results and maintain official standings.

### Medium description

Football Competition Results & Standings Manager helps small tournament and league organisers keep fixtures, submitted results, approved outcomes, standings and reports in one controlled workflow. Create or enter the schedule in Google Sheets, collect match results through a connected Google Form, review every submission before it becomes official, and check current standings and reports from the same workbook. The product is manually prepared and transferred to your personal Gmail account within one business day.

### Long description

Running a small football competition often means collecting results through messages, correcting tables manually and checking several files before confirming the official standings.

Football Competition Results & Standings Manager brings that work into one customer-owned Google Sheets workbook with a connected Google Result Form. You can add teams and venues, generate a round-robin schedule or enter fixtures manually, publish eligible fixtures to the Form, review submitted match outcomes and approve the official record before standings and reports update.

The product supports 4 to 32 teams and up to 200 fixtures. It includes the prepared workbook, the connected Result Form workflow, a Quick Start Buyer Guide, a detailed User Manual and standard email support for seven calendar days after delivery.

This is a manually prepared service, not an instant download. At checkout, provide the personal Gmail address that should own the files. Delivery is within one business day after a complete eligible order, and you must accept the Google ownership transfer. Work, school and organisation-managed Google accounts are not currently supported for ownership delivery.

### Primary buyer field

Small football tournament and league organisers, including schools, academies, club networks, community tournaments and sports facilities that run football competitions.

### Buyer problem field

Fixtures, result submissions, corrections and standings are scattered across messages or separate spreadsheets, making it difficult to maintain one dependable official competition record.

### Outcome field

One organised workflow for creating fixtures, collecting match results, approving official outcomes and maintaining current standings and reports.

### Key capabilities

- 4 to 32 teams and up to 200 fixtures.
- Single and double round-robin scheduling.
- Multi-group round-robin and manual fixture entry.
- Connected Google Result Form for eligible fixtures.
- Organiser review before results become official.
- Standings, reports and competition checks.
- Customer ownership of the workbook, Form and competition data.

### Requirements

- A personal Gmail account.
- Google Sheets and Google Forms access.
- Acceptance of the Google ownership transfer.
- An organiser responsible for reviewing and approving submitted results.

### Delivery statement

Manually prepared and transferred to the buyer's personal Gmail account within one business day after a complete eligible order. This is not an instant download.

### Support statement

Includes standard email support for delivery and setup difficulties, reproducible product defects, and feedback for seven calendar days after delivery. Responses are targeted within two business days.

### Price field

USD 19 or UGX 70,000 through Selar.

### Primary link

`https://selar.com/football-competition-manager`

### Supporting links

- Product information: `https://freydigitalstudio.com/products/football-competition-manager/`
- User Manual: `https://docs.google.com/document/d/1Ames7P4PMyqcGbKgfSXJlSuO-zqL8-kSi2SFXSGevGs/edit`
- Privacy Policy: `https://freydigitalstudio.com/products/football-competition-manager/privacy/`

### Suggested categories

Use the narrowest available category that fits the destination:

1. Football or sports competition management.
2. Sports administration.
3. Spreadsheets or productivity tools.
4. Data and analytics.

Do not use a broader category when a football or sports administration category is available.

### Suggested search terms

- football competition manager
- football standings spreadsheet
- football results tracker
- tournament fixtures and standings
- league table Google Sheets
- football result submission form
- small tournament management

Use terms only where the destination permits relevant tags. Do not repeat them unnaturally in descriptions.

### Asset captions

Cover image:

Football Competition Results & Standings Manager for small tournament and league organisers.

Create Fixtures screenshot:

Create a complete football schedule in the workbook or enter fixtures manually.

Result Form screenshot:

Collect structured match results through a connected Google Form.

Result Review screenshot:

Review each submission before it affects the official competition record.

Standings and Reports screenshot:

Keep standings and competition reports current after approved outcomes.

### Cover image alt text

Navy cover for Football Competition Results & Standings Manager with stylised football standings tables in green, white and gold.

### Calls to action

Primary:

View pricing and order on Selar.

Alternative for an informational directory:

See how the football competition workflow works.

Do not use urgency claims, limited-time language or promises of immediate access.

## Claim Control

### Approved claims

- The product supports 4 to 32 teams and up to 200 fixtures.
- It uses a connected Google Sheets and Google Forms workflow.
- Submitted results are reviewed before they become official.
- The buyer owns the delivered workbook, Form and competition data.
- The product is manually prepared and delivered within one business day after a complete eligible order.
- The purchase includes seven calendar days of standard email support.
- The current prices are USD 19 and UGX 70,000.

### Claims that require new evidence

Do not state that:

- the product is an instant download;
- delivery is fully automated;
- the product has verified paid customers, sales volume or demand;
- Selar settlement, KYC or payout has passed;
- the product eliminates every standings error;
- the system administers the competition without organiser review;
- the product supports every tournament format or every Google account type;
- support is immediate, unlimited or available around the clock;
- customisation or competition administration is included in the listed price.

## Submission Checklist

Before using this pack on any public destination:

1. Record the destination, audience and listing purpose.
2. Confirm the destination permits service listings with manual delivery.
3. Recheck the live name, price, Selar link and delivery promise.
4. Confirm branded outbound support is operational.
5. Select only the copy length and fields required by the destination.
6. Use the corrected cover and at least one authentic workflow screenshot where supported.
7. Check privacy, attribution and screenshot data.
8. Obtain Director approval for the final destination and copy.
9. Record the publication date and unique destination URL in the existing Product 001 records.
10. Review enquiries, checkout starts and purchases without treating exposure as demand proof.

## Related Documents

- [Product Requirements](product_requirements.md)
- [Release Plan](release_plan.md)
- [Architecture Blueprint](architecture_blueprint.md)
- [Product Links](../links.md)
- [Asset Map](../assets/template_map.md)

## Change Log

### 0.3.0, 31 August 2026

Recorded the approved release-audit redesign: canonical root-route redirects prepared for Cloudflare, a text-only header, standings-and-reports hero proof, a three-step evidence sequence, $19-only public price presentation, redesigned factual privacy page and root Product and Design contracts. The work remains local and awaits Director review, deployment approval and production verification.

### 0.2.1, 31 August 2026

Recorded local release-review corrections: direct full-size screenshot links for constrained screens, share-preview metadata and clean-branch preparation. No deployment or public listing change was made.

### 0.2.0, 29 August 2026

Recorded Director approval of the brief, implemented the landing page locally at the existing route, added four authentic workflow screenshots and completed desktop and mobile checks. No deployment or public listing change was made.

### 0.1.0, 27 August 2026

Created the landing-page requirements and reusable listing pack for Director review. No external listing or website change was made.
