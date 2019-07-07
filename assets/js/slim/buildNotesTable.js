import markdownify from './markdownify.js';

function createTable(parent) {
  const table = document.createElement('table');
  table.classList.add('display', 'table', 'table-striped', 'table-hover');
  table.setAttribute('width', '100%');
  table.setAttribute('id', 'responsiveTable');
  parent.innerHTML = '';
  parent.appendChild(table);
  return table;
}

function createTableHead(table) {
  const thead = document.createElement('thead');
  table.appendChild(thead);
  return thead;
}

function createTableBody(table) {
  const tbody = document.createElement('tbody');
  table.appendChild(tbody);
  return tbody;
 }

 function createHeadingCells(tr, val) {
   const th = document.createElement('th');
   tr.appendChild(th);
   val = val + ':';
   th.innerHTML = val;
   return th;
 }

 function createHeadingRow(thead, data) {
   const tr = document.createElement('tr');
   thead.appendChild(tr);
   for (var i = 0; i < data.length; i++) {
     createHeadingCells(tr, data[i]);
   }
   return tr;
 }

 function createBodyRow(tbody, data) {
   const tr = document.createElement('tr');
   tbody.appendChild(tr);
   for (var i = 0; i < data.length; i++) {
     createCells(tr, data[i]);
   }
   return tr;
 }

 function createCells(tr, val) {
   markdownify(val);
   const td = document.createElement('td');
   tr.appendChild(td);
   td.innerHTML = val;
   return td;
 }

function buildTableTwo(response) {
  console.log(response);
  const parent = document.getElementById('notesTable');
  const table = createTable(parent);
  const thead = createTableHead(table);
  const tbody = createTableBody(table);

  let data = response.result.values;
  let dataLength = data.length;
  let headingData = data[0];
  let tableData = data.slice(1, dataLength); // is an array of arrays
  createHeadingRow(thead, headingData);

  for (let i = 0; i < tableData.length; i++) {
    let rowData = tableData[i];
    createBodyRow(tbody, tableData[i]);
  }
}

export default buildTableTwo;
