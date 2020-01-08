function setSheetParameters() {
  let sheetParams = {}; // The thing we are here for
  const host = window.location.host + '/';
  const url = window.location.href.replace(/(^\w+:|^)\/\//, '');
  // Conditions
  const urlIsSheetsProject = url.indexOf('/projects/sheets') > -1;
  const urlIsIndex = url === host;
  // Sheet Keys
  const sheetKey = '1oB-GGFn4VeWxXrwKT6_Xs0ivenLd081qXQJFXSQo0dM';
  const sheetTab = 'TODO';

  function setStatParams() {
    setRange([]);
    sheetParams.includeGridData = false;
  }

  function setId(i) {
    sheetParams.spreadsheetId = i;
  }

  function setRange(r) {
    sheetParams.range = r;
  }

  function setParams(r,t) {
    setId(r);
    setRange(t);
  }
  urlIsSheetsProject ? setParams(sheetKey ,sheetTab) : null;

  console.log(sheetParams);
  return sheetParams;
}
//
//  USAGE:
//    const sheetParams = setSheetParameters();
//
export default setSheetParameters;
