function createHeadings(val) {
  const headingObject =
  {
    '#':'h1',
    '##':'h2',
    '###':'h3',
    '####':'h4',
    '#####':'h5',
    '######':'h6'
  }
  for (var i = 0; i < headingObject.length; i++) {
    headingObject[i];
  }
}

function markdownify(val) {
  console.log(val);
  const lineEnding = /\n/g;
  const lines = val.split(lineEnding);
  for (var i = 0; i < lines.length; i++) {
    let line = lines[i];
    console.log(line);
    createHeadings(line);
  }
}

export default markdownify;
