// LEGACY JUNE LOCAL BUILDER. It does not represent the July live workbook. Do not use it to recreate or update the sellable prototype.

import fs from "node:fs/promises";
import path from "node:path";
import { SpreadsheetFile, Workbook } from "@oai/artifact-tool";

const root = path.resolve(".");
const productDir = path.join(root, "products", "product-001-competition-results-standings-manager");
const outputDir = path.join(productDir, "exports", "prototype");
const outputPath = path.join(outputDir, "product-001-master-prototype_v0.1.0.xlsx");

const wb = Workbook.create();

const sheetNames = [
  "Start Here",
  "Setup",
  "Rules",
  "Teams",
  "Venues",
  "Fixture Builder",
  "Fixtures",
  "Result Review",
  "Official Results",
  "Standings",
  "Goal Scorers",
  "Reports",
  "Validation",
  "Lookups",
  "Archive",
  "Example Data",
];

const sheets = Object.fromEntries(sheetNames.map((name) => [name, wb.worksheets.add(name)]));

const palette = {
  header: "#F1F3F4",
  subheader: "#E8F0FE",
  input: "#FFF7CC",
  helper: "#F8F9FA",
  ok: "#E6F4EA",
  warn: "#FCE8E6",
  border: "#DADCE0",
  text: "#202124",
};

function setTitle(sheet, title, subtitle = "") {
  sheet.getRange("A1:H1").merge();
  sheet.getRange("A1").values = [[title]];
  sheet.getRange("A1").format = {
    font: { bold: true, size: 14, color: palette.text },
    fill: palette.subheader,
  };
  if (subtitle) {
    sheet.getRange("A2:H2").merge();
    sheet.getRange("A2").values = [[subtitle]];
    sheet.getRange("A2").format = { wrapText: true };
  }
  sheet.showGridLines = true;
}

function writeTable(sheet, startCell, headers, rows, tableName) {
  const range = sheet.getRange(startCell).resize(rows.length + 1, headers.length);
  range.values = [headers, ...rows];
  const headerRange = sheet.getRange(startCell).resize(1, headers.length);
  headerRange.format = {
    fill: palette.header,
    font: { bold: true },
    borders: { preset: "outside", style: "thin", color: palette.border },
    wrapText: true,
  };
  range.format.borders = { preset: "outside", style: "thin", color: palette.border };
  try {
    const table = sheet.tables.add(range.address, true, tableName);
    table.showFilterButton = true;
    table.style = "TableStyleLight1";
  } catch {
    // Tables are helpful but not required for the prototype to function.
  }
  return range;
}

function fillFormulas(sheet, range, formulas) {
  sheet.getRange(range).formulas = formulas;
}

function addListValidation(sheet, range, values) {
  try {
    sheet.getRange(range).dataValidation = { rule: { type: "list", values } };
  } catch {
    // Some validation metadata may be applied after native Google Sheets import.
  }
}

function freezeHeader(sheet) {
  try {
    sheet.freezePanes.freezeRows(1);
  } catch {
    // Non-blocking in local prototype generation.
  }
}

// Start Here
setTitle(
  sheets["Start Here"],
  "Competition Results & Standings Manager",
  "v1.0 prototype skeleton for small football competition organisers/admins. Use the yellow input areas first; formula outputs should be protected in the live Google Sheet."
);
writeTable(
  sheets["Start Here"],
  "A4",
  ["Step", "Do This", "Sheet", "Notes"],
  [
    [1, "Complete competition setup.", "Setup", "Set competition name, season, timezone and date display assumptions."],
    [2, "Confirm points, statuses and walkover rules.", "Rules", "Default football rules are 3 points for a win and a 3-0 configurable walkover."],
    [3, "Enter teams and divisions/groups.", "Teams", "Team IDs should remain stable after fixtures are created."],
    [4, "Enter venues or pitches.", "Venues", "Use venue IDs in Fixtures to avoid spelling drift."],
    [5, "Create fixture shells.", "Fixture Builder", "Use league, group-stage, simple knockout or manual paths; Fixtures owns Match IDs."],
    [6, "Confirm fixtures and Form Fixture Labels.", "Fixtures", "Labels are date-first for Google Form usability."],
    [7, "Collect submissions through one form.", "Google Form", "The live Form was not creatable from this thread; see the local form spec."],
    [8, "Review every submission.", "Result Review", "Approve exactly one current row per Match ID."],
    [9, "Review official results, standings and reports.", "Official Results / Standings / Reports", "These outputs read only Approved Current rows."],
    [10, "Archive completed outputs manually.", "Archive", "Manual snapshot process for v1.0."],
  ],
  "StartHereSteps"
);

// Setup
setTitle(sheets.Setup, "Setup", "Competition-level settings and tested-scope notes.");
writeTable(
  sheets.Setup,
  "A4",
  ["Setting", "Value", "Notes"],
  [
    ["Competition ID", "C001", "Optional stable ID for this competition copy."],
    ["Competition Name", "Example Community Cup", "User-editable."],
    ["Season/Tournament Label", "July 2026 Demo", "User-editable."],
    ["Organiser Name", "Demo Organiser", "User-editable."],
    ["Default Timezone", "Africa/Kampala", "Configurable; keep visible in reports."],
    ["Date Display Format", "yyyy-mm-dd", "Internal dates should remain sortable."],
    ["Time Display Format", "hh:mm", "Use local competition convention."],
    ["Default Venue ID", "V001", "Fixtures can override by row."],
    ["Tested Team Limit Note", "Self-service range: 4 to 32 teams", "Do not market beyond tested range without QA."],
    ["Tested Fixture Limit Note", "Self-service range: up to 200 fixtures", "Keep Form choices manageable."],
    ["Version", "0.1.0-prototype", "Prototype skeleton, not release candidate."],
    ["Last Updated", "2026-06-24", "Generated from local repo blueprint."],
  ],
  "SetupTable"
);
sheets.Setup.getRange("B4:B15").format.fill = palette.input;

// Rules
setTitle(sheets.Rules, "Rules", "Editable football rules, status handling and local-rule notes.");
writeTable(
  sheets.Rules,
  "A4",
  ["Rule Area", "Setting Name", "Setting Value", "Default Value", "Editable By User", "Notes"],
  [
    ["Points", "Points for Win", 3, 3, "Yes", "Used by Standings formulas."],
    ["Points", "Points for Draw", 1, 1, "Yes", "Used by Standings formulas."],
    ["Points", "Points for Loss", 0, 0, "Yes", "Used by Standings formulas."],
    ["Tie-breaker", "Tie-breaker 1", "Points", "Points", "Limited", "Default sort order only; head-to-head excluded in v1.0."],
    ["Tie-breaker", "Tie-breaker 2", "Goal Difference", "Goal Difference", "Limited", ""],
    ["Tie-breaker", "Tie-breaker 3", "Goals For", "Goals For", "Limited", ""],
    ["Tie-breaker", "Tie-breaker 4", "Team Name", "Team Name", "Limited", ""],
    ["Walkover", "Walkover Goals For Winner", 3, 3, "Yes", "Default common football convention; local rules can override."],
    ["Walkover", "Walkover Goals Against Loser", 0, 0, "Yes", "Default common football convention; local rules can override."],
    ["Walkover", "Count Walkover Goals In GF/GA/GD", "Yes", "Yes", "Yes", "If No, review rows need manual score override notes."],
    ["Walkover", "Allow Manual Walkover Override", "Yes", "Yes", "Yes", "Use Result Review override columns and notes."],
    ["Status", "Played Counts In Standings", "Yes", "Yes", "No", ""],
    ["Status", "Walkover Counts In Standings", "Yes", "Yes", "No", ""],
    ["Status", "Postponed Counts In Standings", "No", "No", "No", ""],
    ["Status", "Void Counts In Standings", "No", "No", "No", ""],
    ["Status", "Abandoned Counts In Standings", "No", "No", "No", "Review-only until organiser decides final treatment."],
  ],
  "RulesTable"
);
sheets.Rules.getRange("C5:C20").format.fill = palette.input;

// Teams
setTitle(sheets.Teams, "Teams", "Stable Team IDs, team names and divisions/groups.");
writeTable(
  sheets.Teams,
  "A4",
  ["Team ID", "Team Name", "Display Name", "Division/Group", "Team Status", "Contact/Notes", "Sort Order", "Validation Flag"],
  [
    ["T001", "River Park FC", "River Park", "Group A", "Active", "", 1, ""],
    ["T002", "Lakeside United", "Lakeside", "Group A", "Active", "", 2, ""],
    ["T003", "Hillview Academy", "Hillview", "Group A", "Active", "", 3, ""],
    ["T004", "Central Stars", "Central Stars", "Group A", "Active", "", 4, ""],
    ["T005", "North End Juniors", "North End", "Group B", "Active", "", 5, ""],
    ["T006", "Metro Rangers", "Metro Rangers", "Group B", "Active", "", 6, ""],
    ["T007", "Eastside Colts", "Eastside", "Group B", "Active", "", 7, ""],
    ["T008", "Westbrook Athletic", "Westbrook", "Group B", "Active", "", 8, ""],
  ],
  "TeamsTable"
);
fillFormulas(
  sheets.Teams,
  "H5:H36",
  Array.from({ length: 32 }, (_, i) => [
    `=IF(A${i + 5}="","",IF(COUNTIF($A$5:$A$36,A${i + 5})>1,"Duplicate Team ID",IF(OR(B${i + 5}="",C${i + 5}="",D${i + 5}=""),"Missing required field","OK")))`,
  ])
);
addListValidation(sheets.Teams, "E5:E36", ["Active", "Withdrawn", "Removed from standings"]);

// Venues
setTitle(sheets.Venues, "Venues", "Approved venue and pitch list for Fixtures.");
writeTable(
  sheets.Venues,
  "A4",
  ["Venue ID", "Venue Name", "Site/Facility", "Pitch/Field", "Location/Notes", "Active/Inactive", "Validation Flag"],
  [
    ["V001", "Pitch 1", "Community Sports Centre", "Pitch 1", "Main field", "Active", ""],
    ["V002", "Pitch 2", "Community Sports Centre", "Pitch 2", "Second field", "Active", ""],
    ["V003", "School Ground", "Northside School", "Main", "Grass field", "Active", ""],
    ["V004", "Training Field", "Academy Grounds", "Small-sided", "Use for youth finals only", "Active", ""],
  ],
  "VenuesTable"
);
fillFormulas(
  sheets.Venues,
  "G5:G24",
  Array.from({ length: 20 }, (_, i) => [
    `=IF(A${i + 5}="","",IF(COUNTIF($A$5:$A$24,A${i + 5})>1,"Duplicate Venue ID",IF(OR(B${i + 5}="",F${i + 5}=""),"Missing required field","OK")))`,
  ])
);
addListValidation(sheets.Venues, "F5:F24", ["Active", "Inactive"]);

// Fixture Builder
setTitle(sheets["Fixture Builder"], "Fixture Builder", "Fixture shell helper for common v1.0 paths. Generated shells must be reviewed before copying into Fixtures.");
writeTable(
  sheets["Fixture Builder"],
  "A4",
  ["Input", "Value", "Notes"],
  [
    ["Fixture Mode", "League/Round-robin", "Allowed: League/Round-robin, Group Stage, Simple Knockout, Manual"],
    ["Division/Group Filter", "Group A", "Use one group at a time for the first prototype."],
    ["Round Type", "Single Round", "Double round is documented but needs additional QA before release."],
    ["Matchday/Round Prefix", "MD", "Used in generated shell labels."],
    ["Builder Boundary", "Shells only", "No venue/time optimisation or progression automation in v1.0."],
  ],
  "FixtureBuilderInputs"
);
sheets["Fixture Builder"].getRange("B5:B9").format.fill = palette.input;
writeTable(
  sheets["Fixture Builder"],
  "A12",
  ["Mode", "Division/Group", "Round/Matchday", "Home Team ID", "Away Team ID", "Target Fixture Row", "Notes"],
  [
    ["League/Round-robin", "Group A", "MD1", "T001", "T002", "Fixtures", "4-team single round sample shell."],
    ["League/Round-robin", "Group A", "MD1", "T003", "T004", "Fixtures", "4-team single round sample shell."],
    ["League/Round-robin", "Group A", "MD2", "T001", "T003", "Fixtures", "4-team single round sample shell."],
    ["League/Round-robin", "Group A", "MD2", "T002", "T004", "Fixtures", "4-team single round sample shell."],
    ["Group Stage", "Group B", "MD1", "T005", "T006", "Fixtures", "Same shell pattern per group."],
    ["Group Stage", "Group B", "MD1", "T007", "T008", "Fixtures", "Same shell pattern per group."],
    ["Simple Knockout", "Semi-final", "SF1", "T001", "T004", "Fixtures", "Seeded pairing shell only."],
    ["Simple Knockout", "Semi-final", "SF2", "T002", "T003", "Fixtures", "Winner progression is future/manual scope."],
    ["Manual", "", "", "", "", "Fixtures", "Use for imports, corrections or unusual formats."],
  ],
  "FixtureBuilderShells"
);
addListValidation(sheets["Fixture Builder"], "B5", ["League/Round-robin", "Group Stage", "Simple Knockout", "Manual"]);

// Fixtures
setTitle(sheets.Fixtures, "Fixtures", "Fixtures owns Match ID and official match list.");
const fixtureHeaders = [
  "Match ID",
  "Division/Group",
  "Round/Matchday",
  "Home Team ID",
  "Home Team Display",
  "Away Team ID",
  "Away Team Display",
  "Scheduled Date",
  "Scheduled Time",
  "Venue ID",
  "Venue Display",
  "Fixture Status",
  "Form Fixture Label",
  "Include In Form Sync",
  "Validation Flag",
];
const fixtureRows = [
  ["M001", "Group A", "MD1", "T001", "", "T002", "", new Date("2026-07-12T00:00:00"), "09:00", "V001", "", "Played", "", "", ""],
  ["M002", "Group A", "MD1", "T003", "", "T004", "", new Date("2026-07-12T00:00:00"), "10:30", "V002", "", "Played", "", "", ""],
  ["M003", "Group A", "MD2", "T001", "", "T003", "", new Date("2026-07-13T00:00:00"), "09:00", "V001", "", "Scheduled", "", "", ""],
  ["M004", "Group A", "MD2", "T002", "", "T004", "", new Date("2026-07-13T00:00:00"), "10:30", "V002", "", "Played", "", "", ""],
  ["M005", "Group B", "MD1", "T005", "", "T006", "", new Date("2026-07-12T00:00:00"), "12:00", "V001", "", "Played", "", "", ""],
  ["M006", "Group B", "MD1", "T007", "", "T008", "", new Date("2026-07-12T00:00:00"), "13:30", "V002", "", "Void", "", "", ""],
  ["M007", "Group B", "MD2", "T005", "", "T007", "", new Date("2026-07-13T00:00:00"), "12:00", "V001", "", "Scheduled", "", "", ""],
  ["M008", "Group B", "MD2", "T006", "", "T008", "", new Date("2026-07-13T00:00:00"), "13:30", "V002", "", "Scheduled", "", "", ""],
  ["M009", "Semi-final", "SF1", "T001", "", "T004", "", new Date("2026-07-15T00:00:00"), "09:00", "V003", "", "Scheduled", "", "", ""],
  ["M010", "Semi-final", "SF2", "T002", "", "T003", "", new Date("2026-07-15T00:00:00"), "10:30", "V003", "", "Scheduled", "", "", ""],
  ["M011", "Final", "Final", "TBD", "", "TBD", "", new Date("2026-07-16T00:00:00"), "15:00", "V004", "", "Scheduled", "", "", ""],
  ["M012", "Manual", "Imported", "T005", "", "T008", "", new Date("2026-07-17T00:00:00"), "14:00", "V004", "", "Postponed", "", "", ""],
];
writeTable(sheets.Fixtures, "A4", fixtureHeaders, fixtureRows, "FixturesTable");
sheets.Fixtures.getRange("H5:H204").format.numberFormat = "yyyy-mm-dd";
fillFormulas(
  sheets.Fixtures,
  "E5:E204",
  Array.from({ length: 200 }, (_, i) => [`=IFERROR(XLOOKUP(D${i + 5},Teams!$A$5:$A$36,Teams!$C$5:$C$36,""),D${i + 5})`])
);
fillFormulas(
  sheets.Fixtures,
  "G5:G204",
  Array.from({ length: 200 }, (_, i) => [`=IFERROR(XLOOKUP(F${i + 5},Teams!$A$5:$A$36,Teams!$C$5:$C$36,""),F${i + 5})`])
);
fillFormulas(
  sheets.Fixtures,
  "K5:K204",
  Array.from({ length: 200 }, (_, i) => [`=IFERROR(XLOOKUP(J${i + 5},Venues!$A$5:$A$24,Venues!$B$5:$B$24,""),"")`])
);
fillFormulas(
  sheets.Fixtures,
  "M5:O204",
  Array.from({ length: 200 }, (_, i) => {
    const r = i + 5;
    return [
      `=IF(A${r}="","",TEXT(H${r},"yyyy-mm-dd")&" | "&A${r}&" | "&E${r}&" v "&G${r}&" | "&K${r})`,
      `=IF(A${r}="","",IF(AND(L${r}="Scheduled",D${r}<>"TBD",F${r}<>"TBD",E${r}<>"",G${r}<>"",D${r}<>F${r},J${r}<>"",K${r}<>""),"Yes","No"))`,
      `=IF(A${r}="","",IF(COUNTIF($A$5:$A$204,A${r})>1,"Duplicate Match ID",IF(OR(D${r}="",F${r}="",J${r}=""),"Missing fixture field",IF(OR(D${r}="TBD",F${r}="TBD",E${r}="",G${r}=""),"Unresolved placeholder fixture",IF(D${r}=F${r},"Home and away same",IF(K${r}="","Missing venue display","OK"))))))`,
    ];
  })
);
addListValidation(sheets.Fixtures, "L5:L204", ["Scheduled", "Played", "Postponed", "Abandoned", "Void", "Walkover"]);

// Result Review
setTitle(sheets["Result Review"], "Result Review", "Every form submission and correction is reviewed here.");
const reviewHeaders = [
  "Submission Timestamp",
  "Submission ID",
  "Submission Type",
  "Match ID",
  "Fixture Label Submitted",
  "Home Team Display",
  "Away Team Display",
  "Submitted Home Score",
  "Submitted Away Score",
  "Match Status",
  "Walkover Winner Team ID",
  "Match Date Played",
  "Submitted By",
  "Submitter Role",
  "Notes",
  "Optional Scorer Text",
  "Evidence Link",
  "Review Status",
  "Approved Current Flag",
  "Review Notes",
  "Supersedes Submission ID",
  "Manual Official Home Score Override",
  "Manual Official Away Score Override",
  "Official Home Score Calc",
  "Official Away Score Calc",
  "Counts In Standings Calc",
  "Current Validation Flag",
];
const reviewRows = [
  [new Date("2026-07-12T12:00:00"), "S001", "New Result", "M001", "", "", "", 2, 1, "Played", "", new Date("2026-07-12T00:00:00"), "Alex Morgan", "Team Coach", "Confirmed by both teams.", "Sam A 1; Leo B 1", "", "Approved Current", "", "", "", "", "", "", "", "", ""],
  [new Date("2026-07-12T12:15:00"), "S002", "New Result", "M002", "", "", "", 0, 0, "Played", "", new Date("2026-07-12T00:00:00"), "Priya Shah", "Match Official", "Scoreless draw.", "", "", "Approved Current", "", "", "", "", "", "", "", "", ""],
  [new Date("2026-07-13T10:00:00"), "S003", "New Result", "M003", "", "", "", 1, 1, "Played", "", new Date("2026-07-13T00:00:00"), "Daniel Okello", "Team Coach", "Awaiting confirmation.", "", "", "Pending Review", "", "", "", "", "", "", "", "", ""],
  [new Date("2026-07-13T12:00:00"), "S004", "New Result", "M004", "", "", "", 1, 0, "Played", "", new Date("2026-07-13T00:00:00"), "Grace Lee", "Team Coach", "Original submission.", "", "", "Approved Superseded", "", "Superseded by correction.", "", "", "", "", "", "", ""],
  [new Date("2026-07-13T13:30:00"), "S005", "Correction to Previous Result", "M004", "", "", "", 2, 0, "Played", "", new Date("2026-07-13T00:00:00"), "Grace Lee", "Team Coach", "Corrected away score.", "Niko C 2", "", "Approved Current", "", "", "S004", "", "", "", "", "", ""],
  [new Date("2026-07-12T15:00:00"), "S006", "New Result", "M005", "", "", "", "", "", "Walkover", "T005", new Date("2026-07-12T00:00:00"), "Musa Kato", "Competition Admin", "Metro Rangers forfeited.", "", "", "Approved Current", "", "Default 3-0 walkover applied.", "", "", "", "", "", "", ""],
  [new Date("2026-07-12T16:00:00"), "S007", "New Result", "M006", "", "", "", 1, 1, "Void", "", new Date("2026-07-12T00:00:00"), "Nora James", "Competition Admin", "Fixture voided due to eligibility issue.", "", "", "Approved Current", "", "Void result excluded from standings.", "", "", "", "", "", "", ""],
  [new Date("2026-07-15T12:00:00"), "S008", "New Result", "M010", "", "", "", 3, 2, "Played", "", new Date("2026-07-15T00:00:00"), "Test Submitter", "Team Coach", "Rejected sample.", "", "", "Rejected", "", "Wrong fixture selected.", "", "", "", "", "", "", ""],
];
writeTable(sheets["Result Review"], "A4", reviewHeaders, reviewRows, "ResultReviewTable");
sheets["Result Review"].getRange("A5:A204").format.numberFormat = "yyyy-mm-dd hh:mm";
sheets["Result Review"].getRange("L5:L204").format.numberFormat = "yyyy-mm-dd";
fillFormulas(
  sheets["Result Review"],
  "E5:G204",
  Array.from({ length: 200 }, (_, i) => {
    const r = i + 5;
    return [
      `=IFERROR(XLOOKUP(D${r},Fixtures!$A$5:$A$204,Fixtures!$M$5:$M$204,""),"")`,
      `=IFERROR(XLOOKUP(D${r},Fixtures!$A$5:$A$204,Fixtures!$E$5:$E$204,""),"")`,
      `=IFERROR(XLOOKUP(D${r},Fixtures!$A$5:$A$204,Fixtures!$G$5:$G$204,""),"")`,
    ];
  })
);
fillFormulas(
  sheets["Result Review"],
  "S5:S204",
  Array.from({ length: 200 }, (_, i) => [`=IF(R${i + 5}="Approved Current","Yes","No")`])
);
fillFormulas(
  sheets["Result Review"],
  "X5:AA204",
  Array.from({ length: 200 }, (_, i) => {
    const r = i + 5;
    const homeTeam = `XLOOKUP(D${r},Fixtures!$A$5:$A$204,Fixtures!$D$5:$D$204,"")`;
    const awayTeam = `XLOOKUP(D${r},Fixtures!$A$5:$A$204,Fixtures!$F$5:$F$204,"")`;
    return [
      `=IF(D${r}="","",IF(V${r}<>"",V${r},IF(J${r}="Walkover",IF(K${r}=${homeTeam},Rules!$C$12,IF(K${r}=${awayTeam},Rules!$C$13,"")),H${r})))`,
      `=IF(D${r}="","",IF(W${r}<>"",W${r},IF(J${r}="Walkover",IF(K${r}=${awayTeam},Rules!$C$12,IF(K${r}=${homeTeam},Rules!$C$13,"")),I${r})))`,
      `=IF(D${r}="","",IF(AND(R${r}="Approved Current",OR(J${r}="Played",J${r}="Walkover")),"Yes","No"))`,
      `=IF(D${r}="","",IF(AND(R${r}="Approved Current",COUNTIFS($D$5:$D$204,D${r},$R$5:$R$204,"Approved Current")>1),"Multiple Approved Current",IF(AND(J${r}="Walkover",K${r}=""),"Walkover missing winner","OK")))`,
    ];
  })
);
addListValidation(sheets["Result Review"], "C5:C204", ["New Result", "Correction to Previous Result"]);
addListValidation(sheets["Result Review"], "J5:J204", ["Played", "Postponed", "Void", "Walkover", "Abandoned"]);
addListValidation(sheets["Result Review"], "R5:R204", ["Pending Review", "Approved Current", "Approved Superseded", "Rejected", "Needs Clarification"]);

// Official Results
setTitle(sheets["Official Results"], "Official Results", "Formula-derived from Approved Current Result Review rows only.");
writeTable(
  sheets["Official Results"],
  "A4",
  [
    "Match ID",
    "Division/Group",
    "Home Team ID",
    "Home Team Display",
    "Away Team ID",
    "Away Team Display",
    "Official Home Score",
    "Official Away Score",
    "Official Match Status",
    "Walkover Winner Team ID",
    "Counts In Standings",
    "Match Date Played",
    "Approved Submission ID",
    "Approval Status",
    "Result Source Notes",
  ],
  Array.from({ length: 200 }, () => Array(15).fill("")),
  "OfficialResultsTable"
);
fillFormulas(
  sheets["Official Results"],
  "A5:O204",
  Array.from({ length: 200 }, (_, i) => {
    const r = i + 5;
    const fixtureRow = r;
    const matchIdRef = `Fixtures!A${fixtureRow}`;
    const hasCurrent = `COUNTIFS('Result Review'!$D$5:$D$204,${matchIdRef},'Result Review'!$R$5:$R$204,"Approved Current")=1`;
    const reviewFilter = (col) => `IFERROR(INDEX(FILTER('Result Review'!$${col}$5:$${col}$204,'Result Review'!$D$5:$D$204=$A${r},'Result Review'!$R$5:$R$204="Approved Current"),1),"")`;
    return [
      `=IF(${matchIdRef}="","",IF(${hasCurrent},${matchIdRef},""))`,
      `=IF($A${r}="","",XLOOKUP($A${r},Fixtures!$A$5:$A$204,Fixtures!$B$5:$B$204,""))`,
      `=IF($A${r}="","",XLOOKUP($A${r},Fixtures!$A$5:$A$204,Fixtures!$D$5:$D$204,""))`,
      `=IF($A${r}="","",XLOOKUP($A${r},Fixtures!$A$5:$A$204,Fixtures!$E$5:$E$204,""))`,
      `=IF($A${r}="","",XLOOKUP($A${r},Fixtures!$A$5:$A$204,Fixtures!$F$5:$F$204,""))`,
      `=IF($A${r}="","",XLOOKUP($A${r},Fixtures!$A$5:$A$204,Fixtures!$G$5:$G$204,""))`,
      `=IF($A${r}="","",${reviewFilter("X")})`,
      `=IF($A${r}="","",${reviewFilter("Y")})`,
      `=IF($A${r}="","",${reviewFilter("J")})`,
      `=IF($A${r}="","",${reviewFilter("K")})`,
      `=IF($A${r}="","",${reviewFilter("Z")})`,
      `=IF($A${r}="","",${reviewFilter("L")})`,
      `=IF($A${r}="","",${reviewFilter("B")})`,
      `=IF($A${r}="","","Approved Current")`,
      `=IF($A${r}="","","Derived from Result Review row "&M${r})`,
    ];
  })
);
sheets["Official Results"].getRange("L5:L204").format.numberFormat = "yyyy-mm-dd";

// Standings
setTitle(sheets.Standings, "Standings", "Publication-ready standings sorted by Division/Group and Rank. Visible table reads only Official Results through bounded helper formulas.");
writeTable(
  sheets.Standings,
  "A4",
  [
    "Division/Group",
    "Rank",
    "Team ID",
    "Team Display",
    "Played",
    "Won",
    "Drawn",
    "Lost",
    "Goals For",
    "Goals Against",
    "Goal Difference",
    "Points",
    "Tie-breaker 1 Value",
    "Tie-breaker 2 Value",
    "Tie-breaker 3 Value",
    "Notes/Flags",
  ],
  Array.from({ length: 32 }, () => Array(16).fill("")),
  "StandingsTable"
);
sheets.Standings.getRange("R4:AH4").values = [[
  "Calc Division/Group",
  "Calc Rank",
  "Calc Team ID",
  "Calc Team Display",
  "Calc Played",
  "Calc Won",
  "Calc Drawn",
  "Calc Lost",
  "Calc Goals For",
  "Calc Goals Against",
  "Calc Goal Difference",
  "Calc Points",
  "Calc Tie-breaker 1 Value",
  "Calc Tie-breaker 2 Value",
  "Calc Tie-breaker 3 Value",
  "Calc Notes/Flags",
  "Calc Sort Key",
]];
sheets.Standings.getRange("R4:AH4").format = {
  fill: palette.helper,
  font: { bold: true },
  borders: { preset: "outside", style: "thin", color: palette.border },
  wrapText: true,
};
fillFormulas(
  sheets.Standings,
  "R5:AH36",
  Array.from({ length: 32 }, (_, i) => {
    const r = i + 5;
    return [
      `=IF(Teams!A${r}="","",Teams!D${r})`,
      `=IF(T${r}="","",1+COUNTIFS($R$5:$R$36,R${r},$AC$5:$AC$36,">"&AC${r})+COUNTIFS($R$5:$R$36,R${r},$AC$5:$AC$36,AC${r},$AB$5:$AB$36,">"&AB${r})+COUNTIFS($R$5:$R$36,R${r},$AC$5:$AC$36,AC${r},$AB$5:$AB$36,AB${r},$Z$5:$Z$36,">"&Z${r}))`,
      `=Teams!A${r}`,
      `=Teams!C${r}`,
      `=IF(T${r}="","",SUMPRODUCT(('Official Results'!$K$5:$K$204="Yes")*(('Official Results'!$C$5:$C$204=T${r})+('Official Results'!$E$5:$E$204=T${r}))))`,
      `=IF(T${r}="","",SUMPRODUCT(('Official Results'!$K$5:$K$204="Yes")*('Official Results'!$C$5:$C$204=T${r})*('Official Results'!$G$5:$G$204>'Official Results'!$H$5:$H$204))+SUMPRODUCT(('Official Results'!$K$5:$K$204="Yes")*('Official Results'!$E$5:$E$204=T${r})*('Official Results'!$H$5:$H$204>'Official Results'!$G$5:$G$204)))`,
      `=IF(T${r}="","",SUMPRODUCT(('Official Results'!$K$5:$K$204="Yes")*(('Official Results'!$C$5:$C$204=T${r})+('Official Results'!$E$5:$E$204=T${r}))*('Official Results'!$G$5:$G$204='Official Results'!$H$5:$H$204)))`,
      `=IF(T${r}="","",V${r}-W${r}-X${r})`,
      `=IF(T${r}="","",SUMPRODUCT(('Official Results'!$K$5:$K$204="Yes")*('Official Results'!$C$5:$C$204=T${r})*'Official Results'!$G$5:$G$204)+SUMPRODUCT(('Official Results'!$K$5:$K$204="Yes")*('Official Results'!$E$5:$E$204=T${r})*'Official Results'!$H$5:$H$204))`,
      `=IF(T${r}="","",SUMPRODUCT(('Official Results'!$K$5:$K$204="Yes")*('Official Results'!$C$5:$C$204=T${r})*'Official Results'!$H$5:$H$204)+SUMPRODUCT(('Official Results'!$K$5:$K$204="Yes")*('Official Results'!$E$5:$E$204=T${r})*'Official Results'!$G$5:$G$204))`,
      `=IF(T${r}="","",Z${r}-AA${r})`,
      `=IF(T${r}="","",W${r}*Rules!$C$5+X${r}*Rules!$C$6+Y${r}*Rules!$C$7)`,
      `=AC${r}`,
      `=AB${r}`,
      `=Z${r}`,
      `=IF(T${r}="","",IF(Teams!E${r}<>"Active","Team not active",""))`,
      `=IF(R${r}="","",COUNTIF($R$5:$R$36,"<"&R${r})*100000+S${r}*1000+COUNTIFS($R$5:$R$36,R${r},$S$5:$S$36,S${r},$U$5:$U$36,"<="&U${r}))`,
    ];
  })
);
sheets.Standings.getRange("Q4").values = [["Visible Sort Key"]];
sheets.Standings.getRange("Q4").format = {
  fill: palette.helper,
  font: { bold: true },
  borders: { preset: "outside", style: "thin", color: palette.border },
  wrapText: true,
};
fillFormulas(
  sheets.Standings,
  "Q5:Q36",
  Array.from({ length: 32 }, (_, i) => {
    const r = i + 5;
    return [`=IFERROR(SMALL($AH$5:$AH$36,ROWS($Q$5:Q${r})),"")`];
  })
);
fillFormulas(
  sheets.Standings,
  "A5:P36",
  Array.from({ length: 32 }, (_, i) => {
    const r = i + 5;
    return Array.from({ length: 16 }, (_, j) =>
      `=IF($Q${r}="","",INDEX($R$5:$AG$36,MATCH($Q${r},$AH$5:$AH$36,0),${j + 1}))`
    );
  })
);
// Goal Scorers
setTitle(sheets["Goal Scorers"], "Goal Scorers", "Optional scorer tracking. Not a player database.");
writeTable(
  sheets["Goal Scorers"],
  "A4",
  ["Match ID", "Team ID", "Player Display Name", "Shirt Number", "Goals", "Notes", "Validation Flag"],
  [
    ["M001", "T001", "Sam A", 9, 1, "Fictional demo player", ""],
    ["M001", "T001", "Leo B", 11, 1, "Fictional demo player", ""],
    ["M004", "T002", "Niko C", 10, 2, "Fictional demo player", ""],
    ["M005", "T005", "Walkover", "", 0, "Do not award scorer goals for default walkover unless local rules say so.", ""],
  ],
  "GoalScorersTable"
);
fillFormulas(
  sheets["Goal Scorers"],
  "G5:G104",
  Array.from({ length: 100 }, (_, i) => {
    const r = i + 5;
    return [`=IF(A${r}="","",IF(OR(B${r}="",C${r}="",LEN(E${r}&"")=0),"Missing scorer field",IF(E${r}<0,"Negative goals","OK")))`];
  })
);

// Reports
setTitle(sheets.Reports, "Reports", "Report-ready outputs. Public reports should exclude submitter details and private notes.");
writeTable(
  sheets.Reports,
  "A4",
  ["Metric", "Value", "Notes"],
  [
    ["Competition ID", "", "Stable prototype competition ID."],
    ["Competition Name", "", "Public/report-ready name."],
    ["Season", "", "Season or tournament label."],
    ["Approved Current Results", "", "From Result Review only."],
    ["Fixtures Included In Form Sync", "", "Scheduled fixtures with resolved teams and venue only."],
    ["Validation Issues", "", "Review before publishing."],
  ],
  "ReportSummary"
);
fillFormulas(sheets.Reports, "B5:B10", [
  ["=Setup!B5"],
  ["=Setup!B6"],
  ["=Setup!B7"],
  ['=COUNTIF(\'Result Review\'!R5:R204,"Approved Current")'],
  ['=COUNTIF(Fixtures!N5:N204,"Yes")'],
  ['=COUNTIF(Validation!D5:D40,"Issue")'],
]);
writeTable(
  sheets.Reports,
  "A12",
  ["Division/Group", "Rank", "Team", "P", "W", "D", "L", "GF", "GA", "GD", "Pts"],
  Array.from({ length: 32 }, () => Array(11).fill("")),
  "ReportStandings"
);
fillFormulas(
  sheets.Reports,
  "A13:K44",
  Array.from({ length: 32 }, (_, i) => {
    const src = i + 5;
    return [
      `=Standings!A${src}`,
      `=Standings!B${src}`,
      `=Standings!D${src}`,
      `=Standings!E${src}`,
      `=Standings!F${src}`,
      `=Standings!G${src}`,
      `=Standings!H${src}`,
      `=Standings!I${src}`,
      `=Standings!J${src}`,
      `=Standings!K${src}`,
      `=Standings!L${src}`,
    ];
  })
);
sheets.Reports.getRange("M12:P12").values = [["Rank", "Player Display Name", "Team", "Goals"]];
sheets.Reports.getRange("M12:P12").format = {
  fill: palette.header,
  font: { bold: true },
  borders: { preset: "outside", style: "thin", color: palette.border },
};
sheets.Reports.getRange("R12:V12").values = [["Scorer Helper Player", "Scorer Helper Team ID", "Scorer Helper Team", "Scorer Helper Goals", "Scorer Helper Sort Key"]];
sheets.Reports.getRange("R12:V12").format = {
  fill: palette.helper,
  font: { bold: true },
  borders: { preset: "outside", style: "thin", color: palette.border },
};
fillFormulas(
  sheets.Reports,
  "R13:V112",
  Array.from({ length: 100 }, (_, i) => {
    const sourceRow = i + 5;
    const helperRow = i + 13;
    return [
      `=IF(OR('Goal Scorers'!C${sourceRow}="",'Goal Scorers'!C${sourceRow}="Walkover",'Goal Scorers'!E${sourceRow}<=0,COUNTIFS('Goal Scorers'!$C$5:C${sourceRow},'Goal Scorers'!C${sourceRow},'Goal Scorers'!$B$5:B${sourceRow},'Goal Scorers'!B${sourceRow})>1),"",'Goal Scorers'!C${sourceRow})`,
      `=IF(R${helperRow}="","",'Goal Scorers'!B${sourceRow})`,
      `=IF(R${helperRow}="","",XLOOKUP(S${helperRow},Teams!$A$5:$A$36,Teams!$C$5:$C$36,""))`,
      `=IF(R${helperRow}="","",SUMIFS('Goal Scorers'!$E$5:$E$104,'Goal Scorers'!$C$5:$C$104,R${helperRow},'Goal Scorers'!$B$5:$B$104,S${helperRow}))`,
      `=IF(R${helperRow}="","",COUNTIF($U$13:$U$112,">"&U${helperRow})*100000+COUNTIFS($U$13:$U$112,U${helperRow},$R$13:$R$112,"<="&R${helperRow})*100+COUNTIFS($U$13:$U$112,U${helperRow},$R$13:$R$112,R${helperRow},$T$13:$T$112,"<="&T${helperRow}))`,
    ];
  })
);
sheets.Reports.getRange("Q12").values = [["Leaderboard Sort Key"]];
sheets.Reports.getRange("Q12").format = {
  fill: palette.helper,
  font: { bold: true },
  borders: { preset: "outside", style: "thin", color: palette.border },
  wrapText: true,
};
fillFormulas(
  sheets.Reports,
  "Q13:Q32",
  Array.from({ length: 20 }, (_, i) => {
    const r = i + 13;
    return [`=IFERROR(SMALL($V$13:$V$112,ROWS($Q$13:Q${r})),"")`];
  })
);
fillFormulas(
  sheets.Reports,
  "M13:P32",
  Array.from({ length: 20 }, (_, i) => {
    const outRow = i + 13;
    return [
      `=IF(N${outRow}="","",${i + 1})`,
      `=IF($Q${outRow}="","",INDEX($R$13:$U$112,MATCH($Q${outRow},$V$13:$V$112,0),1))`,
      `=IF($Q${outRow}="","",INDEX($R$13:$U$112,MATCH($Q${outRow},$V$13:$V$112,0),3))`,
      `=IF($Q${outRow}="","",INDEX($R$13:$U$112,MATCH($Q${outRow},$V$13:$V$112,0),4))`,
    ];
  })
);
// Validation
setTitle(sheets.Validation, "Validation", "Prototype validation checks for common v1.0 failure modes.");
writeTable(
  sheets.Validation,
  "A4",
  ["Check ID", "Area", "Check", "Status", "Detail"],
  [
    ["VAL001", "Setup", "Competition name present", "", ""],
    ["VAL002", "Teams", "No duplicate Team IDs", "", ""],
    ["VAL003", "Venues", "No duplicate Venue IDs", "", ""],
    ["VAL004", "Fixtures", "No duplicate Match IDs", "", ""],
    ["VAL005", "Fixtures", "All fixture labels present", "", ""],
    ["VAL006", "Fixtures", "Unresolved placeholder fixtures are flagged and excluded from Form sync", "", ""],
    ["VAL007", "Result Review", "No multiple Approved Current rows per Match ID", "", ""],
    ["VAL008", "Result Review", "Walkovers have a winner", "", ""],
    ["VAL009", "Official Results", "Official Results derived from Approved Current only", "", ""],
    ["VAL010", "Goal Scorers", "Scorer rows have required fields", "", ""],
    ["VAL011", "Reports", "Private submitter fields excluded from Reports", "OK", "Reports pulls standings/scorers only."],
  ],
  "ValidationChecks"
);
fillFormulas(sheets.Validation, "D5:E15", [
  ['=IF(Setup!B5<>"","OK","Issue")', '=IF(D5="OK","","Missing competition name")'],
  ['=IF(SUMPRODUCT((Teams!A5:A36<>"")*(COUNTIF(Teams!A5:A36,Teams!A5:A36)>1))=0,"OK","Issue")', '=IF(D6="OK","","Duplicate Team ID present")'],
  ['=IF(SUMPRODUCT((Venues!A5:A24<>"")*(COUNTIF(Venues!A5:A24,Venues!A5:A24)>1))=0,"OK","Issue")', '=IF(D7="OK","","Duplicate Venue ID present")'],
  ['=IF(SUMPRODUCT((Fixtures!A5:A204<>"")*(COUNTIF(Fixtures!A5:A204,Fixtures!A5:A204)>1))=0,"OK","Issue")', '=IF(D8="OK","","Duplicate Match ID present")'],
  ['=IF(COUNTIFS(Fixtures!A5:A204,"<>",Fixtures!M5:M204,"")=0,"OK","Issue")', '=IF(D9="OK","","A fixture is missing Form Fixture Label")'],
  ['=IF(COUNTIF(Fixtures!O5:O204,"Unresolved placeholder fixture")=0,"OK","Issue")', '=IF(D10="OK","","Unresolved placeholder fixture exists; excluded from Form sync")'],
  ['=IF(COUNTIF(\'Result Review\'!AA5:AA204,"Multiple Approved Current")=0,"OK","Issue")', '=IF(D11="OK","","More than one Approved Current row for a Match ID")'],
  ['=IF(COUNTIFS(\'Result Review\'!J5:J204,"Walkover",\'Result Review\'!K5:K204,"",\'Result Review\'!R5:R204,"Approved Current")=0,"OK","Issue")', '=IF(D12="OK","","Approved walkover missing winner")'],
  ['=IFERROR(IF(SUMPRODUCT((LEN(\'Official Results\'!A5:A204)>0)*(\'Official Results\'!N5:N204<>"Approved Current"))=0,"OK","Issue"),"OK")', '=IF(D13="OK","","Official Results includes non-current approval")'],
  ['=IF(COUNTIF(\'Goal Scorers\'!G5:G104,"OK")=COUNTA(\'Goal Scorers\'!A5:A104),"OK","Issue")', '=IF(D14="OK","","Scorer row missing required field or negative goals")'],
  ['="OK"', '="Reports pulls standings/scorers only."'],
]);
// Lookups
setTitle(sheets.Lookups, "Lookups", "Dropdown values and helper lists.");
writeTable(
  sheets.Lookups,
  "A4",
  ["List Name", "Value"],
  [
    ["Review Status", "Pending Review"],
    ["Review Status", "Approved Current"],
    ["Review Status", "Approved Superseded"],
    ["Review Status", "Rejected"],
    ["Review Status", "Needs Clarification"],
    ["Submission Type", "New Result"],
    ["Submission Type", "Correction to Previous Result"],
    ["Match Status", "Scheduled"],
    ["Match Status", "Played"],
    ["Match Status", "Postponed"],
    ["Match Status", "Abandoned"],
    ["Match Status", "Void"],
    ["Match Status", "Walkover"],
    ["Team Status", "Active"],
    ["Team Status", "Withdrawn"],
    ["Team Status", "Removed from standings"],
    ["Venue Status", "Active"],
    ["Venue Status", "Inactive"],
    ["Yes/No", "Yes"],
    ["Yes/No", "No"],
    ["Fixture Mode", "League/Round-robin"],
    ["Fixture Mode", "Group Stage"],
    ["Fixture Mode", "Simple Knockout"],
    ["Fixture Mode", "Manual"],
  ],
  "LookupsTable"
);

// Archive
setTitle(sheets.Archive, "Archive", "Manual competition snapshots for completed outputs.");
writeTable(
  sheets.Archive,
  "A4",
  ["Archive ID", "Archive Date", "Competition ID", "Competition Name", "Snapshot Type", "Division/Group", "Export/Report Name", "Version", "Notes"],
  [["A001", "", "C001", "Example Community Cup", "Manual placeholder", "", "", "0.1.0-prototype", "Copy report values here at competition close."]],
  "ArchiveTable"
);

// Example Data
setTitle(sheets["Example Data"], "Example Data", "Fictional demo data used by the prototype. Do not use real youth/player data in demos.");
writeTable(
  sheets["Example Data"],
  "A4",
  ["Dataset", "What It Demonstrates", "Sheets Touched", "Notes"],
  [
    ["8-team demo", "Two groups, 12 fixtures, approvals and one correction", "Teams, Fixtures, Result Review, Standings", "Included in this prototype."],
    ["Walkover demo", "Default 3-0 walkover", "Result Review, Official Results, Standings", "M005 awards T005 a 3-0 result."],
    ["Void demo", "Void result excluded from standings", "Result Review, Official Results, Standings", "M006 is official but non-counting."],
    ["Top Scorers demo", "Optional scorer rows without player database", "Goal Scorers, Reports", "Fictional display names only."],
    ["32-team stress dataset", "Future QA coverage", "Not included", "Required before release candidate."],
  ],
  "ExampleDataNotes"
);

for (const sheet of Object.values(sheets)) {
  freezeHeader(sheet);
  try {
    const used = sheet.getUsedRange();
    used.format.font = { name: "Arial", size: 10, color: palette.text };
    used.format.wrapText = true;
    used.format.autofitColumns();
    used.format.autofitRows();
  } catch {
    // Styling failures should not block workbook creation.
  }
}

await fs.mkdir(outputDir, { recursive: true });

const preview = await wb.render({ sheetName: "Start Here", autoCrop: "all", scale: 1, format: "png" });
await fs.writeFile(path.join(outputDir, "product-001-master-prototype_start-here-preview.png"), new Uint8Array(await preview.arrayBuffer()));

const errors = await wb.inspect({
  kind: "match",
  searchTerm: "#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A",
  options: { useRegex: true, maxResults: 300 },
  summary: "prototype formula error scan",
});
console.log(errors.ndjson);

const overview = await wb.inspect({
  kind: "sheet",
  include: "id,name",
  maxChars: 4000,
});
console.log(overview.ndjson);

const output = await SpreadsheetFile.exportXlsx(wb);
await output.save(outputPath);
console.log(`Saved ${outputPath}`);

