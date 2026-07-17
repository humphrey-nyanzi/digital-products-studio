# Product Requirements

Product: Football Competition Results & Standings Manager  
Status: Working prototype v0.1.0, final release QA  
Last verified: 15 July 2026

## Buyer And Outcome

Primary buyer: a small football competition organiser or administrator, including schools, academies, club networks and community tournaments.

Primary outcome: reliable current standings from reviewed match outcomes, without the organiser rebuilding the system for each competition.

## Functional Scope

The product must support:

- competition identity and display preferences, with timezone detected automatically during Result Form setup;
- 4 to 32 teams and up to 20 venues or playing areas;
- up to 200 official fixtures;
- single and double round-robin, multi-group round-robin, simple knockout shell and manual entry;
- fixture dates restricted to every day, weekdays, weekends or one named weekday;
- a minimum calendar-day gap between rounds and an optional return-leg break for Double Round-robin;
- a workbook-specific result Form containing only eligible Scheduled fixtures;
- manager review, approval, rejection, clarification and manager-owned corrections;
- separate submitted Match Status and manager-owned Official Outcome records;
- manager-controlled rescheduling that preserves the earlier postponement audit record;
- derived official results, standings, Reports and validation;
- audit preservation of raw Form responses and incorrect submissions;
- owner-only reset actions with automatic backups;
- owner-only replacement of a missing, binned or unusable Result Form without deleting Result Review history.

## Official Form Requirement

The Form collects match facts only. It does not ask an official for an internal identifier, a correction type, a historical submission reference or a duplicated fixture date.

- Played collects two final scores.
- Walkover selects Home team or Away team.
- Postponed and Abandoned collect reason or context.
- Void is a manager decision in Result Review.

## Result Decision Requirement

Before approval, a corrected resubmission is allowed while the fixture remains eligible. Result Review makes multiple active submissions visible and allows the manager to reject one and approve one.

After approval, the manager controls corrections. Incorrect records are retained for audit rather than deleted.

The manager records Official Outcome separately from the official's Match Status. Abandoned defaults to Postponed for review. Played and Walkover are the only score-bearing outcomes included in official-result counts and standings.

## Reset Requirement

The product offers Clear Match Data - Keep Setup and Reset to Blank Template. Both create a backup, require explicit confirmation and handle the connected Form safely. The least-privilege checkpoint creates the backup through the current workbook and places it in the owner account main My Drive area without requesting access to every Drive file. Reset, Form ownership and populated post-reset operation have passed live QA through Apps Script v0.1.5.0.

## Exclusions

The v0.1.0 product excludes player registration, goal-scorer tracking, Top Scorers reporting, head-to-head ranking, automatic knockout progression, exact-hour recovery optimisation, venue optimisation, disciplinary administration, custom formula rebuilding and unlimited support.

## Presentation Requirement

The workbook and User Manual use Arial as the standard customer-facing font. The Form uses the closest clean Basic sans-serif theme available in Google Forms. Headings, lists, tables and navigation must remain readable at normal working zoom and after document export.

## Reliability Rules

- Fixtures is the official schedule.
- Result Review is the review and decision source.
- Official Results, Standings and Reports are derived outputs.
- Form responses remain raw audit records.
- A fixture leaves Form eligibility after one result becomes Approved.
- A Postponed fixture returns to Form eligibility only after the manager enters a valid new schedule and runs Reschedule Selected Fixture.
- Reset, transfer and Form repair preserve formulas, IDs, validations and audit boundaries.
- Group Round-robin generates every registered group in one draft schedule and never pairs teams from different groups.
- Multi-group output must complete the same round across all groups before advancing to the next round.
- Every Active team must have a non-League group assignment before multi-group generation can proceed.
- Each generated group must contain at least two teams and no group may exceed the round-robin limit of 20 teams.
- The combined generated group schedule must not exceed 200 fixtures.
- Round-robin generation should balance home and away assignments and avoid unnecessarily long repeated home or away runs.
- Match Days must constrain every generated fixture date to the selected permitted days.
- A new round must start no earlier than the configured minimum calendar days after the final fixture date used by the previous round.
- Return Leg Break Days applies only before the second leg of a Double Round-robin.

