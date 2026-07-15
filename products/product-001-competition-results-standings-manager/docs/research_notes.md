# Historical Research Notes

Owner: Humphrey Nyanzi  
Product: Football Competition Results & Standings Manager  
Status: Archived discovery context, not implementation authority  
Last reconciled: 2026-07-10

## Purpose

This file preserves only the discovery conclusions that remain useful after the July build. Current scope and implementation are recorded in `product_requirements.md`, `decisions.md`, `architecture_blueprint.md` and `prototype_status.md`.

## Durable Findings

- Small football competition organisers need a reliable way to move from fixtures to reviewed results and shareable standings without a heavy sports-management platform.
- Schools are an important buyer segment, but the product must also work for academies, sports centres, community leagues and club networks.
- A spreadsheet and Form workflow is credible when it reduces manual copying, protects official results and gives organisers clear validation.
- The buyer value is operational reliability, not a broad player or competition database.
- One venue is a normal operating case. Multiple pitches or playing areas should be represented as separate venue records when needed.
- English is the v1.0 language. Future money features should support currency provision with USD as a default rather than promise full localisation.

## Superseded Research Decisions

Older research references to Goal Scorers, Top Scorers and a narrow Form-sync-only script are superseded. v1.0 excludes scorer tracking and uses a broader bound Apps Script lifecycle for safe transfer, workbook-specific Form repair, response processing and fixture closure.