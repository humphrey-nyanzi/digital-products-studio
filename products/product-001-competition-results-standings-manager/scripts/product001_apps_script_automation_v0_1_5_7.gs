/** @OnlyCurrentDoc */

/**
 * Football Competition Results and Standings Manager
 * Apps Script automation v0.1.5.7
 */
const PRODUCT001 = {
  setupSheet: 'Setup',
  builderSheet: 'Create Fixtures',
  fixturesSheet: 'Fixtures',
  resultReviewSheet: 'Result Review',
  checksSheet: 'Checks',
  config: {
    formId: 'D17',
    formEditUrl: 'D18',
    formResponseUrl: 'D19',
    formResponseSheet: 'D20',
    formSetupStatus: 'D21',
    formLinkedSpreadsheetId: 'D22',
    lastFormSyncTimestamp: 'D23',
    lastFormSyncStatus: 'D24',
    eligibleFixtureCount: 'D25',
    lastProcessingStatus: 'D26',
    lastProcessedRow: 'D27'
  },
  processingHeaders: [
    'Processing Status',
    'Generated Submission ID',
    'Result Review Row',
    'Processed At',
    'Processing Message'
  ],
  lifecycle: {
    officialStatusColumn: 28,
    walkoverSideColumn: 29,
    officialWalkoverWinnerColumn: 30
  }
};

function onOpen(e) {
  try {
    PRODUCT001_repairCustomerCopyLinks_();
  } catch (err) {
    // Keep the workbook menu available if a legacy copy has a missing sheet.
  }

  try {
    PRODUCT001_hideLinkedFormResponseSheets_();
  } catch (err) {
    // Keep workbook navigation available if a legacy linked Form cannot be inspected.
  }

  const ui = SpreadsheetApp.getUi();
  const resetMenu = ui.createMenu('Reset and Start Fresh')
    .addItem('Clear Match Data - Keep Setup', 'PRODUCT001_clearMatchDataKeepSetup')
    .addItem('Reset to Blank Template', 'PRODUCT001_resetToBlankTemplate');
  const repairMenu = ui.createMenu('Repair Tools')
    .addItem('Replace Result Form', 'PRODUCT001_replaceResultForm')
    .addSeparator()
    .addItem('Process Unread Submissions', 'PRODUCT001_processFormResponses')
    .addItem('Refresh Approved Results', 'PRODUCT001_syncApprovedFixtures')
    .addItem('Repair New Submission Updates', 'PRODUCT001_installFormSubmitTrigger')
    .addItem('Repair Approval Updates', 'PRODUCT001_installApprovalEditTrigger');

  ui.createMenu('Competition Tools')
    .addItem('Set Up Result Form', 'PRODUCT001_installOrRepairForm')
    .addItem('Publish Fixture List', 'PRODUCT001_transferGeneratedFixtures')
    .addItem('Refresh Result Form', 'PRODUCT001_syncResultFormFixtures')
    .addItem('Reschedule Selected Fixture', 'PRODUCT001_rescheduleSelectedFixture')
    .addSeparator()
    .addSubMenu(resetMenu)
    .addSubMenu(repairMenu)
    .addSeparator()
    .addItem('Check Competition Status', 'PRODUCT001_showQaStatus')
    .addToUi();
}

function PRODUCT001_repairCustomerCopyLinks_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const setup = ss.getSheetByName(PRODUCT001.setupSheet);
  if (setup) {
    setup.hideRows(8);
    const linkedSpreadsheetId = String(
      setup.getRange(PRODUCT001.config.formLinkedSpreadsheetId).getValue()
    ).trim();
    if (linkedSpreadsheetId && linkedSpreadsheetId !== ss.getId()) {
      setup.getRange('D17:D27').clearContent();
    }
  }

  const navigationLinks = [
    ['Start Here', 'E12', 'Setup'],
    ['Start Here', 'E13', 'Teams'],
    ['Start Here', 'E14', 'Venues'],
    ['Start Here', 'E15', 'Create Fixtures'],
    ['Start Here', 'E17', 'Fixtures'],
    ['Start Here', 'E20', 'Result Review'],
    ['Start Here', 'E21', 'Reports'],
    ['Start Here', 'E24', 'Fixtures'],
    ['Start Here', 'E36', 'Setup'],
    ['Setup', 'A1', 'Start Here'],
    ['Setup', 'E1', 'Teams'],
    ['Setup', 'B32', 'Start Here'],
    ['Setup', 'D32', 'Teams'],
    ['Teams', 'A1', 'Setup'],
    ['Teams', 'H1', 'Venues'],
    ['Teams', 'B37', 'Setup'],
    ['Teams', 'H37', 'Venues'],
    ['Venues', 'A1', 'Teams'],
    ['Venues', 'G1', 'Create Fixtures'],
    ['Venues', 'A25', 'Teams'],
    ['Venues', 'G25', 'Create Fixtures'],
    ['Create Fixtures', 'A1', 'Venues'],
    ['Create Fixtures', 'J1', 'Fixtures'],
    ['Create Fixtures', 'E5', 'Fixtures'],
    ['Fixtures', 'A1', 'Create Fixtures'],
    ['Fixtures', 'I1', 'Result Review'],
    ['Result Review', 'B1', 'Fixtures'],
    ['Result Review', 'I1', 'Reports'],
    ['Reports', 'B1', 'Result Review'],
    ['Reports', 'J1', 'Start Here'],
    ['Reports', 'I7', 'Checks'],
    ['Checks', 'A3', 'Reports']
  ];

  navigationLinks.forEach(function(link) {
    const sourceSheet = ss.getSheetByName(link[0]);
    const targetSheet = ss.getSheetByName(link[2]);
    if (!sourceSheet || !targetSheet) return;

    const cell = sourceSheet.getRange(link[1]);
    const label = String(cell.getDisplayValue() || link[2]).replace(/"/g, '""');
    const formula = '=HYPERLINK("#gid=' + targetSheet.getSheetId() + '","' + label + '")';
    if (cell.getFormula() !== formula) cell.setFormula(formula);
  });

  const fixtures = ss.getSheetByName(PRODUCT001.fixturesSheet);
  if (fixtures) {
    const formLinkFormula = '=IF(Setup!D19="","Set up the Result Form first",HYPERLINK(Setup!D19,"Open Result Form"))';
    if (fixtures.getRange('F1').getFormula() !== formLinkFormula) {
      fixtures.getRange('F1').setFormula(formLinkFormula);
    }
  }
}

function PRODUCT001_installOrRepairForm() {
  ScriptApp.requireScopes(ScriptApp.AuthMode.FULL, [
    'https://www.googleapis.com/auth/spreadsheets.currentonly',
    'https://www.googleapis.com/auth/forms',
    'https://www.googleapis.com/auth/script.scriptapp'
  ]);

  const html = HtmlService.createHtmlOutput(
    '<!doctype html><html><body style="font-family:Arial,sans-serif;padding:18px;color:#1e2838">' +
      '<p id="status">Setting the workbook timezone and preparing the Result Form...</p>' +
      '<script>' +
        'const timeZone = Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";' +
        'google.script.run.withSuccessHandler(function(){google.script.host.close();})' +
          '.withFailureHandler(function(error){document.getElementById("status").textContent = "Setup could not finish: " + error.message;})' +
          '.PRODUCT001_completeResultFormSetup(timeZone);' +
      '</script></body></html>'
  ).setWidth(440).setHeight(150);

  SpreadsheetApp.getUi().showModalDialog(html, 'Setting up the Result Form');
}

function PRODUCT001_completeResultFormSetup(timeZone) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  const detectedTimeZone = String(timeZone || '').trim();

  if (detectedTimeZone) {
    try {
      ss.setSpreadsheetTimeZone(detectedTimeZone);
    } catch (err) {
      // Keep the workbook timezone when the browser returns an unsupported value.
    }
  }

  setup.getRange('D8').setValue(ss.getSpreadsheetTimeZone());
  setup.hideRows(8);
  PRODUCT001_installOrRepairFormCore_();
}

function PRODUCT001_installOrRepairFormCore_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  PRODUCT001_repairCustomerCopyLinks_();
  PRODUCT001_applyMatchLifecycleUpgrade_();
  const existingId = String(setup.getRange(PRODUCT001.config.formId).getValue()).trim();
  let form = PRODUCT001_getUsableLinkedForm_(existingId, ss);

  if (!form) {
    form = FormApp.create('Football Match Result Submission');
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  }

  PRODUCT001_buildCanonicalFormItems_(form);
  const responseSheet = PRODUCT001_findResponseSheetForForm_(ss, form);
  PRODUCT001_hideLinkedFormResponseSheets_();

  setup.getRange(PRODUCT001.config.formId).setValue(form.getId());
  setup.getRange(PRODUCT001.config.formEditUrl).setValue(form.getEditUrl());
  setup.getRange(PRODUCT001.config.formResponseUrl).setValue(form.getPublishedUrl());
  setup.getRange(PRODUCT001.config.formResponseSheet).setValue(responseSheet.getName());
  setup.getRange(PRODUCT001.config.formSetupStatus).setValue('Published');
  setup.getRange(PRODUCT001.config.formLinkedSpreadsheetId).setValue(ss.getId());

  PRODUCT001_prepareResponseProcessingColumns_();
  PRODUCT001_installFormSubmitTrigger();
  PRODUCT001_installApprovalEditTrigger();
  PRODUCT001_syncApprovedFixtures(false);
  PRODUCT001_syncResultFormFixtures();

  SpreadsheetApp.getUi().alert('The Result Form is ready. Share it after the fixture list has been published and checked.');
}

function PRODUCT001_replaceResultForm() {
  const ui = SpreadsheetApp.getUi();
  const firstDecision = ui.alert(
    'Replace the Result Form?',
    'Use this only when the current Result Form is missing, in the bin or unusable. A new Form and response sheet will be created. Existing Result Review records will be kept. The old Form will not be deleted automatically.',
    ui.ButtonSet.YES_NO
  );
  if (firstDecision !== ui.Button.YES) {
    ui.alert('Form replacement cancelled. No workbook data was changed.');
    return;
  }

  const typed = ui.prompt(
    'Typed confirmation required',
    'Type exactly: REPLACE RESULT FORM',
    ui.ButtonSet.OK_CANCEL
  );
  if (typed.getSelectedButton() !== ui.Button.OK || typed.getResponseText().trim() !== 'REPLACE RESULT FORM') {
    ui.alert('Form replacement cancelled. The confirmation text did not match.');
    return;
  }

  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  const existingId = String(setup.getRange(PRODUCT001.config.formId).getValue()).trim();
  if (existingId) {
    try {
      FormApp.openById(existingId).setAcceptingResponses(false);
    } catch (err) {
      // Continue when the previous Form is missing or no longer accessible.
    }
  }

  setup.getRange('D17:D27').clearContent();
  PRODUCT001_installOrRepairForm();
}

function PRODUCT001_transferGeneratedFixtures() {
  const ui = SpreadsheetApp.getUi();
  const builder = PRODUCT001_getSheet_(PRODUCT001.builderSheet);
  const fixtures = PRODUCT001_getSheet_(PRODUCT001.fixturesSheet);
  const responses = PRODUCT001_getResponseSheet_();
  const review = PRODUCT001_getSheet_(PRODUCT001.resultReviewSheet);
  const status = String(builder.getRange('D16').getDisplayValue()).trim();
  const count = Number(builder.getRange('D14').getValue());

  if (status !== 'Ready to review') {
    ui.alert('The fixture schedule is not ready. Current status: ' + status);
    return;
  }
  if (!count || count < 1) {
    ui.alert('No fixtures are available to publish.');
    return;
  }
  if (count > 200) {
    ui.alert('Publishing stopped. This schedule exceeds the limit of 200 fixtures.');
    return;
  }

  const activity = PRODUCT001_getMatchActivitySummary_();
  if (activity.totalRows > 0) {
    ui.alert(
      'Publishing stopped',
      'Results or submissions already exist for this competition. To replace the fixture list, first use Competition Tools > Reset and Start Fresh > Clear Match Data - Keep Setup.',
      ui.ButtonSet.OK
    );
    return;
  }

  const officialRange = fixtures.getRange(5, 2, 200, 8);
  const existingCount = officialRange.getValues().filter(function(row) {
    return row.some(function(value) { return value !== ''; });
  }).length;

  if (existingCount > 0) {
    const decision = ui.alert(
      'Replace the current fixture list?',
      'This will replace ' + existingCount + ' existing fixture(s) with ' + count + ' newly created fixture(s). Use this only before result submissions begin. Continue?',
      ui.ButtonSet.YES_NO
    );
    if (decision !== ui.Button.YES) {
      ui.alert('Publishing cancelled. The current fixture list was not changed.');
      return;
    }
  }

  const values = builder.getRange(18, 4, count, 8).getValues();
  officialRange.clearContent();
  fixtures.getRange(5, 2, count, 8).setValues(values);
  SpreadsheetApp.flush();

  let syncMessage = '';
  try {
    const synced = PRODUCT001_syncResultFormFixtures(false);
    syncMessage = '\nThe Result Form now contains ' + synced + ' open fixture(s).';
  } catch (err) {
    syncMessage = '\nThe fixture list was replaced, but the Result Form could not be refreshed: ' + err.message;
  }

  ui.alert('Published ' + count + ' fixture(s) to the official fixture list.' + syncMessage);
}


function PRODUCT001_applyMatchLifecycleUpgrade_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const review = PRODUCT001_getSheet_(PRODUCT001.resultReviewSheet);
  const fixtures = PRODUCT001_getSheet_(PRODUCT001.fixturesSheet);
  const officialResults = PRODUCT001_getSheet_('Official Results');
  const reports = PRODUCT001_getSheet_('Reports');
  const rows = 200;
  PRODUCT001_applyReviewLanguage_(review, rows);
  const officialStatusColumn = PRODUCT001.lifecycle.officialStatusColumn;
  const walkoverSideColumn = PRODUCT001.lifecycle.walkoverSideColumn;
  const officialWinnerColumn = PRODUCT001.lifecycle.officialWalkoverWinnerColumn;

  if (review.getMaxColumns() < officialWinnerColumn) {
    review.insertColumnsAfter(review.getMaxColumns(), officialWinnerColumn - review.getMaxColumns());
  }

  review.getRange(4, officialStatusColumn, 1, 3).setValues([[
    'Official Outcome',
    'Award Walkover To',
    'Official Walkover Winner ID'
  ]]);
  review.getRange(4, officialStatusColumn, 1, 2).setNotes([[
    'Choose the result that should become official. An abandoned report starts as Postponed unless the competition rules require another outcome.',
    'Use only when Official Outcome is Walkover. Choose Home team or Away team.'
  ]]);

  const outcomeValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Played', 'Walkover', 'Postponed', 'Void'], true)
    .setAllowInvalid(false)
    .setHelpText('Choose the official outcome. An abandoned report normally becomes Postponed unless the competition rules require another outcome.')
    .build();
  const sideValidation = SpreadsheetApp.newDataValidation()
    .requireValueInList(['Home team', 'Away team'], true)
    .setAllowInvalid(false)
    .setHelpText('Choose the side awarded the walkover. Leave blank unless the official outcome is Walkover.')
    .build();
  review.getRange(5, officialStatusColumn, rows, 1).setDataValidation(outcomeValidation);
  review.getRange(5, walkoverSideColumn, rows, 1).setDataValidation(sideValidation);

  const fixtureRows = fixtures.getRange(5, 1, rows, 11).getDisplayValues();
  const fixtureById = {};
  fixtureRows.forEach(function(row) {
    if (row[0]) {
      fixtureById[row[0]] = {homeTeamId: row[9], awayTeamId: row[10]};
    }
  });

  const reviewRows = review.getRange(5, 1, rows, walkoverSideColumn).getDisplayValues();
  const outcomeValues = [];
  const sideValues = [];
  reviewRows.forEach(function(row) {
    const matchId = String(row[3] || '').trim();
    const submittedStatus = String(row[9] || '').trim();
    const submittedWinner = String(row[10] || '').trim();
    let outcome = String(row[officialStatusColumn - 1] || '').trim();
    let side = String(row[walkoverSideColumn - 1] || '').trim();

    if (outcome === 'Abandoned') {
      outcome = 'Postponed';
    }
    if (matchId && !outcome) {
      outcome = PRODUCT001_defaultCompetitionOutcome_(submittedStatus);
    }
    if (matchId && outcome === 'Walkover' && !side) {
      const fixture = fixtureById[matchId];
      if (fixture && submittedWinner === fixture.homeTeamId) {
        side = 'Home team';
      } else if (fixture && submittedWinner === fixture.awayTeamId) {
        side = 'Away team';
      }
    }
    outcomeValues.push([outcome]);
    sideValues.push([side]);
  });
  review.getRange(5, officialStatusColumn, rows, 1).setValues(outcomeValues);
  review.getRange(5, walkoverSideColumn, rows, 1).setValues(sideValues);

  const officialWinnerFormulas = [];
  const homeScoreFormulas = [];
  const awayScoreFormulas = [];
  const eligibilityFormulas = [];
  const checkFormulas = [];
  const officialStatusFormulas = [];
  const officialWinnerResultFormulas = [];
  for (let row = 5; row <= 204; row++) {
    officialWinnerFormulas.push([`=IF(D${row}="","",IF(AB${row}<>"Walkover","",IF(AC${row}="Home team",XLOOKUP(D${row},Fixtures!$A$5:$A$204,Fixtures!$J$5:$J$204,""),IF(AC${row}="Away team",XLOOKUP(D${row},Fixtures!$A$5:$A$204,Fixtures!$K$5:$K$204,""),K${row}))))`]);
    homeScoreFormulas.push([`=IF(D${row}="","",IF(V${row}<>"",V${row},IF(AB${row}="Walkover",IF(AD${row}=XLOOKUP(D${row},Fixtures!$A$5:$A$204,Fixtures!$J$5:$J$204,""),Rules!$C$12,IF(AD${row}=XLOOKUP(D${row},Fixtures!$A$5:$A$204,Fixtures!$K$5:$K$204,""),Rules!$C$13,"")),H${row})))`]);
    awayScoreFormulas.push([`=IF(D${row}="","",IF(W${row}<>"",W${row},IF(AB${row}="Walkover",IF(AD${row}=XLOOKUP(D${row},Fixtures!$A$5:$A$204,Fixtures!$K$5:$K$204,""),Rules!$C$12,IF(AD${row}=XLOOKUP(D${row},Fixtures!$A$5:$A$204,Fixtures!$J$5:$J$204,""),Rules!$C$13,"")),I${row})))`]);
    eligibilityFormulas.push([`=IF(D${row}="","",IF(AND(R${row}="Approved",OR(AB${row}="Played",AB${row}="Walkover")),"Yes","No"))`]);
    checkFormulas.push([`=IF(D${row}="","",IF(AND(R${row}="Approved",AB${row}=""),"Select official outcome",IF(AND(R${row}="Approved",AB${row}="Played",OR(X${row}="",Y${row}="")),"Official score required",IF(AND(R${row}="Approved",AB${row}="Walkover",AD${row}=""),"Walkover missing winner",IF(AND(R${row}="Approved",COUNTIFS($D$5:$D$204,D${row},$R$5:$R$204,"Approved")>1),"Multiple approved results",IF(AND(OR(R${row}="Pending",R${row}="Needs Clarification",R${row}="Approved"),SUM(COUNTIFS($D$5:$D$204,D${row},$R$5:$R$204,{"Pending","Needs Clarification","Approved"}))>1),IF(ROW()=MAX(FILTER(ROW($D$5:$D$204),$D$5:$D$204=D${row},(($R$5:$R$204="Pending")+($R$5:$R$204="Needs Clarification")+($R$5:$R$204="Approved"))>0)),"Multiple submissions - newest","Multiple submissions - earlier"),"OK"))))))`]);
    officialStatusFormulas.push([`=IF($A${row}="","",IFERROR(INDEX(FILTER('Result Review'!$AB$5:$AB$204,'Result Review'!$D$5:$D$204=$A${row},'Result Review'!$R$5:$R$204="Approved"),1),""))`]);
    officialWinnerResultFormulas.push([`=IF($A${row}="","",IFERROR(INDEX(FILTER('Result Review'!$AD$5:$AD$204,'Result Review'!$D$5:$D$204=$A${row},'Result Review'!$R$5:$R$204="Approved"),1),""))`]);
  }
  review.getRange(5, officialWinnerColumn, rows, 1).setFormulas(officialWinnerFormulas);
  review.getRange(5, 24, rows, 1).setFormulas(homeScoreFormulas);
  review.getRange(5, 25, rows, 1).setFormulas(awayScoreFormulas);
  review.getRange(5, 26, rows, 1).setFormulas(eligibilityFormulas);
  review.getRange(5, 27, rows, 1).setFormulas(checkFormulas);
  officialResults.getRange(5, 9, rows, 1).setFormulas(officialStatusFormulas);
  officialResults.getRange(5, 10, rows, 1).setFormulas(officialWinnerResultFormulas);

  review.getRange(4, officialStatusColumn, 1, 2)
    .setBackground('#1E4F77')
    .setFontColor('#FFFFFF')
    .setFontWeight('bold');
  review.getRange(4, officialWinnerColumn, 1, 1)
    .setBackground('#E7E6E6')
    .setFontColor('#666666')
    .setFontWeight('bold');
  review.getRange(5, officialStatusColumn, rows, 2).setBackground('#FFF2CC');
  review.getRange(5, officialWinnerColumn, rows, 1).setBackground('#E7E6E6');
  review.setColumnWidth(officialStatusColumn, 170);
  review.setColumnWidth(walkoverSideColumn, 150);
  review.setColumnWidth(officialWinnerColumn, 150);
  review.hideColumns(11);
  review.hideColumns(officialWinnerColumn);

  reports.getRange('B4').setValue('Approved Results');
  reports.getRange('B5').setFormula('=COUNTIF(\'Result Review\'!$Z$5:$Z$204,"Yes")');
  reports.getRange('D4').setValue('Open Fixtures');
  const checks = PRODUCT001_getSheet_(PRODUCT001.checksSheet);
  checks.getRange('C14').setValue('Approved results pass the review checks');
  checks.getRange('D14').setFormula('=IF(COUNTIFS(\'Result Review\'!$D$5:$D$204,"<>",\'Result Review\'!$AA$5:$AA$204,"<>OK")=0,"OK","Issue")');
  checks.getRange('E14').setFormula('=IF(D14="OK","","Check Result Review for an outcome, official score, walkover winner or duplicate submission issue")');
  checks.getRange('C15').setValue('Approved walkovers have an awarded side');
  checks.getRange('D15').setFormula('=IF(COUNTIFS(\'Result Review\'!$AB$5:$AB$204,"Walkover",\'Result Review\'!$AD$5:$AD$204,"",\'Result Review\'!$R$5:$R$204,"Approved")=0,"OK","Issue")');
  checks.getRange('E15').setFormula('=IF(D15="OK","","Choose Home team or Away team in Result Review for the approved walkover")');
}

function PRODUCT001_applyReviewLanguage_(review, rows) {
  const decisionRange = review.getRange(5, 18, rows, 1);
  const replacements = {
    'Pending Review': 'Pending',
    'Approved Current': 'Approved',
    'Approved Superseded': 'Replaced'
  };
  const decisions = decisionRange.getValues().map(function(row) {
    const current = String(row[0] || '').trim();
    return [replacements[current] || row[0]];
  });
  decisionRange.setValues(decisions);
  decisionRange.setDataValidation(
    SpreadsheetApp.newDataValidation()
      .requireValueInList(['Pending', 'Approved', 'Replaced', 'Needs Clarification', 'Rejected'], true)
      .setAllowInvalid(false)
      .setHelpText('Choose Approved for the result that should count. Use Replaced when a newer approved entry takes its place.')
      .build()
  );
  review.getRange('R4').setValue('Review Decision').setNote('Approved is the result used by Fixtures, standings and reports. Use Replaced when a newer approved entry takes its place.');
  review.getRange('T4').setValue('Decision Notes').setNote('Record the reason for a rejection, replacement, clarification request or official score change.');
  review.getRange('U4').setValue('Earlier Submission').setNote('Optional. Enter the earlier Submission ID when this entry replaces another submission.');
  review.getRange('V4').setValue('Official Home Score').setNote('Leave blank unless the approved home score must differ from the submitted score.');
  review.getRange('W4').setValue('Official Away Score').setNote('Leave blank unless the approved away score must differ from the submitted score.');
}
function PRODUCT001_defaultCompetitionOutcome_(submittedStatus) {
  switch (String(submittedStatus || '').trim()) {
    case 'Played':
    case 'Walkover':
    case 'Postponed':
    case 'Void':
      return submittedStatus;
    case 'Abandoned':
      return 'Postponed';
    default:
      return '';
  }
}

function PRODUCT001_normalizeWalkoverSide_(value) {
  const answer = String(value || '').trim();
  if (/^Home team/i.test(answer)) {
    return 'Home team';
  }
  if (/^Away team/i.test(answer)) {
    return 'Away team';
  }
  return '';
}
function PRODUCT001_rescheduleSelectedFixture() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const fixtures = PRODUCT001_getSheet_(PRODUCT001.fixturesSheet);
  const review = PRODUCT001_getSheet_(PRODUCT001.resultReviewSheet);
  const activeRange = ss.getActiveRange();
  const ui = SpreadsheetApp.getUi();

  if (!activeRange || activeRange.getSheet().getName() !== PRODUCT001.fixturesSheet) {
    ui.alert('Select one postponed fixture row in Fixtures, update its new date, time and venue, then run this action again.');
    return;
  }
  const fixtureRow = activeRange.getRow();
  if (fixtureRow < 5 || fixtureRow > 204) {
    ui.alert('Select one postponed fixture row between rows 5 and 204.');
    return;
  }

  const fixture = fixtures.getRange(fixtureRow, 1, 1, 15).getDisplayValues()[0];
  const matchId = String(fixture[0] || '').trim();
  if (!matchId || fixture[8] !== 'Postponed') {
    ui.alert('This action is only for a fixture currently marked Postponed. Resolve an abandoned report to Postponed in Result Review before rescheduling it.');
    return;
  }
  if ([fixture[1], fixture[2], fixture[3], fixture[4], fixture[5], fixture[6], fixture[7]].some(function(value) { return !String(value || '').trim(); })) {
    ui.alert('Complete the group or stage, round, teams, new date, time and venue before rescheduling this fixture.');
    return;
  }

  const reviewValues = review.getRange(5, 1, 200, PRODUCT001.lifecycle.walkoverSideColumn).getDisplayValues();
  const currentRows = [];
  reviewValues.forEach(function(row, index) {
    if (String(row[3] || '').trim() === matchId && row[17] === 'Approved' && row[27] === 'Postponed') {
      currentRows.push(index + 5);
    }
  });
  if (currentRows.length !== 1) {
    ui.alert('Rescheduling stopped. Approve one postponement for this fixture before reopening it.');
    return;
  }

  fixtures.getRange(fixtureRow, 9).setValue('Scheduled');
  SpreadsheetApp.flush();
  const fixtureCheck = String(fixtures.getRange(fixtureRow, 15).getDisplayValue()).trim();
  if (!(fixtureCheck === 'OK' || fixtureCheck.indexOf('Warning') === 0)) {
    fixtures.getRange(fixtureRow, 9).setValue('Postponed');
    ui.alert('Reschedule stopped. Fix this fixture before reopening it: ' + fixtureCheck);
    return;
  }

  const reviewRow = currentRows[0];
  const notesCell = review.getRange(reviewRow, 20);
  const existingNotes = String(notesCell.getValue() || '').trim();
  const timestamp = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'd MMM yyyy HH:mm');
  notesCell.setValue((existingNotes ? existingNotes + '\n' : '') + 'Postponement superseded when fixture was rescheduled on ' + timestamp + '.');
  review.getRange(reviewRow, 18).setValue('Replaced');

  const synced = PRODUCT001_syncResultFormFixtures(false);
  ui.alert('Fixture ' + matchId + ' has been rescheduled and returned to the Result Form. The earlier postponement remains in Result Review as Replaced. The Form now contains ' + synced + ' open fixture(s).');
}
function PRODUCT001_clearMatchDataKeepSetup() {
  PRODUCT001_runReset_({
    mode: 'MATCH_ONLY',
    title: 'Clear match data and keep setup?',
    warning: 'This permanently clears fixtures, Form submissions and Result Review history. Competition details, teams, venues and Create Fixtures settings will be kept. A timestamped backup is created first.',
    confirmation: 'CLEAR MATCH DATA'
  });
}

function PRODUCT001_resetToBlankTemplate() {
  PRODUCT001_runReset_({
    mode: 'FULL',
    title: 'Reset workbook to a blank template?',
    warning: 'This permanently clears competition details, teams, venues, fixtures and result history, then restores the standard points and walkover settings. Workbook calculations and the connected Form are kept. A timestamped backup is created first.',
    confirmation: 'RESET TO BLANK'
  });
}

function PRODUCT001_runReset_(options) {
  const ui = SpreadsheetApp.getUi();
  const firstDecision = ui.alert(
    options.title,
    options.warning + '\n\nThis action cannot be undone in the current workbook. Continue?',
    ui.ButtonSet.YES_NO
  );
  if (firstDecision !== ui.Button.YES) {
    ui.alert('Reset cancelled. No workbook data was changed.');
    return;
  }

  const typed = ui.prompt(
    'Typed confirmation required',
    'Type exactly: ' + options.confirmation,
    ui.ButtonSet.OK_CANCEL
  );
  if (typed.getSelectedButton() !== ui.Button.OK || typed.getResponseText().trim() !== options.confirmation) {
    ui.alert('Reset cancelled. The confirmation text did not match.');
    return;
  }

  const lock = LockService.getDocumentLock();
  if (!lock.tryLock(30000)) {
    ui.alert('Reset could not start because another workbook action is running. Try again after it finishes.');
    return;
  }

  let backup = null;
  try {
    backup = PRODUCT001_createBackup_(options.mode);
    PRODUCT001_clearMatchData_();
    if (options.mode === 'FULL') {
      PRODUCT001_clearSetupData_();
    }
    let formWarning = '';
    try {
      PRODUCT001_closeFormAfterReset_();
    } catch (formErr) {
      formWarning = '\n\nForm warning: ' + formErr.message + '\nThe workbook reset is complete, but the Result Form needs to be refreshed or set up again before use.';
      PRODUCT001_getSheet_(PRODUCT001.setupSheet)
        .getRange(PRODUCT001.config.formSetupStatus)
        .setValue('Reset complete - Form check required');
    }
    SpreadsheetApp.flush();

    const resetLabel = options.mode === 'FULL' ? 'Blank-template reset' : 'Match-data reset';
    ui.alert(
      resetLabel + ' completed',
      'The reset is complete. Backup created:\n' + backup.getName() + '\n' + backup.getUrl() + '\n\nThe Result Form is closed until valid Scheduled fixtures are published or entered and the Form is refreshed.' + formWarning,
      ui.ButtonSet.OK
    );
  } catch (err) {
    const backupMessage = backup ? '\nBackup: ' + backup.getUrl() : '\nNo backup was created.';
    ui.alert(
      'Reset stopped',
      'The reset did not complete: ' + err.message + backupMessage + '\nReview the workbook before continuing.',
      ui.ButtonSet.OK
    );
    throw err;
  } finally {
    lock.releaseLock();
  }
}

function PRODUCT001_createBackup_(mode) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  const competitionName = String(setup.getRange('D5').getDisplayValue()).trim() || 'Unnamed Competition';
  const season = String(setup.getRange('D6').getDisplayValue()).trim() || 'No Season';
  const modeLabel = mode === 'FULL' ? 'Before Blank Reset' : 'Before Match Data Reset';
  const timestamp = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'yyyyMMdd-HHmmss');
  const backupName = PRODUCT001_safeFileName_(ss.getName() + ' - ' + competitionName + ' - ' + season + ' - ' + modeLabel + ' - ' + timestamp);
  return ss.copy(backupName);
}

function PRODUCT001_clearMatchData_() {
  const fixtures = PRODUCT001_getSheet_(PRODUCT001.fixturesSheet);
  const review = PRODUCT001_getSheet_(PRODUCT001.resultReviewSheet);
  const responses = PRODUCT001_getResponseSheet_();
  const scorers = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Goal Scorers');

  PRODUCT001_deleteConnectedFormResponses_();

  if (responses.getMaxRows() > 1) {
    responses.getRange(2, 1, responses.getMaxRows() - 1, responses.getMaxColumns()).clearContent();
  }

  fixtures.getRange('B5:I204').clearContent();
  fixtures.getRange('A5:P204').sort({column: 16, ascending: true});

  review.getRange('A5:D204').clearContent();
  review.getRange('H5:R204').clearContent();
  review.getRange('T5:W204').clearContent();
  review.getRange('AB5:AC204').clearContent();

  if (scorers) {
    scorers.getRange(5, 1, scorers.getMaxRows() - 4, 6).clearContent();
  }

  PRODUCT001_resetProcessingMetadata_();
}

function PRODUCT001_clearSetupData_() {
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  const teams = PRODUCT001_getSheet_('Teams');
  const venues = PRODUCT001_getSheet_('Venues');
  const rules = PRODUCT001_getSheet_('Rules');
  const builder = PRODUCT001_getSheet_(PRODUCT001.builderSheet);

  setup.getRange('D5:D7').clearContent();
  setup.getRange('D8').setValue(SpreadsheetApp.getActiveSpreadsheet().getSpreadsheetTimeZone());
  setup.getRange('D9:D11').clearContent();
  setup.getRange('D16').clearContent();
  setup.hideRows(8);
  teams.getRange('C5:G36').clearContent();
  venues.getRange('B5:F24').clearContent();
  builder.getRange('D5:D9').setValues([
    [''],
    ['All Active Teams'],
    [''],
    [1],
    ['MD']
  ]);
  builder.getRange('D11').setValue('Every day');
  builder.getRange('H5:H11').setValues([
    [1],
    [9 / 24],
    [''],
    [''],
    [''],
    ['One match at a time'],
    [0]
  ]);
  builder.getRange('H6:H9').setNumberFormat('HH:mm');

  rules.getRange('C5:C7').setValues([[3], [1], [0]]);
  rules.getRange('C12:C13').setValues([[3], [0]]);
}

function PRODUCT001_deleteConnectedFormResponses_() {
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  const formId = String(setup.getRange(PRODUCT001.config.formId).getValue()).trim();
  if (!formId) {
    return;
  }
  const form = FormApp.openById(formId);
  form.setAcceptingResponses(false);
  form.deleteAllResponses();
}

function PRODUCT001_resetProcessingMetadata_() {
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  setup.getRange(PRODUCT001.config.lastFormSyncTimestamp).clearContent();
  setup.getRange(PRODUCT001.config.lastFormSyncStatus).setValue('Not yet synced after reset');
  setup.getRange(PRODUCT001.config.eligibleFixtureCount).setValue(0);
  setup.getRange(PRODUCT001.config.lastProcessingStatus).setValue('No response rows to process');
  setup.getRange(PRODUCT001.config.lastProcessedRow).setValue(1);
}

function PRODUCT001_closeFormAfterReset_() {
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  const formId = String(setup.getRange(PRODUCT001.config.formId).getValue()).trim();
  if (!formId) {
    setup.getRange(PRODUCT001.config.formSetupStatus).setValue('Not installed');
    return;
  }

  const form = FormApp.openById(formId);
  form.setAcceptingResponses(false);
  setup.getRange(PRODUCT001.config.formSetupStatus).setValue('Published - closed awaiting fixtures');
}

function PRODUCT001_getMatchActivitySummary_() {
  const responses = PRODUCT001_getResponseSheet_();
  const review = PRODUCT001_getSheet_(PRODUCT001.resultReviewSheet);
  const scorers = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Goal Scorers');

  let responseRows = 0;
  if (responses.getLastRow() > 1) {
    const responseValues = responses.getRange(2, 1, responses.getLastRow() - 1, responses.getLastColumn()).getValues();
    responseRows = responseValues.filter(function(row) {
      return row.some(function(value) { return !PRODUCT001_isBlankValue_(value); });
    }).length;
  }

  const reviewValues = review.getRange(5, 1, 200, 30).getValues();
  const reviewRows = reviewValues.filter(function(row) {
    const activityValues = row.slice(0, 4).concat(row.slice(7, 18), row.slice(19, 23), row.slice(27, 29));
    return activityValues.some(function(value) { return !PRODUCT001_isBlankValue_(value); });
  }).length;

  let scorerRows = 0;
  if (scorers) {
    const scorerValues = scorers.getRange(5, 1, scorers.getMaxRows() - 4, 6).getValues();
    scorerRows = scorerValues.filter(function(row) {
      return row.some(function(value) { return !PRODUCT001_isBlankValue_(value); });
    }).length;
  }

  return {
    responseRows: responseRows,
    reviewRows: reviewRows,
    scorerRows: scorerRows,
    totalRows: responseRows + reviewRows + scorerRows
  };
}

function PRODUCT001_safeFileName_(value) {
  return String(value || '').replace(/[\\\/:*?"<>|]+/g, '-').replace(/\s+/g, ' ').trim();
}

function PRODUCT001_syncResultFormFixtures(showAlert) {
  showAlert = showAlert !== false;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  const formId = String(setup.getRange(PRODUCT001.config.formId).getValue()).trim();

  if (!formId) {
    throw new Error('No Form ID found. Use Competition Tools > Set Up Result Form first.');
  }

  const form = PRODUCT001_getUsableLinkedForm_(formId, ss);
  if (!form) {
    throw new Error('No active Result Form is linked to this workbook. Use Competition Tools > Set Up Result Form first.');
  }
  const labels = PRODUCT001_buildFixtureFormLabels_();
  const fixtureItem = PRODUCT001_getOrCreateListItem_(form, 'Fixture Selection');

  if (labels.length) {
    fixtureItem.setChoiceValues(labels);
    form.setAcceptingResponses(true);
  } else {
    fixtureItem.setChoiceValues(['No fixtures currently available - contact the competition manager']);
    form.setAcceptingResponses(false);
  }

  setup.getRange(PRODUCT001.config.formLinkedSpreadsheetId).setValue(ss.getId());
  setup.getRange(PRODUCT001.config.lastFormSyncTimestamp).setValue(new Date());
  setup.getRange(PRODUCT001.config.lastFormSyncStatus).setValue('Synced ' + labels.length + ' eligible fixture(s)');
  setup.getRange(PRODUCT001.config.eligibleFixtureCount).setValue(labels.length);

  if (showAlert) {
    SpreadsheetApp.getUi().alert('The Result Form now contains ' + labels.length + ' open fixture(s).');
  }
  return labels.length;
}

function PRODUCT001_processFormResponses() {
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  const review = PRODUCT001_getSheet_(PRODUCT001.resultReviewSheet);
  const responses = PRODUCT001_getResponseSheet_();
  const processingColumns = PRODUCT001_prepareResponseProcessingColumns_();

  const lastRow = responses.getLastRow();
  if (lastRow < 2) {
    setup.getRange(PRODUCT001.config.lastProcessingStatus).setValue('No response rows to process');
    return;
  }

  const lastCol = responses.getLastColumn();
  const headers = responses.getRange(1, 1, 1, lastCol).getDisplayValues()[0];
  const rows = responses.getRange(2, 1, lastRow - 1, lastCol).getValues();
  let processed = 0;
  let skipped = 0;

  rows.forEach(function(row, index) {
    const sheetRow = index + 2;
    const processingStatus = String(PRODUCT001_valueByHeader_(headers, row, ['Processing Status']) || '').trim();
    if (processingStatus === 'Processed') {
      skipped++;
      return;
    }

    try {
      const timestamp = PRODUCT001_valueByHeader_(headers, row, ['Timestamp']);
      const submissionType = 'New Result';
      const fixtureSelection = PRODUCT001_valueByHeader_(headers, row, ['Fixture Selection']);
      const matchId = PRODUCT001_extractMatchId_(fixtureSelection);

      if (!matchId) {
        throw new Error('Could not extract Match ID from Fixture Selection.');
      }

      const fixtureContext = PRODUCT001_getFixtureContext_(matchId);
      const matchStatus = String(PRODUCT001_valueByHeader_(headers, row, ['Match Status']) || '').trim();
      const homeScore = PRODUCT001_valueByHeader_(headers, row, ['Home Score']);
      const awayScore = PRODUCT001_valueByHeader_(headers, row, ['Away Score']);
      const walkoverAnswer = PRODUCT001_valueByHeader_(headers, row, ['Walkover Winner', 'Walkover Awarded To']);
      const submittedBy = PRODUCT001_valueByHeader_(headers, row, ['Submitted By']);
      const submitterRole = PRODUCT001_valueByHeader_(headers, row, ['Submitter Role']);
      const generalMessage = PRODUCT001_valueByHeader_(headers, row, ['Message to Competition Manager', 'Notes']);
      const statusReason = PRODUCT001_valueByHeader_(headers, row, ['Reason or Context']);
      const notes = PRODUCT001_combineNotes_(generalMessage, statusReason);
      let walkoverWinner = '';

      if (!matchStatus) {
        throw new Error('Match Status is required.');
      }
      if (matchStatus === 'Played' && (PRODUCT001_isBlankValue_(homeScore) || PRODUCT001_isBlankValue_(awayScore))) {
        throw new Error('Played result requires both Home Score and Away Score.');
      }
      if (matchStatus === 'Walkover') {
        walkoverWinner = PRODUCT001_resolveWalkoverWinner_(walkoverAnswer, fixtureContext);
        if (!walkoverWinner) {
          throw new Error('Walkover result requires Home team or Away team as the winner.');
        }
      }

      const reviewRow = PRODUCT001_nextEmptyReviewRow_(review);
      if (!reviewRow) {
        throw new Error('No empty Result Review rows are available.');
      }

      const submissionId = PRODUCT001_nextSubmissionId_(review);
      review.getRange(reviewRow, 1, 1, 4).setValues([[timestamp || new Date(), submissionId, submissionType, matchId]]);
      review.getRange(reviewRow, 8, 1, 11).setValues([[
        homeScore,
        awayScore,
        matchStatus,
        walkoverWinner,
        fixtureContext.date || '',
        submittedBy,
        submitterRole,
        notes,
        '',
        '',
        'Pending'
      ]]);
      review.getRange(reviewRow, PRODUCT001.lifecycle.officialStatusColumn, 1, 2).setValues([[
        PRODUCT001_defaultCompetitionOutcome_(matchStatus),
        PRODUCT001_normalizeWalkoverSide_(walkoverAnswer)
      ]]);

      responses.getRange(sheetRow, processingColumns.status, 1, 5).setValues([[
        'Processed',
        submissionId,
        reviewRow,
        new Date(),
        'Written to Result Review'
      ]]);
      processed++;
    } catch (err) {
      responses.getRange(sheetRow, processingColumns.status, 1, 5).setValues([[
        'Error',
        '',
        '',
        new Date(),
        err.message
      ]]);
    }
  });

  setup.getRange(PRODUCT001.config.lastProcessingStatus).setValue('Processed ' + processed + ' response row(s), skipped ' + skipped + ' already processed row(s)');
  setup.getRange(PRODUCT001.config.lastProcessedRow).setValue(lastRow);
}

function PRODUCT001_installFormSubmitTrigger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'PRODUCT001_processFormResponses') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  ScriptApp.newTrigger('PRODUCT001_processFormResponses')
    .forSpreadsheet(ss)
    .onFormSubmit()
    .create();
}

function PRODUCT001_syncApprovedFixtures(showAlert) {
  showAlert = showAlert !== false;
  const updated = PRODUCT001_applyApprovedFixtureStatuses_();
  const synced = PRODUCT001_syncResultFormFixtures(false);
  if (showAlert) {
    SpreadsheetApp.getUi().alert('Approved results were refreshed. ' + updated + ' fixture(s) were updated and the Result Form now contains ' + synced + ' open fixture(s).');
  }
  return {updated: updated, synced: synced};
}

function PRODUCT001_installApprovalEditTrigger() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  ScriptApp.getProjectTriggers().forEach(function(trigger) {
    if (trigger.getHandlerFunction() === 'PRODUCT001_handleApprovalEdit') {
      ScriptApp.deleteTrigger(trigger);
    }
  });
  ScriptApp.newTrigger('PRODUCT001_handleApprovalEdit')
    .forSpreadsheet(ss)
    .onEdit()
    .create();
}

function PRODUCT001_handleApprovalEdit(e) {
  if (!e || !e.range) {
    return;
  }
  const sheet = e.range.getSheet();
  if (sheet.getName() !== PRODUCT001.resultReviewSheet) {
    return;
  }
  const editedFirstRow = e.range.getRow();
  const editedLastRow = editedFirstRow + e.range.getNumRows() - 1;
  const editedFirstCol = e.range.getColumn();
  const editedLastCol = editedFirstCol + e.range.getNumColumns() - 1;
  const watchedColumns = [18, PRODUCT001.lifecycle.officialStatusColumn, PRODUCT001.lifecycle.walkoverSideColumn];
  const intersectsWatchedColumn = watchedColumns.some(function(column) {
    return editedFirstCol <= column && editedLastCol >= column;
  });
  if (editedLastRow < 5 || !intersectsWatchedColumn) {
    return;
  }
  PRODUCT001_syncApprovedFixtures(false);
}

function PRODUCT001_applyApprovedFixtureStatuses_() {
  const fixtures = PRODUCT001_getSheet_(PRODUCT001.fixturesSheet);
  const review = PRODUCT001_getSheet_(PRODUCT001.resultReviewSheet);
  const reviewValues = review.getRange(5, 4, 200, 25).getValues();
  const approvedStatusByMatch = {};

  reviewValues.forEach(function(row) {
    const matchId = String(row[0] || '').trim();
    const competitionOutcome = String(row[24] || '').trim();
    const reviewStatus = String(row[14] || '').trim();
    if (matchId && reviewStatus === 'Approved' && competitionOutcome) {
      approvedStatusByMatch[matchId] = competitionOutcome;
    }
  });

  const fixtureIds = fixtures.getRange(5, 1, 200, 1).getValues();
  const statusRange = fixtures.getRange(5, 9, 200, 1);
  const currentStatuses = statusRange.getValues();
  let updated = 0;

  const nextStatuses = currentStatuses.map(function(row, index) {
    const matchId = String(fixtureIds[index][0] || '').trim();
    const approvedStatus = approvedStatusByMatch[matchId];
    if (approvedStatus && row[0] !== approvedStatus) {
      updated++;
      return [approvedStatus];
    }
    return row;
  });

  if (updated > 0) {
    statusRange.setValues(nextStatuses);
    SpreadsheetApp.flush();
  }
  return updated;
}

function PRODUCT001_showQaStatus() {
  const reports = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Reports');
  const message = [
    'Approved Results: ' + reports.getRange('B5').getDisplayValue(),
    'Open Fixtures: ' + reports.getRange('D5').getDisplayValue(),
    'Items to Fix: ' + reports.getRange('F5').getDisplayValue(),
    'Publishing Status: ' + reports.getRange('J5').getDisplayValue(),
    'Open Checks for details.'
  ].join('\n');
  SpreadsheetApp.getUi().alert(message);
}

function PRODUCT001_buildCanonicalFormItems_(form) {
  form
    .setTitle('Football Match Result Submission')
    .setDescription('Submit a football match result or status update for one scheduled fixture. Choose the fixture, identify yourself and complete only the page that matches what happened. The competition manager reviews every submission before it changes official records.')
    .setConfirmationMessage('Submission received for review. If you made a mistake before approval, submit the same fixture again with the correct information and explain it in the message field. The competition manager will keep the submission history and approve only the correct entry.')
    .setProgressBar(true)
    .setShuffleQuestions(false)
    .setShowLinkToRespondAgain(true);

  [
    'Optional Scorer Text',
    'Submission Type',
    'Match Date / Relevant Date',
    'Match Date Played',
    'Notes',
    'Evidence Link'
  ].forEach(function(title) {
    PRODUCT001_deleteItemsByTitle_(form, title);
  });
  PRODUCT001_neutralizePageNavigation_(form);
  PRODUCT001_deleteAllLayoutItems_(form);

  const fixtureSelectionItem = PRODUCT001_getOrCreateListItem_(form, 'Fixture Selection')
    .setChoiceValues(['No fixtures currently available - contact the competition manager'])
    .setHelpText('Select the exact scheduled fixture. A fixture stays available until one submission is approved.')
    .setRequired(true);

  const submittedByItem = PRODUCT001_getOrCreateTextItem_(form, 'Submitted By')
    .setHelpText('Enter your full name.')
    .setRequired(true);

  const submitterRoleItem = PRODUCT001_getOrCreateListItem_(form, 'Submitter Role')
    .setChoiceValues(['Competition Manager', 'Match Official', 'Team Official', 'Other'])
    .setHelpText('Choose the role you are acting in for this submission.')
    .setRequired(true);

  const messageItem = PRODUCT001_getOrCreateParagraphItem_(form, 'Message to Competition Manager')
    .setHelpText('Optional. Use this to explain unusual circumstances or to say that this submission replaces an earlier unapproved entry. Add only information the competition manager needs.')
    .setRequired(false);

  const matchStatusItem = PRODUCT001_getOrCreateMultipleChoiceItem_(form, 'Match Status')
    .setChoiceValues(['Played', 'Walkover', 'Postponed', 'Abandoned'])
    .setHelpText('Choose what happened. An abandoned match is reviewed by the competition manager and normally rescheduled unless the competition rules determine another outcome.')
    .setRequired(true);

  const playedPage = PRODUCT001_getOrCreatePageBreakItem_(form, 'Played Result')
    .setHelpText('Enter the final score. The home team is listed first in the selected fixture.');

  const nonNegativeWholeNumberValidation = FormApp.createTextValidation()
    .setHelpText('Enter a whole number of 0 or greater.')
    .requireWholeNumber()
    .requireNumberGreaterThanOrEqualTo(0)
    .build();

  const homeScoreItem = PRODUCT001_getOrCreateTextItem_(form, 'Home Score')
    .setHelpText('Enter the final score for the first team listed in the fixture.')
    .setValidation(nonNegativeWholeNumberValidation)
    .setRequired(true);

  const awayScoreItem = PRODUCT001_getOrCreateTextItem_(form, 'Away Score')
    .setHelpText('Enter the final score for the second team listed in the fixture.')
    .setValidation(nonNegativeWholeNumberValidation)
    .setRequired(true);

  const walkoverPage = PRODUCT001_getOrCreatePageBreakItem_(form, 'Walkover')
    .setHelpText('Select which side received the walkover. The competition rules supply the official score.');

  const walkoverWinnerItem = PRODUCT001_getOrCreateMultipleChoiceItem_(form, 'Walkover Winner')
    .setChoiceValues(['Home team (first team listed)', 'Away team (second team listed)'])
    .setHelpText('Choose the winning side shown in the selected fixture.')
    .setRequired(true);

  const statusUpdatePage = PRODUCT001_getOrCreatePageBreakItem_(form, 'Match Status Update')
    .setHelpText('Explain why the fixture was postponed or abandoned. A postponed fixture can be rescheduled. An abandoned match is reviewed before an official outcome is recorded.');

  const reasonItem = PRODUCT001_getOrCreateParagraphItem_(form, 'Reason or Context')
    .setHelpText('Briefly explain what happened and include any information the competition manager needs.')
    .setRequired(true);

  PRODUCT001_reorderCanonicalFormItems_(form, [
    fixtureSelectionItem,
    submittedByItem,
    submitterRoleItem,
    messageItem,
    matchStatusItem,
    playedPage,
    homeScoreItem,
    awayScoreItem,
    walkoverPage,
    walkoverWinnerItem,
    statusUpdatePage,
    reasonItem
  ]);

  playedPage.setGoToPage(FormApp.PageNavigationType.SUBMIT);
  walkoverPage.setGoToPage(FormApp.PageNavigationType.SUBMIT);
  statusUpdatePage.setGoToPage(FormApp.PageNavigationType.SUBMIT);
  matchStatusItem.setChoices([
    matchStatusItem.createChoice('Played', playedPage),
    matchStatusItem.createChoice('Walkover', walkoverPage),
    matchStatusItem.createChoice('Postponed', statusUpdatePage),
    matchStatusItem.createChoice('Abandoned', statusUpdatePage)
  ]);
}
function PRODUCT001_prepareResponseProcessingColumns_() {
  const responses = PRODUCT001_getResponseSheet_();
  const lastColumn = Math.max(responses.getLastColumn(), 1);
  const headers = responses.getRange(1, 1, 1, lastColumn).getDisplayValues()[0];
  let columns = PRODUCT001_findProcessingColumns_(headers);

  if (!columns) {
    const startColumn = lastColumn + 1;
    responses.getRange(1, startColumn, 1, PRODUCT001.processingHeaders.length)
      .setValues([PRODUCT001.processingHeaders]);
    columns = {
      status: startColumn,
      submissionId: startColumn + 1,
      reviewRow: startColumn + 2,
      processedAt: startColumn + 3,
      message: startColumn + 4
    };
  } else {
    responses.getRange(1, columns.status, 1, PRODUCT001.processingHeaders.length)
      .setValues([PRODUCT001.processingHeaders]);
  }

  return columns;
}

function PRODUCT001_findProcessingColumns_(headers) {
  const expected = PRODUCT001.processingHeaders;
  for (let startIndex = headers.length - expected.length; startIndex >= 0; startIndex--) {
    let matches = true;
    for (let offset = 0; offset < expected.length; offset++) {
      if (headers[startIndex + offset] !== expected[offset]) {
        matches = false;
        break;
      }
    }
    if (matches) {
      const startColumn = startIndex + 1;
      return {
        status: startColumn,
        submissionId: startColumn + 1,
        reviewRow: startColumn + 2,
        processedAt: startColumn + 3,
        message: startColumn + 4
      };
    }
  }
  return null;
}

function PRODUCT001_buildFixtureFormLabels_() {
  const fixtures = PRODUCT001_getSheet_(PRODUCT001.fixturesSheet);
  const teamNames = PRODUCT001_getTeamNameMap_();
  const rows = fixtures.getRange(5, 1, 200, 14).getDisplayValues();

  return rows.filter(function(row) {
    return row[0] && row[13] === 'Yes';
  }).map(function(row) {
    const dateAndTime = [row[5], row[6]].filter(String).join(' at ');
    const homeName = teamNames[row[9]] || row[3];
    const awayName = teamNames[row[10]] || row[4];
    return dateAndTime + ' | ' + row[0] + ' | ' + homeName + ' v ' + awayName + ' | ' + row[7];
  });
}

function PRODUCT001_getTeamNameMap_() {
  const teams = PRODUCT001_getSheet_('Teams');
  const rows = teams.getRange(5, 2, 32, 2).getDisplayValues();
  const map = {};
  rows.forEach(function(row) {
    const teamId = String(row[0] || '').trim();
    const teamName = String(row[1] || '').trim();
    if (teamId && teamName) {
      map[teamId] = teamName;
    }
  });
  return map;
}

function PRODUCT001_getFixtureContext_(matchId) {
  const fixtures = PRODUCT001_getSheet_(PRODUCT001.fixturesSheet);
  const range = fixtures.getRange(5, 1, 200, 16);
  const values = range.getValues();
  const displayValues = range.getDisplayValues();

  for (let index = 0; index < values.length; index++) {
    if (String(displayValues[index][0] || '').trim() !== matchId) {
      continue;
    }
    return {
      matchId: matchId,
      homeShort: String(displayValues[index][3] || '').trim(),
      awayShort: String(displayValues[index][4] || '').trim(),
      date: values[index][5] || '',
      homeTeamId: String(displayValues[index][9] || '').trim(),
      awayTeamId: String(displayValues[index][10] || '').trim()
    };
  }
  throw new Error('Match ID was not found in Fixtures: ' + matchId);
}

function PRODUCT001_resolveWalkoverWinner_(answer, fixtureContext) {
  const value = String(answer || '').trim();
  if (!value) {
    return '';
  }
  if (/^Home team/i.test(value) || value === fixtureContext.homeShort || value === fixtureContext.homeTeamId) {
    return fixtureContext.homeTeamId;
  }
  if (/^Away team/i.test(value) || value === fixtureContext.awayShort || value === fixtureContext.awayTeamId) {
    return fixtureContext.awayTeamId;
  }
  return '';
}

function PRODUCT001_combineNotes_(generalMessage, statusReason) {
  const parts = [generalMessage, statusReason].filter(function(value) {
    return !PRODUCT001_isBlankValue_(value);
  }).map(function(value) {
    return String(value).trim();
  });
  return parts.join(' | ');
}

function PRODUCT001_neutralizePageNavigation_(form) {
  form.getItems(FormApp.ItemType.MULTIPLE_CHOICE).forEach(function(item) {
    if (item.getTitle() !== 'Match Status') {
      return;
    }
    item.asMultipleChoiceItem().setChoiceValues(['Played', 'Walkover', 'Postponed', 'Abandoned']);
  });
}

function PRODUCT001_deleteAllLayoutItems_(form) {
  form.getItems().filter(function(item) {
    return item.getType() === FormApp.ItemType.SECTION_HEADER ||
      item.getType() === FormApp.ItemType.PAGE_BREAK;
  }).forEach(function(item) {
    form.deleteItem(item);
  });
}

function PRODUCT001_getUsableLinkedForm_(formId, spreadsheet) {
  if (!formId) {
    return null;
  }

  try {
    const form = FormApp.openById(formId);
    const destinationId = form.getDestinationId ? form.getDestinationId() : '';
    return destinationId === spreadsheet.getId() ? form : null;
  } catch (err) {
    return null;
  }
}

function PRODUCT001_findResponseSheetForForm_(spreadsheet, form) {
  const expectedUrls = [form.getId(), form.getEditUrl(), form.getPublishedUrl()];

  for (let attempt = 0; attempt < 10; attempt += 1) {
    SpreadsheetApp.flush();
    const responseSheet = spreadsheet.getSheets().find(function(sheet) {
      const formUrl = sheet.getFormUrl();
      return formUrl && expectedUrls.some(function(expectedUrl) {
        return formUrl === expectedUrl || formUrl.indexOf(expectedUrl) !== -1 || expectedUrl.indexOf(formUrl) !== -1;
      });
    });

    if (responseSheet) {
      return responseSheet;
    }

    Utilities.sleep(500);
  }

  throw new Error('The Result Form was created but its response sheet could not be found. Check the Form response destination before continuing.');
}

function PRODUCT001_hideLinkedFormResponseSheets_() {
  SpreadsheetApp.getActiveSpreadsheet().getSheets().forEach(function(sheet) {
    try {
      if (sheet.getFormUrl()) {
        sheet.hideSheet();
      }
    } catch (err) {
      // A legacy Form link must not prevent the workbook from opening normally.
    }
  });
}

function PRODUCT001_getResponseSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  const configuredName = String(setup.getRange(PRODUCT001.config.formResponseSheet).getValue()).trim();
  const configuredSheet = configuredName ? ss.getSheetByName(configuredName) : null;

  if (configuredSheet) {
    return configuredSheet;
  }

  const formId = String(setup.getRange(PRODUCT001.config.formId).getValue()).trim();
  const form = PRODUCT001_getUsableLinkedForm_(formId, ss);
  if (form) {
    const responseSheet = PRODUCT001_findResponseSheetForForm_(ss, form);
    setup.getRange(PRODUCT001.config.formResponseSheet).setValue(responseSheet.getName());
    return responseSheet;
  }

  throw new Error('No connected Form response sheet is available. Use Competition Tools > Set Up Result Form first.');
}

function PRODUCT001_getSheet_(sheetName) {
  const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
  const aliases = {
    'Create Fixtures': ['Create Fixtures', 'Fixture Builder'],
    'Checks': ['Checks', 'Validation']
  };
  const names = aliases[sheetName] || [sheetName];
  for (let index = 0; index < names.length; index += 1) {
    const sheet = spreadsheet.getSheetByName(names[index]);
    if (sheet) {
      return sheet;
    }
  }
  throw new Error('Missing sheet: ' + sheetName);
}

function PRODUCT001_getOrCreateListItem_(form, title) {
  const item = PRODUCT001_getOrCreateCanonicalItem_(
    form,
    title,
    FormApp.ItemType.LIST,
    function() { return form.addListItem().setTitle(title); }
  );
  return PRODUCT001_castFormItem_(item, 'asListItem');
}

function PRODUCT001_getOrCreateMultipleChoiceItem_(form, title) {
  const item = PRODUCT001_getOrCreateCanonicalItem_(
    form,
    title,
    FormApp.ItemType.MULTIPLE_CHOICE,
    function() { return form.addMultipleChoiceItem().setTitle(title); }
  );
  return PRODUCT001_castFormItem_(item, 'asMultipleChoiceItem');
}

function PRODUCT001_getOrCreateTextItem_(form, title) {
  const item = PRODUCT001_getOrCreateCanonicalItem_(
    form,
    title,
    FormApp.ItemType.TEXT,
    function() { return form.addTextItem().setTitle(title); }
  );
  return PRODUCT001_castFormItem_(item, 'asTextItem');
}

function PRODUCT001_getOrCreateParagraphItem_(form, title) {
  const item = PRODUCT001_getOrCreateCanonicalItem_(
    form,
    title,
    FormApp.ItemType.PARAGRAPH_TEXT,
    function() { return form.addParagraphTextItem().setTitle(title); }
  );
  return PRODUCT001_castFormItem_(item, 'asParagraphTextItem');
}

function PRODUCT001_getOrCreateDateItem_(form, title) {
  const item = PRODUCT001_getOrCreateCanonicalItem_(
    form,
    title,
    FormApp.ItemType.DATE,
    function() { return form.addDateItem().setTitle(title); }
  );
  return PRODUCT001_castFormItem_(item, 'asDateItem');
}

function PRODUCT001_getOrCreateSectionHeaderItem_(form, title) {
  const item = PRODUCT001_getOrCreateCanonicalItem_(
    form,
    title,
    FormApp.ItemType.SECTION_HEADER,
    function() { return form.addSectionHeaderItem().setTitle(title); }
  );
  return PRODUCT001_castFormItem_(item, 'asSectionHeaderItem');
}

function PRODUCT001_getOrCreatePageBreakItem_(form, title) {
  const item = PRODUCT001_getOrCreateCanonicalItem_(
    form,
    title,
    FormApp.ItemType.PAGE_BREAK,
    function() { return form.addPageBreakItem().setTitle(title); }
  );
  return PRODUCT001_castFormItem_(item, 'asPageBreakItem');
}

function PRODUCT001_castFormItem_(item, conversionMethod) {
  if (item && typeof item[conversionMethod] === 'function') {
    return item[conversionMethod]();
  }
  return item;
}

function PRODUCT001_getOrCreateCanonicalItem_(form, title, itemType, createItem) {
  const titledItems = form.getItems().filter(function(item) {
    return item.getTitle() === title;
  });
  const matchingItems = titledItems.filter(function(item) {
    return item.getType() === itemType;
  });
  const canonicalItem = matchingItems.length ? matchingItems[0] : createItem();
  const canonicalId = canonicalItem.getId();

  titledItems.forEach(function(item) {
    if (item.getId() !== canonicalId) {
      form.deleteItem(item);
    }
  });

  return canonicalItem;
}

function PRODUCT001_deleteItemsByTitle_(form, title) {
  const matches = form.getItems().filter(function(item) {
    return item.getTitle() === title;
  });
  matches.forEach(function(item) {
    form.deleteItem(item);
  });
}

function PRODUCT001_deleteLayoutItemsByTitles_(form, titles) {
  form.getItems().filter(function(item) {
    const isLayoutItem = item.getType() === FormApp.ItemType.SECTION_HEADER ||
      item.getType() === FormApp.ItemType.PAGE_BREAK;
    return titles.indexOf(item.getTitle()) !== -1 && isLayoutItem;
  }).forEach(function(item) {
    form.deleteItem(item);
  });
}

function PRODUCT001_reorderCanonicalFormItems_(form, items) {
  items.forEach(function(targetItem, targetIndex) {
    const targetId = targetItem.getId();
    const currentItems = form.getItems();
    const currentIndex = currentItems.findIndex(function(item) {
      return item.getId() === targetId;
    });

    if (currentIndex === -1) {
      throw new Error('Could not locate Form item during reordering: ' + targetItem.getTitle());
    }

    if (currentIndex !== targetIndex) {
      form.moveItem(currentIndex, targetIndex);
    }
  });
}

function PRODUCT001_valueByHeader_(headers, row, names) {
  for (let nameIndex = 0; nameIndex < names.length; nameIndex++) {
    const targetName = names[nameIndex];
    for (let columnIndex = headers.length - 1; columnIndex >= 0; columnIndex--) {
      if (headers[columnIndex] !== targetName) {
        continue;
      }
      const value = row[columnIndex];
      if (!PRODUCT001_isBlankValue_(value)) {
        return value;
      }
    }
  }
  return '';
}

function PRODUCT001_isBlankValue_(value) {
  if (value === null || typeof value === 'undefined' || value === '') {
    return true;
  }
  return typeof value === 'string' && value.trim() === '';
}

function PRODUCT001_extractMatchId_(fixtureSelection) {
  const value = String(fixtureSelection || '');
  const pipeMatch = value.match(/\|\s*(M\d{3})\s*\|/i);
  if (pipeMatch) {
    return pipeMatch[1].toUpperCase();
  }
  const simpleMatch = value.match(/\bM\d{3}\b/i);
  return simpleMatch ? simpleMatch[0].toUpperCase() : '';
}

function PRODUCT001_nextEmptyReviewRow_(review) {
  const values = review.getRange(5, 2, 200, 1).getValues();
  for (let i = 0; i < values.length; i++) {
    if (!values[i][0]) {
      return i + 5;
    }
  }
  return null;
}

function PRODUCT001_nextSubmissionId_(review) {
  const values = review.getRange(5, 2, 200, 1).getValues().flat().filter(String);
  return 'S' + String(values.length + 1).padStart(3, '0');
}
