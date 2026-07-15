/**
 * Product 001 - Competition Results and Standings Manager
 * Apps Script automation v0.1.2
 */
const PRODUCT001 = {
  setupSheet: 'Setup',
  builderSheet: 'Fixture Builder',
  fixturesSheet: 'Fixtures',
  formResponsesSheet: 'Form responses 1',
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
  processingColumns: {
    status: 26,
    submissionId: 27,
    reviewRow: 28,
    processedAt: 29,
    message: 30
  }
};

function onOpen(e) {
  SpreadsheetApp.getUi()
    .createMenu('Product 001')
    .addItem('Install or Repair Form', 'PRODUCT001_installOrRepairForm')
    .addItem('Transfer Generated Fixtures', 'PRODUCT001_transferGeneratedFixtures')
    .addItem('Sync Result Form Fixtures', 'PRODUCT001_syncResultFormFixtures')
    .addItem('Process Form Responses', 'PRODUCT001_processFormResponses')
    .addItem('Sync Approved Fixtures and Form', 'PRODUCT001_syncApprovedFixtures')
    .addItem('Install Form Submit Trigger', 'PRODUCT001_installFormSubmitTrigger')
    .addItem('Install Approval Edit Trigger', 'PRODUCT001_installApprovalEditTrigger')
    .addSeparator()
    .addItem('Run QA Checks', 'PRODUCT001_showQaStatus')
    .addToUi();
}

function PRODUCT001_installOrRepairForm() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  const existingId = String(setup.getRange(PRODUCT001.config.formId).getValue()).trim();
  let form = null;

  if (existingId) {
    try {
      const existingForm = FormApp.openById(existingId);
      const destinationId = existingForm.getDestinationId ? existingForm.getDestinationId() : '';
      if (destinationId === ss.getId()) {
        form = existingForm;
      }
    } catch (err) {
      form = null;
    }
  }

  if (!form) {
    form = FormApp.create('Product 001 Result Submission - ' + ss.getName());
    form.setDescription('Submit match results for the linked Product 001 competition workbook.');
    form.setDestination(FormApp.DestinationType.SPREADSHEET, ss.getId());
  }

  PRODUCT001_buildCanonicalFormItems_(form);

  setup.getRange(PRODUCT001.config.formId).setValue(form.getId());
  setup.getRange(PRODUCT001.config.formEditUrl).setValue(form.getEditUrl());
  setup.getRange(PRODUCT001.config.formResponseUrl).setValue(form.getPublishedUrl());
  setup.getRange(PRODUCT001.config.formResponseSheet).setValue(PRODUCT001.formResponsesSheet);
  setup.getRange(PRODUCT001.config.formSetupStatus).setValue('Published');
  setup.getRange(PRODUCT001.config.formLinkedSpreadsheetId).setValue(ss.getId());

  PRODUCT001_prepareResponseProcessingColumns_();
  PRODUCT001_installFormSubmitTrigger();
  PRODUCT001_installApprovalEditTrigger();
  PRODUCT001_syncApprovedFixtures(false);
  PRODUCT001_syncResultFormFixtures();

  SpreadsheetApp.getUi().alert('Product 001 Form installed or repaired. The Form is now linked to this workbook.');
}

function PRODUCT001_transferGeneratedFixtures() {
  const ui = SpreadsheetApp.getUi();
  const builder = PRODUCT001_getSheet_(PRODUCT001.builderSheet);
  const fixtures = PRODUCT001_getSheet_(PRODUCT001.fixturesSheet);
  const responses = PRODUCT001_getResponseSheet_();
  const review = PRODUCT001_getSheet_(PRODUCT001.resultReviewSheet);
  const status = String(builder.getRange('C16').getDisplayValue()).trim();
  const count = Number(builder.getRange('C14').getValue());

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

  const responseHasData = responses.getLastRow() > 1;
  const reviewHasData = review.getRange(5, 2, 200, 1).getValues().some(function(row) {
    return row[0] !== '';
  });
  if (responseHasData || reviewHasData) {
    ui.alert(
      'Transfer stopped',
      'Existing Form responses or Result Review submissions were found. Replacing fixtures after results exist can break Match ID links. Start a clean testing copy, archive the responses, or clear the test submissions before replacing fixtures.',
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

  const values = builder.getRange(18, 3, count, 8).getValues();
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

function PRODUCT001_syncResultFormFixtures(showAlert) {
  showAlert = showAlert !== false;
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  const fixtures = PRODUCT001_getSheet_(PRODUCT001.fixturesSheet);
  const formId = String(setup.getRange(PRODUCT001.config.formId).getValue()).trim();

  if (!formId) {
    throw new Error('No Form ID found. Run Product 001 > Install or Repair Form first.');
  }

  const form = FormApp.openById(formId);
  const data = fixtures.getRange(5, 13, 200, 2).getDisplayValues();
  const labels = data
    .filter(function(row) { return row[0] && row[1] === 'Yes'; })
    .map(function(row) { return row[0]; });

  const fixtureItem = PRODUCT001_getOrCreateListItem_(form, 'Fixture Selection');
  if (labels.length) {
    fixtureItem.setChoiceValues(labels);
    form.setAcceptingResponses(true);
  } else {
    fixtureItem.setChoiceValues(['No fixtures currently available - complete Fixtures first']);
    form.setAcceptingResponses(false);
    form.setCustomClosedFormMessage('No fixtures are currently available. Complete and sync the Fixtures sheet first.');
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
  PRODUCT001_prepareResponseProcessingColumns_();

  const lastRow = responses.getLastRow();
  if (lastRow < 2) {
    setup.getRange(PRODUCT001.config.lastProcessingStatus).setValue('No response rows to process');
    return;
  }

  const lastCol = Math.max(responses.getLastColumn(), PRODUCT001.processingColumns.message);
  const headers = responses.getRange(1, 1, 1, lastCol).getDisplayValues()[0];
  const rows = responses.getRange(2, 1, lastRow - 1, lastCol).getValues();
  let processed = 0;
  let skipped = 0;

  rows.forEach(function(row, index) {
    const sheetRow = index + 2;
    const processingStatus = String(row[PRODUCT001.processingColumns.status - 1] || '').trim();
    if (processingStatus === 'Processed') {
      skipped++;
      return;
    }

    try {
      const timestamp = PRODUCT001_valueByHeader_(headers, row, ['Timestamp']);
      const submissionType = PRODUCT001_valueByHeader_(headers, row, ['Submission Type']) || 'New Result';
      const fixtureSelection = PRODUCT001_valueByHeader_(headers, row, ['Fixture Selection']);
      const matchId = PRODUCT001_extractMatchId_(fixtureSelection);
      const matchStatus = PRODUCT001_valueByHeader_(headers, row, ['Match Status']) || 'Played';
      const homeScore = PRODUCT001_valueByHeader_(headers, row, ['Home Score']);
      const awayScore = PRODUCT001_valueByHeader_(headers, row, ['Away Score']);
      const optionalScorers = PRODUCT001_valueByHeader_(headers, row, ['Optional Scorer Text']);
      const walkoverWinner = PRODUCT001_valueByHeader_(headers, row, ['Walkover Winner']);
      const matchDate = PRODUCT001_valueByHeader_(headers, row, ['Match Date / Relevant Date', 'Match Date Played']);
      const submittedBy = PRODUCT001_valueByHeader_(headers, row, ['Submitted By']);
      const submitterRole = PRODUCT001_valueByHeader_(headers, row, ['Submitter Role']);
      const notes = PRODUCT001_valueByHeader_(headers, row, ['Notes']);
      const evidence = PRODUCT001_valueByHeader_(headers, row, ['Evidence Link']);

      if (!matchId) {
        throw new Error('Could not extract Match ID from Fixture Selection.');
      }

      const reviewRow = PRODUCT001_nextEmptyReviewRow_(review);
      if (!reviewRow) {
        throw new Error('No empty Result Review rows are available.');
      }

      const submissionId = PRODUCT001_nextSubmissionId_(review);
      review.getRange(reviewRow, 1, 1, 4).setValues([[timestamp || new Date(), submissionId, submissionType, matchId]]);
      review.getRange(reviewRow, 8, 1, 11).setValues([[homeScore, awayScore, matchStatus, walkoverWinner, matchDate, submittedBy, submitterRole, notes, optionalScorers, evidence, 'Pending Review']]);

      responses.getRange(sheetRow, PRODUCT001.processingColumns.status, 1, 5).setValues([['Processed', submissionId, reviewRow, new Date(), 'Written to Result Review']]);
      processed++;
    } catch (err) {
      responses.getRange(sheetRow, PRODUCT001.processingColumns.status, 1, 5).setValues([['Error', '', '', new Date(), err.message]]);
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
    'Approved Current Results: ' + reports.getRange('B7').getDisplayValue(),
    'Fixtures Included In Form Sync: ' + reports.getRange('B8').getDisplayValue(),
    'Validation Issues: ' + reports.getRange('B9').getDisplayValue(),
    'Validation status cells are on the Validation sheet.'
  ].join('\n');
  SpreadsheetApp.getUi().alert(message);
}

function PRODUCT001_buildCanonicalFormItems_(form) {
  PRODUCT001_getOrCreateListItem_(form, 'Submission Type').setChoiceValues(['New Result', 'Correction to Previous Result']).setRequired(true);
  PRODUCT001_getOrCreateListItem_(form, 'Fixture Selection').setChoiceValues(['No fixtures currently available - complete Fixtures first']).setRequired(true);
  PRODUCT001_getOrCreateListItem_(form, 'Match Status').setChoiceValues(['Played', 'Postponed', 'Void', 'Walkover', 'Abandoned']).setRequired(true);
  PRODUCT001_getOrCreateTextItem_(form, 'Home Score').setRequired(false);
  PRODUCT001_getOrCreateTextItem_(form, 'Away Score').setRequired(false);
  PRODUCT001_getOrCreateParagraphItem_(form, 'Optional Scorer Text').setRequired(false);
  PRODUCT001_getOrCreateTextItem_(form, 'Walkover Winner').setRequired(false);
  PRODUCT001_getOrCreateDateItem_(form, 'Match Date / Relevant Date').setRequired(false);
  PRODUCT001_getOrCreateTextItem_(form, 'Submitted By').setRequired(true);
  PRODUCT001_getOrCreateListItem_(form, 'Submitter Role').setChoiceValues(['Competition Admin', 'Match Official', 'Team Official', 'Other']).setRequired(true);
  PRODUCT001_getOrCreateParagraphItem_(form, 'Notes').setRequired(false);
  PRODUCT001_getOrCreateTextItem_(form, 'Evidence Link').setRequired(false);
}

function PRODUCT001_prepareResponseProcessingColumns_() {
  const responses = PRODUCT001_getResponseSheet_();
  responses.getRange(1, PRODUCT001.processingColumns.status, 1, 5).setValues([['Processing Status', 'Generated Submission ID', 'Result Review Row', 'Processed At', 'Processing Message']]);
}

function PRODUCT001_getResponseSheet_() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const setup = PRODUCT001_getSheet_(PRODUCT001.setupSheet);
  const configuredName = String(setup.getRange(PRODUCT001.config.formResponseSheet).getValue()).trim();
  return ss.getSheetByName(configuredName) || ss.getSheetByName(PRODUCT001.formResponsesSheet);
}

function PRODUCT001_getSheet_(sheetName) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(sheetName);
  if (!sheet) {
    throw new Error('Missing sheet: ' + sheetName);
  }
  return sheet;
}

function PRODUCT001_getOrCreateListItem_(form, title) {
  const item = form.getItems(FormApp.ItemType.LIST).filter(function(candidate) { return candidate.getTitle() === title; })[0];
  return item ? item.asListItem() : form.addListItem().setTitle(title);
}

function PRODUCT001_getOrCreateTextItem_(form, title) {
  const item = form.getItems(FormApp.ItemType.TEXT).filter(function(candidate) { return candidate.getTitle() === title; })[0];
  return item ? item.asTextItem() : form.addTextItem().setTitle(title);
}

function PRODUCT001_getOrCreateParagraphItem_(form, title) {
  const item = form.getItems(FormApp.ItemType.PARAGRAPH_TEXT).filter(function(candidate) { return candidate.getTitle() === title; })[0];
  return item ? item.asParagraphTextItem() : form.addParagraphTextItem().setTitle(title);
}

function PRODUCT001_getOrCreateDateItem_(form, title) {
  const item = form.getItems(FormApp.ItemType.DATE).filter(function(candidate) { return candidate.getTitle() === title; })[0];
  return item ? item.asDateItem() : form.addDateItem().setTitle(title);
}

function PRODUCT001_valueByHeader_(headers, row, names) {
  for (let i = 0; i < names.length; i++) {
    const index = headers.indexOf(names[i]);
    if (index !== -1) {
      return row[index];
    }
  }
  return '';
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
