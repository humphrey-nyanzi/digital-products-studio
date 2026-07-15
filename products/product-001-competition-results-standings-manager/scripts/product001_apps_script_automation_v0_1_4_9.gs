/**
 * Product 001 - Competition Results and Standings Manager
 * Apps Script automation v0.1.4.9
 */
const PRODUCT001 = {
  setupSheet: 'Setup',
  builderSheet: 'Fixture Builder',
  fixturesSheet: 'Fixtures',
  resultReviewSheet: 'Result Review',
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
  ]
};

function onOpen(e) {
  try {
    PRODUCT001_hideLinkedFormResponseSheets_();
  } catch (err) {
    // Keep workbook navigation available if a legacy linked Form cannot be inspected.
  }

  const ui = SpreadsheetApp.getUi();
  const resetMenu = ui.createMenu('Reset and Start Fresh')
    .addItem('Clear Match Data - Keep Setup', 'PRODUCT001_clearMatchDataKeepSetup')
    .addItem('Reset to Blank Template', 'PRODUCT001_resetToBlankTemplate');

  ui.createMenu('Product 001')
    .addItem('Set Up Result Form', 'PRODUCT001_installOrRepairForm')
    .addItem('Transfer Generated Fixtures', 'PRODUCT001_transferGeneratedFixtures')
    .addItem('Sync Result Form Fixtures', 'PRODUCT001_syncResultFormFixtures')
    .addItem('Process Form Responses', 'PRODUCT001_processFormResponses')
    .addItem('Sync Approved Fixtures and Form', 'PRODUCT001_syncApprovedFixtures')
    .addItem('Install Form Submit Trigger', 'PRODUCT001_installFormSubmitTrigger')
    .addItem('Install Approval Edit Trigger', 'PRODUCT001_installApprovalEditTrigger')
    .addSeparator()
    .addSubMenu(resetMenu)
    .addSeparator()
    .addItem('Run QA Checks', 'PRODUCT001_showQaStatus')
    .addToUi();
}

function PRODUCT001_installOrRepairForm() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  const existingId = String(setup.getRange(PRODUCT001.config.formId).getValue()).trim();
  let form = PRODUCT001_getUsableLinkedForm_(existingId, ss);

  if (!form) {
    form = FormApp.create('Competition Result Submission');
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

  SpreadsheetApp.getUi().alert('Result Form is ready and linked to this workbook. Share it only after fixtures have been confirmed and synced.');
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
    ui.alert('Fixture Builder is not ready. Current status: ' + status);
    return;
  }
  if (!count || count < 1) {
    ui.alert('No generated fixtures are available to transfer.');
    return;
  }
  if (count > 200) {
    ui.alert('Transfer stopped. The generated fixture count exceeds the 200-row official fixture register.');
    return;
  }

  const activity = PRODUCT001_getMatchActivitySummary_();
  if (activity.totalRows > 0) {
    ui.alert(
      'Transfer stopped',
      'Existing competition activity was found: ' +
        activity.responseRows + ' Form response row(s), ' +
        activity.reviewRows + ' Result Review row(s) and ' +
        activity.scorerRows + ' scorer row(s). Replacing fixtures could break Match ID links. Use Product 001 > Reset and Start Fresh > Clear Match Data - Keep Setup, then transfer again.',
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
      'Replace official fixtures?',
      'This will clear ' + existingCount + ' existing official fixture row(s) in Fixtures B5:I204 and replace them with ' + count + ' generated fixture row(s) from Fixture Builder. This is intended before results are submitted. Continue?',
      ui.ButtonSet.YES_NO
    );
    if (decision !== ui.Button.YES) {
      ui.alert('Transfer cancelled. Existing Fixtures rows were not changed.');
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
    syncMessage = '\nForm sync completed: ' + synced + ' eligible fixture(s).';
  } catch (err) {
    syncMessage = '\nFixtures were replaced, but Form sync failed: ' + err.message;
  }

  ui.alert('Replaced official Fixtures with ' + count + ' generated fixture row(s) in rows 5 to ' + (count + 4) + '.' + syncMessage);
}


function PRODUCT001_clearMatchDataKeepSetup() {
  PRODUCT001_runReset_({
    mode: 'MATCH_ONLY',
    title: 'Clear match data and keep setup?',
    warning: 'This permanently clears official fixtures, Form responses, Result Review history and scorer entries from this workbook. Competition details, teams, venues, rules and Fixture Builder settings will be kept. A timestamped backup copy is created first.',
    confirmation: 'CLEAR MATCH DATA'
  });
}

function PRODUCT001_resetToBlankTemplate() {
  PRODUCT001_runReset_({
    mode: 'FULL',
    title: 'Reset workbook to a blank template?',
    warning: 'This permanently clears match data, competition details, teams, venues and Fixture Builder inputs, then restores the standard points and walkover defaults. Formulas, formatting, generated IDs, automation, the connected Form and Archive records are kept. A timestamped backup copy is created first.',
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
      formWarning = '\n\nForm warning: ' + formErr.message + '\nThe workbook reset is complete, but the connected Form needs a sync or repair before use.';
      PRODUCT001_getSheet_(PRODUCT001.setupSheet)
        .getRange(PRODUCT001.config.formSetupStatus)
        .setValue('Reset complete - Form check required');
    }
    SpreadsheetApp.flush();

    const resetLabel = options.mode === 'FULL' ? 'Blank-template reset' : 'Match-data reset';
    ui.alert(
      resetLabel + ' completed',
      'The reset is complete. Backup created:\n' + backup.getName() + '\n' + backup.getUrl() + '\n\nThe connected Result Form is closed until valid Scheduled fixtures are transferred or entered and synced.' + formWarning,
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
  const sourceFile = DriveApp.getFileById(ss.getId());
  const parents = sourceFile.getParents();
  const destination = parents.hasNext() ? parents.next() : DriveApp.getRootFolder();
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  const competitionName = String(setup.getRange('D5').getDisplayValue()).trim() || 'Unnamed Competition';
  const season = String(setup.getRange('D6').getDisplayValue()).trim() || 'No Season';
  const modeLabel = mode === 'FULL' ? 'Before Blank Reset' : 'Before Match Data Reset';
  const timestamp = Utilities.formatDate(new Date(), ss.getSpreadsheetTimeZone(), 'yyyyMMdd-HHmmss');
  const backupName = PRODUCT001_safeFileName_(ss.getName() + ' - ' + competitionName + ' - ' + season + ' - ' + modeLabel + ' - ' + timestamp);
  const backup = sourceFile.makeCopy(backupName, destination);
  backup.setDescription('Automatic Product 001 backup created before a destructive reset on ' + new Date().toISOString() + '.');
  return backup;
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

  setup.getRange('D5:D11').clearContent();
  setup.getRange('D16').clearContent();
  teams.getRange('C5:G36').clearContent();
  venues.getRange('B5:F24').clearContent();
  builder.getRange('D5:D9').clearContent();
  builder.getRange('H5:H10').clearContent();

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

  const reviewValues = review.getRange(5, 1, 200, 23).getValues();
  const reviewRows = reviewValues.filter(function(row) {
    const activityValues = row.slice(0, 4).concat(row.slice(7, 18), row.slice(19, 23));
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
    throw new Error('No Form ID found. Run Product 001 > Set Up Result Form first.');
  }

  const form = PRODUCT001_getUsableLinkedForm_(formId, ss);
  if (!form) {
    throw new Error('No active Result Form is linked to this workbook. Run Product 001 > Set Up Result Form first.');
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
    SpreadsheetApp.getUi().alert('Result Form synced with ' + labels.length + ' eligible fixture(s).');
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
        'Pending Review'
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
    SpreadsheetApp.getUi().alert('Approved fixture sync complete. Updated ' + updated + ' fixture status cell(s). Form now has ' + synced + ' eligible fixture(s).');
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
  const reviewStatusColumn = 18;
  if (editedLastRow < 5 || editedFirstCol > reviewStatusColumn || editedLastCol < reviewStatusColumn) {
    return;
  }
  PRODUCT001_syncApprovedFixtures(false);
}

function PRODUCT001_applyApprovedFixtureStatuses_() {
  const fixtures = PRODUCT001_getSheet_(PRODUCT001.fixturesSheet);
  const review = PRODUCT001_getSheet_(PRODUCT001.resultReviewSheet);
  const reviewValues = review.getRange(5, 4, 200, 15).getValues();
  const approvedStatusByMatch = {};

  reviewValues.forEach(function(row) {
    const matchId = String(row[0] || '').trim();
    const matchStatus = String(row[6] || '').trim();
    const reviewStatus = String(row[14] || '').trim();
    if (matchId && reviewStatus === 'Approved Current' && matchStatus) {
      approvedStatusByMatch[matchId] = matchStatus;
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
    'Awaiting Results: ' + reports.getRange('D5').getDisplayValue(),
    'Validation Issues: ' + reports.getRange('F5').getDisplayValue(),
    'Publishing Status: ' + reports.getRange('J5').getDisplayValue(),
    'Validation status cells are on the Validation sheet.'
  ].join('\n');
  SpreadsheetApp.getUi().alert(message);
}

function PRODUCT001_buildCanonicalFormItems_(form) {
  form
    .setTitle('Competition Result Submission')
    .setDescription('Submit a result or match-status update for one scheduled fixture. Choose the fixture, identify yourself and complete only the page that matches what happened. The competition manager reviews every submission before it changes official records.')
    .setConfirmationMessage('Submission received for review. If you made a mistake before approval, submit the same fixture again with the correct information and explain it in the message field. The competition manager will keep the audit trail and approve only the correct entry.')
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
    .setChoiceValues(['Competition Admin', 'Match Official', 'Team Official', 'Other'])
    .setHelpText('Choose the role you are acting in for this submission.')
    .setRequired(true);

  const messageItem = PRODUCT001_getOrCreateParagraphItem_(form, 'Message to Competition Manager')
    .setHelpText('Optional. Use this to explain unusual circumstances or to say that this submission replaces an earlier unapproved entry. Do not enter internal IDs.')
    .setRequired(false);

  const matchStatusItem = PRODUCT001_getOrCreateMultipleChoiceItem_(form, 'Match Status')
    .setChoiceValues(['Played', 'Walkover', 'Postponed', 'Abandoned'])
    .setHelpText('Choose what happened. The form will show only the fields needed for that status.')
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
    .setHelpText('Choose the winning side. You do not need to know a team code or Team ID.')
    .setRequired(true);

  const statusUpdatePage = PRODUCT001_getOrCreatePageBreakItem_(form, 'Match Status Update')
    .setHelpText('Explain why the fixture was postponed or abandoned. The competition manager decides whether any later administrative action is required.');

  const reasonItem = PRODUCT001_getOrCreateParagraphItem_(form, 'Reason or Context')
    .setHelpText('Briefly explain what happened. Do not enter internal IDs.')
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
    const file = DriveApp.getFileById(formId);
    if (file.isTrashed()) {
      return null;
    }

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

  throw new Error('No connected Form response sheet is available. Run Product 001 > Set Up Result Form first.');
}

function PRODUCT001_getSheet_(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('Missing sheet: ' + sheetName);
  }
  return sheet;
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
