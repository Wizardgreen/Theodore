
const getSheetData = () => {
  const ID = '1Phj43ppQcX_SDzb3Zbt_n4ZGCp35JAHUJ96uJSk7Cc0';
  const spreadsheet = SpreadsheetApp.openById(ID);
  const sheet = spreadsheet.getSheets()[0];
  const rowLength = sheet.getLastRow() - 1;
  const columnLength = sheet.getLastColumn();
  const data = sheet.getRange(1,1,rowLength,columnLength).getValues();
  return data;
}

const sheetDataToObjectList = (sheetData) => {
  const [nameList, ...raw] = sheetData;
  const formatted = raw.map((row) => {
    return nameList.reduce((acc, name, idx) => {
      return {...acc, [name]: row[idx]};
    }, {})
  })
  return formatted;
}

const objectListToSheetData = (objectList) => {
  const nameList = Object.keys(objectList[0]);
  // const 

}

console.log(sheetDataToObject(getSheetData()))