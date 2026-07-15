/**
 * LEGACY JUNE PROTOTYPE ARTIFACT.
 * Do not install this file as the current Product 001 Code.gs source.
 * Use product001_apps_script_automation_v0_1_2.gs as the stable July checkpoint,
 * then replace that checkpoint with the final exported bound script after the
 * current Form revision is complete.
 */
/**
 * Product 001 - One-Time Google Form Installer
 *
 * Bind this script to the master spreadsheet. Run setupCompetitionResultForm(),
 * submit a test response, run verifyCompetitionResultFormSetup(), then run
 * publishCompetitionResultForm(). Delete this installer file after verification.
 * Keep form_fixture_sync.gs only if automatic fixture-choice updates are wanted.
 */

const FORM_SETUP = {
  spreadsheetId: "1a-oUlX_yVpSRbito9zdNWfFXj3x8GOcJOSIrnrlZqDg",
  formTitle: "Competition Result Submission",
  setupSheetName: "Setup",
  fixturesSheetName: "Fixtures",
  headerRow: 4,
  pendingFormProperty: "PRODUCT001_PENDING_FORM_ID",
  settings: {
    formId: "Google Form ID",
    editUrl: "Google Form Edit URL",
    responseUrl: "Google Form Response URL",
    responseSheet: "Google Form Response Sheet",
    status: "Google Form Setup Status",
  },
};

function setupCompetitionResultForm() {
  const spreadsheet = getMasterSpreadsheet_();
  const setupSheet = requireSheet_(spreadsheet, FORM_SETUP.setupSheetName);
  ensureFormSettings_(setupSheet);

  const existingFormId = getSetupValue_(setupSheet, FORM_SETUP.settings.formId);
  if (existingFormId) {
    const existingForm = FormApp.openById(existingFormId);
    verifyFormDestination_(existingForm, spreadsheet.getId());
    throw new Error(`A connected Form already exists: ${existingForm.getEditUrl()}`);
  }

  const choices = getEligibleFixtureChoices_(spreadsheet);
  const properties = PropertiesService.getScriptProperties();
  const pendingId = properties.getProperty(FORM_SETUP.pendingFormProperty);
  const form = pendingId ? FormApp.openById(pendingId) : createPendingForm_(properties);

  rebuildForm_(form, choices);
  const responseSheetName = connectResponseDestination_(form, spreadsheet);
  verifyFormDestination_(form, spreadsheet.getId());
  recordFormMetadata_(setupSheet, form, responseSheetName, "Connected - unpublished");
  properties.deleteProperty(FORM_SETUP.pendingFormProperty);

  console.log(`Form created and connected: ${form.getEditUrl()}`);
  return form.getId();
}

function verifyCompetitionResultFormSetup() {
  const spreadsheet = getMasterSpreadsheet_();
  const setupSheet = requireSheet_(spreadsheet, FORM_SETUP.setupSheetName);
  ensureFormSettings_(setupSheet);
  const form = getRecordedForm_(setupSheet);

  verifyFormDestination_(form, spreadsheet.getId());
  verifyRequiredQuestions_(form);
  if (findInstallerListItemByTitle_(form, "Fixture Selection").getChoices().length === 0) {
    throw new Error("Fixture Selection has no choices.");
  }

  const responseSheetName = getSetupValue_(setupSheet, FORM_SETUP.settings.responseSheet);
  if (!responseSheetName || !spreadsheet.getSheetByName(responseSheetName)) {
    throw new Error("The recorded Form response sheet was not found.");
  }

  const isPublished = form.supportsAdvancedResponderPermissions()
    ? form.isPublished()
    : form.isAcceptingResponses();
  recordFormMetadata_(
    setupSheet,
    form,
    responseSheetName,
    isPublished ? "Verified - published" : "Verified - unpublished"
  );
  console.log("Form structure and Sheet connection verified.");
  return true;
}

function publishCompetitionResultForm() {
  const spreadsheet = getMasterSpreadsheet_();
  const setupSheet = requireSheet_(spreadsheet, FORM_SETUP.setupSheetName);
  const form = getRecordedForm_(setupSheet);

  verifyCompetitionResultFormSetup();
  if (form.supportsAdvancedResponderPermissions()) {
    form.setPublished(true);
  } else {
    form.setAcceptingResponses(true);
  }

  recordFormMetadata_(
    setupSheet,
    form,
    getSetupValue_(setupSheet, FORM_SETUP.settings.responseSheet),
    "Published"
  );
  console.log(`Published Form: ${form.getPublishedUrl()}`);
  return form.getPublishedUrl();
}

function upgradeCompetitionResultFormToSelectiveSections() {
  const spreadsheet = getMasterSpreadsheet_();
  const setupSheet = requireSheet_(spreadsheet, FORM_SETUP.setupSheetName);
  const form = getRecordedForm_(setupSheet);
  const responseCount = form.getResponses().length;

  if (responseCount > 0) {
    throw new Error(
      `The Form contains ${responseCount} response(s). Delete the prototype test response in Google Forms and clear its test row from the response sheet before running this upgrade.`
    );
  }

  const choices = getEligibleFixtureChoices_(spreadsheet);
  rebuildForm_(form, choices);
  verifyFormDestination_(form, spreadsheet.getId());
  verifyRequiredQuestions_(form);
  recordFormMetadata_(
    setupSheet,
    form,
    getSetupValue_(setupSheet, FORM_SETUP.settings.responseSheet),
    "Selective sections installed - unpublished"
  );
  console.log("Selective Match Status sections installed. Review the Form, then verify and publish it again.");
  return form.getEditUrl();
}
function createPendingForm_(properties) {
  const form = FormApp.create(FORM_SETUP.formTitle, false);
  properties.setProperty(FORM_SETUP.pendingFormProperty, form.getId());
  return form;
}

function rebuildForm_(form, fixtureChoices) {
  form.getItems().forEach((item) => form.deleteItem(item));
  form
    .setTitle(FORM_SETUP.formTitle)
    .setDescription("Submit a new football match result or a correction. Select the fixture carefully using its date and Match ID. The Form will show only the fields relevant to the selected match status.")
    .setConfirmationMessage("Submission received. The competition administrator will review it before official results and standings update.")
    .setCollectEmail(false)
    .setAllowResponseEdits(false)
    .setLimitOneResponsePerUser(false)
    .setProgressBar(true)
    .setPublishingSummary(false)
    .setShowLinkToRespondAgain(true)
    .setShuffleQuestions(false);

  if (form.supportsAdvancedResponderPermissions()) form.setPublished(false);
  else form.setAcceptingResponses(false);

  form.addMultipleChoiceItem().setTitle("Submission Type")
    .setChoiceValues(["New Result", "Correction to Previous Result"]).setRequired(true);
  form.addListItem().setTitle("Fixture Selection")
    .setHelpText("Choose the date-first label carefully. The Match ID identifies the fixture.")
    .setChoiceValues(fixtureChoices).setRequired(true);
  const matchStatus = form.addMultipleChoiceItem().setTitle("Match Status").setRequired(true);

  const playedSection = form.addPageBreakItem()
    .setTitle("Played result")
    .setHelpText("Enter the final score for a played match.");
  form.addTextItem().setTitle("Home Score")
    .setHelpText("Enter a whole number of 0 or greater.").setRequired(true);
  form.addTextItem().setTitle("Away Score")
    .setHelpText("Enter a whole number of 0 or greater.").setRequired(true);
  form.addParagraphTextItem().setTitle("Optional Scorer Text")
    .setHelpText("Example: Player A 2; Player B 1. Structured leaderboard data is reviewed separately.").setRequired(false);

  const walkoverSection = form.addPageBreakItem()
    .setTitle("Walkover result")
    .setHelpText("Identify the winner using the selected fixture's home/away order.");
  form.addListItem().setTitle("Walkover Winner")
    .setChoiceValues(["Home Team", "Away Team"]).setRequired(true);

  const nonPlayedSection = form.addPageBreakItem()
    .setTitle("Non-played or interrupted match")
    .setHelpText("No score is required. Explain relevant circumstances in Notes.");

  const commonSection = form.addPageBreakItem()
    .setTitle("Submission details")
    .setHelpText("Complete the details used for review and accountability.");
  form.addDateItem().setTitle("Match Date / Relevant Date")
    .setHelpText("For played matches use the date played; otherwise use the relevant scheduled or incident date.")
    .setRequired(true);
  form.addTextItem().setTitle("Submitted By")
    .setHelpText("Name only. Do not enter contact or sensitive personal information.").setRequired(true);
  form.addMultipleChoiceItem().setTitle("Submitter Role")
    .setChoiceValues(["Team Coach", "Match Official", "Competition Admin", "Other"]).setRequired(true);
  form.addParagraphTextItem().setTitle("Notes")
    .setHelpText("Use for corrections, disputes, postponements, voids, abandonments or other relevant context.").setRequired(false);

  form.addTextItem().setTitle("Evidence Link")
    .setHelpText("Optional. Use only where consent and secure storage arrangements exist.").setRequired(false);

  matchStatus.setChoices([
    matchStatus.createChoice("Played", playedSection),
    matchStatus.createChoice("Walkover", walkoverSection),
    matchStatus.createChoice("Postponed", nonPlayedSection),
    matchStatus.createChoice("Void", nonPlayedSection),
    matchStatus.createChoice("Abandoned", nonPlayedSection),
  ]);

  // PageBreakItem navigation is configured on the break reached after a page.
  // These jumps stop Played from flowing into Walkover, and Walkover from
  // flowing into Non-played. Non-played proceeds naturally to common details.
  walkoverSection.setGoToPage(commonSection);
  nonPlayedSection.setGoToPage(commonSection);
}
function getEligibleFixtureChoices_(spreadsheet) {
  const sheet = requireSheet_(spreadsheet, FORM_SETUP.fixturesSheetName);
  const rows = sheet.getDataRange().getDisplayValues();
  const headers = rows[FORM_SETUP.headerRow - 1];
  const required = ["Home Team ID", "Home Team Display", "Away Team ID", "Away Team Display", "Venue Display", "Fixture Status", "Form Fixture Label", "Include In Form Sync"];
  const index = {};
  required.forEach((header) => {
    index[header] = headers.indexOf(header);
    if (index[header] === -1) throw new Error(`Required Fixtures header not found: ${header}`);
  });

  const choices = rows.slice(FORM_SETUP.headerRow).filter((row) => {
    const homeId = row[index["Home Team ID"]].trim();
    const awayId = row[index["Away Team ID"]].trim();
    const home = row[index["Home Team Display"]].trim();
    const away = row[index["Away Team Display"]].trim();
    return row[index["Include In Form Sync"]].trim() === "Yes" &&
      row[index["Fixture Status"]].trim() === "Scheduled" &&
      homeId && awayId && homeId !== "TBD" && awayId !== "TBD" && homeId !== awayId &&
      home && away && home !== away && row[index["Venue Display"]].trim() &&
      row[index["Form Fixture Label"]].trim();
  }).map((row) => row[index["Form Fixture Label"]].trim());

  const unique = [...new Set(choices)];
  if (unique.length === 0) throw new Error("No valid scheduled fixtures are eligible for Form sync.");
  return unique;
}

function connectResponseDestination_(form, spreadsheet) {
  const before = new Set(spreadsheet.getSheets().map((sheet) => sheet.getSheetId()));
  form.setDestination(FormApp.DestinationType.SPREADSHEET, spreadsheet.getId());
  for (let attempt = 0; attempt < 10; attempt += 1) {
    SpreadsheetApp.flush();
    const responseSheet = spreadsheet.getSheets().find((sheet) => !before.has(sheet.getSheetId()));
    if (responseSheet) return responseSheet.getName();
    Utilities.sleep(500);
  }
  throw new Error("Destination was set, but the new response sheet could not be identified. Check the spreadsheet before rerunning.");
}

function verifyFormDestination_(form, spreadsheetId) {
  if (form.getDestinationType() !== FormApp.DestinationType.SPREADSHEET || form.getDestinationId() !== spreadsheetId) {
    throw new Error("The Form is not connected to the expected master spreadsheet.");
  }
}

function verifyRequiredQuestions_(form) {
  const expectedQuestions = [
    "Submission Type", "Fixture Selection", "Match Status", "Home Score", "Away Score",
    "Walkover Winner", "Match Date / Relevant Date", "Submitted By", "Submitter Role",
    "Notes", "Optional Scorer Text", "Evidence Link"
  ];
  const actualQuestions = form.getItems().map((item) => item.getTitle());
  expectedQuestions.forEach((title) => {
    if (!actualQuestions.includes(title)) throw new Error(`Required Form item not found: ${title}`);
  });

  const expectedSections = ["Played result", "Walkover result", "Non-played or interrupted match", "Submission details"];
  const sections = form.getItems(FormApp.ItemType.PAGE_BREAK).map((item) => item.asPageBreakItem().getTitle());
  expectedSections.forEach((title) => {
    if (!sections.includes(title)) throw new Error(`Required Form section not found: ${title}`);
  });

  const statusMatches = form.getItems(FormApp.ItemType.MULTIPLE_CHOICE)
    .filter((item) => item.getTitle() === "Match Status");
  if (statusMatches.length !== 1) throw new Error(`Expected one Match Status question, found ${statusMatches.length}.`);
  const routes = Object.fromEntries(statusMatches[0].asMultipleChoiceItem().getChoices().map((choice) => [
    choice.getValue(),
    choice.getGotoPage() ? choice.getGotoPage().getTitle() : "",
  ]));
  const expectedRoutes = {
    Played: "Played result",
    Walkover: "Walkover result",
    Postponed: "Non-played or interrupted match",
    Void: "Non-played or interrupted match",
    Abandoned: "Non-played or interrupted match",
  };
  Object.entries(expectedRoutes).forEach(([status, section]) => {
    if (routes[status] !== section) throw new Error(`Match Status route is wrong for ${status}.`);
  });
}
function ensureFormSettings_(setupSheet) {
  Object.values(FORM_SETUP.settings).forEach((settingName) => {
    if (!findSetupRow_(setupSheet, settingName)) {
      setupSheet.appendRow([settingName, settingName === FORM_SETUP.settings.status ? "Not installed" : "", "Managed by the one-time Form installer."]);
    }
  });
}

function getMasterSpreadsheet_() {
  const active = SpreadsheetApp.getActiveSpreadsheet();
  return active && active.getId() === FORM_SETUP.spreadsheetId ? active : SpreadsheetApp.openById(FORM_SETUP.spreadsheetId);
}

function getRecordedForm_(setupSheet) {
  const formId = getSetupValue_(setupSheet, FORM_SETUP.settings.formId);
  if (!formId) throw new Error("No Google Form ID is recorded in Setup. Run setupCompetitionResultForm first.");
  return FormApp.openById(formId);
}

function recordFormMetadata_(setupSheet, form, responseSheetName, status) {
  setSetupValue_(setupSheet, FORM_SETUP.settings.formId, form.getId());
  setSetupValue_(setupSheet, FORM_SETUP.settings.editUrl, form.getEditUrl());
  setSetupValue_(setupSheet, FORM_SETUP.settings.responseUrl, form.getPublishedUrl());
  setSetupValue_(setupSheet, FORM_SETUP.settings.responseSheet, responseSheetName);
  setSetupValue_(setupSheet, FORM_SETUP.settings.status, status);
}

function getSetupValue_(sheet, settingName) {
  const row = findSetupRow_(sheet, settingName);
  return row ? String(sheet.getRange(row, 2).getDisplayValue()).trim() : "";
}

function setSetupValue_(sheet, settingName, value) {
  const row = findSetupRow_(sheet, settingName);
  if (!row) throw new Error(`Setup setting not found: ${settingName}`);
  sheet.getRange(row, 2).setValue(value);
}

function findSetupRow_(sheet, settingName) {
  const values = sheet.getRange(1, 1, sheet.getLastRow(), 1).getDisplayValues().flat();
  const index = values.indexOf(settingName);
  return index === -1 ? null : index + 1;
}

function requireSheet_(spreadsheet, sheetName) {
  const sheet = spreadsheet.getSheetByName(sheetName);
  if (!sheet) throw new Error(`Sheet not found: ${sheetName}`);
  return sheet;
}

function findInstallerListItemByTitle_(form, title) {
  const matches = form.getItems(FormApp.ItemType.LIST).filter((item) => item.getTitle() === title);
  if (matches.length !== 1) throw new Error(`Expected one dropdown titled "${title}", found ${matches.length}.`);
  return matches[0].asListItem();
}




