/**
 * LEGACY JUNE PROTOTYPE ARTIFACT.
 * Do not install this file as the current Product 001 Code.gs source.
 * Use product001_apps_script_automation_v0_1_2.gs as the stable July checkpoint,
 * then replace that checkpoint with the final exported bound script after the
 * current Form revision is complete.
 */
/**
 * Product 001 - Form Fixture Sync
 *
 * Optional retained v1.0 helper. It only refreshes the Form's Fixture Selection
 * dropdown from valid scheduled fixtures. It does not handle approvals,
 * standings, official results, scorer logic or other business rules.
 */

const CONFIG = {
  spreadsheetId: "1a-oUlX_yVpSRbito9zdNWfFXj3x8GOcJOSIrnrlZqDg",
  setupSheetName: "Setup",
  formIdSettingName: "Google Form ID",
  fixturesSheetName: "Fixtures",
  targetFormQuestionTitle: "Fixture Selection",
  headerRow: 4,
};

function syncFixtureChoicesToForm() {
  const spreadsheet = SpreadsheetApp.openById(CONFIG.spreadsheetId);
  const formId = getConfiguredFormId_(spreadsheet);
  const choices = getValidFixtureChoicesForSync_(spreadsheet);
  const form = FormApp.openById(formId);
  const item = findListItemByTitle_(form, CONFIG.targetFormQuestionTitle);
  item.setChoiceValues(choices);
  console.log(`Synced ${choices.length} fixture choices.`);
}

function getValidFixtureChoicesForSync_(spreadsheet) {
  const sheet = spreadsheet.getSheetByName(CONFIG.fixturesSheetName);
  if (!sheet) throw new Error(`Sheet not found: ${CONFIG.fixturesSheetName}`);

  const rows = sheet.getDataRange().getDisplayValues();
  const headers = rows[CONFIG.headerRow - 1];
  const required = [
    "Home Team ID",
    "Home Team Display",
    "Away Team ID",
    "Away Team Display",
    "Venue Display",
    "Fixture Status",
    "Form Fixture Label",
    "Include In Form Sync",
  ];
  const index = {};
  required.forEach((header) => {
    index[header] = headers.indexOf(header);
    if (index[header] === -1) throw new Error(`Required Fixtures header not found: ${header}`);
  });

  const choices = rows.slice(CONFIG.headerRow).filter((row) => {
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

function getConfiguredFormId_(spreadsheet) {
  const setupSheet = spreadsheet.getSheetByName(CONFIG.setupSheetName);
  if (!setupSheet) throw new Error(`Sheet not found: ${CONFIG.setupSheetName}`);

  const match = setupSheet.getRange(1, 1, setupSheet.getLastRow(), 2)
    .getDisplayValues()
    .find((row) => row[0] === CONFIG.formIdSettingName);
  if (!match || !match[1]) {
    throw new Error(`No Form ID found in Setup setting "${CONFIG.formIdSettingName}". Run the one-time installer first.`);
  }
  return match[1].trim();
}

function findListItemByTitle_(form, title) {
  const matches = form.getItems(FormApp.ItemType.LIST).filter((item) => item.getTitle() === title);
  if (matches.length !== 1) throw new Error(`Expected one dropdown titled "${title}", found ${matches.length}.`);
  return matches[0].asListItem();
}
