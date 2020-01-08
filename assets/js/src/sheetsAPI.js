import setSheetParameters from './setSheetParameters.js';
//import createTableElements from './createTableElements.js';

function start() {
  const params = {
    'apiKey': 'AIzaSyA9KBsT5FVDt1HVdWhimXJTw76xRrKlxZg',
    'discoveryDocs': ['https://www.googleapis.com/discovery/v1/apis/sheets/v4/rest']
  };
  const sheetParams = setSheetParameters();
  //console.log(sheetParams);
  gapi.client.init(params).then(function() { // Executes an API request, and returns a Promise.
    function execute() {
      return gapi.client.sheets.spreadsheets.values.get(sheetParams)
        .then(function(response) {
          let createTablePromise = new Promise((resolve, reject) => {
            console.log(response);
            // Do stuff with the response here
            // returned array of arrays w/ values = response.result.values
            resolve();
          });
          createTablePromise.then(() => {
            let dataTablesPromise = new Promise((resolve, reject) => {
              // Do stuff here, after whatever you did with the resonse earlier
              // E.g. slick slider or dataTables stuffs
              resolve();
            });
            dataTablesPromise.then(() => {
              // Do stuff here after the previous promise is resolved
              // E.g. Replace the dataTables placeholder text
              //document.querySelector('input[type="search"].form-control').setAttribute('placeholder', 'Search roster...');
            });
          });
        },
        function(err) {
          console.error("Execute error", err);
        });
    }
    execute();
  });
}
// Loads the JavaScript client library and invokes `start` afterwards.
//    Usage:
//  gapi.load('client', start);
export default start;
