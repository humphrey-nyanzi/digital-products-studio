---
name: Football Competition Results & Standings Manager
description: A practical public product site for a customer-owned football competition workflow.
colors:
  canvas: "#F6F8FA"
  surface: "#FFFFFF"
  ink: "#102235"
  navy: "#0B1F33"
  green: "#1F604A"
  soft-green: "#E7F0EA"
  gold: "#B8781E"
  focus: "#A24A10"
typography:
  display:
    fontFamily: "Source Serif 4, Georgia, serif"
    fontSize: "clamp(2.5rem, 5vw, 4.75rem)"
    fontWeight: 700
    lineHeight: 0.98
    letterSpacing: "-0.035em"
  body:
    fontFamily: "Barlow, Segoe UI, sans-serif"
    fontSize: "1rem"
    fontWeight: 400
    lineHeight: 1.65
rounded:
  small: "6px"
  medium: "12px"
spacing:
  compact: "12px"
  standard: "24px"
  section: "96px"
components:
  button-primary:
    backgroundColor: "{colors.green}"
    textColor: "{colors.surface}"
    rounded: "{rounded.small}"
    padding: "14px 20px"
  button-secondary:
    backgroundColor: "{colors.surface}"
    textColor: "{colors.ink}"
    rounded: "{rounded.small}"
    padding: "14px 20px"
---

# Design System: Football Competition Results & Standings Manager

## Overview

**Creative North Star: "The official match record."**

This is a calm public interface for an organiser deciding whether to trust a working system with official competition results. The light page carries the proposition and practical requirements. A single navy evidence field holds real workflow screens. Green identifies ownership, confirmation and the primary action.

The system rejects generic sports SaaS decoration and template landing-page scaffolding. It is not a dashboard, a tournament website or a glossy app mockup. Its authority comes from authentic workbook proof, precise delivery terms and a restrained reading sequence.

**Key Characteristics:**

- Clear proposition before detail.
- Real Google workflow screens used as evidence.
- Flat surfaces with deliberate tonal changes, not repeated cards.
- Calm reading rhythm with practical delivery information.
- One primary action at a time.

## Colors

Navy is the evidence field, green is the action and ownership signal, gold is a small technical detail only.

### Primary

- **Working Green:** Used for the primary action, delivery confirmation and closing action surface.
- **Evidence Navy:** Used for the workflow evidence band and footer.

### Secondary

- **Soft Ownership Green:** Used for factual notes, eligibility and privacy reassurance.
- **Measured Gold:** Used only for small rules and graphic details. It is never body text.

### Neutral

- **Clear Canvas:** Used for the main page background.
- **White Surface:** Used behind page content and screenshots.
- **Record Ink:** Used for headings, body copy and navigation.

**The One Job Rule.** Every colour has one semantic job. Do not use gold as a second action colour, or navy as routine body text on a dark surface.

## Typography

**Display Font:** Source Serif 4 SemiBold, self-hosted with Georgia fallback.
**Body Font:** Barlow Regular and SemiBold, self-hosted with Segoe UI fallback.

**Character:** This self-hosted pairing is used with its SIL Open Font License in `site/assets/fonts/`. Source Serif 4 gives major headings the quiet authority of an official record without using editorial italics or magazine styling; Barlow keeps delivery and privacy information clear without the generic geometric-sans look.

### Hierarchy

- **Display:** Bold, fluid and compact. Used only for the hero and closing action.
- **Headline:** Bold and balanced. Used for major section titles.
- **Title:** Semibold. Used for workflow steps and factual groups.
- **Body:** Regular, 1rem with 1.65 line height. Long policy copy is limited to a readable measure.
- **Label:** Semibold sentence case. Used only where a small context label adds meaning.

**The No Scaffolding Rule.** Do not repeat tiny all-caps labels, headings or divider patterns merely to announce each section.

## Elevation

The system is flat by default. Tone, spacing and full-width colour fields create hierarchy. Screenshots use their own edge and a restrained corner treatment instead of decorative framing or shadows.

**The Evidence Rule.** A screen image may receive depth because it represents a working surface. Text groups and ordinary lists do not need card shadows.

## Components

### Buttons

- **Shape:** Gently rounded rectangle (6px).
- **Primary:** Working green with white text. Used only for the next commercial action.
- **Secondary:** White or transparent surface with a navy border. Used for in-page reading paths.
- **Hover and Focus:** A darkened background for hover and a high-contrast focus outline for keyboard use.

### Notices

- **Style:** Complete softly tinted green surface with a short heading and factual supporting sentence.
- **Border:** No decorative border. Never a coloured side stripe.

### Workflow Evidence

- **Style:** One ordered sequence inside the navy evidence field.
- **Image treatment:** Real screenshots only, with a visible caption. Each screenshot opens at full size, signalled by a zoom pointer and a restrained hover scale.

### Navigation

- **Style:** Text-first navigation with a compact current-state bottom rule.
- **Target:** Each navigation link has a 44px minimum touch target.
- **Mobile treatment:** Wraps without horizontal scrolling and keeps the primary commercial action visible in the page body rather than the header.

## Do's and Don'ts

### Do:

- **Do** use authentic workbook and Form screenshots as the product proof.
- **Do** keep the public price as $19 until an approved commercial change updates every surface together.
- **Do** state the personal Gmail requirement and one-business-day delivery plainly.
- **Do** use soft green for buyer control, eligibility and reassurance.
- **Do** preserve visible focus, meaningful link text and reduced-motion support.

### Don't:

- **Don't** use generic sports SaaS marketing, fake dashboards, stock football imagery or AI mockups.
- **Don't** use repeated all-caps kickers, equal card grids, decorative side stripes or divider-heavy page scaffolding.
- **Don't** use gold for body text or a second primary action.
- **Don't** imply an instant download, full Google Drive access or a hosted competition database.
- **Don't** let a privacy explanation become a dense, ungrouped legal wall.
