function parseLines(lineArray) {
  let lineHTML = '';
  for (var i = 0; i < lineArray.length; i++) {
    let line = lineArray[i];
    let nextLine = lineArray[i + 1];
    let lineIsBlank = line != '';
    let nextLineIsBlank = nextLine != '';
    lineIsBlank ?
      lineHTML += checkForHeadings(line) + '\n'
    : null;
  }
  return lineHTML;
}

function checkForHeadings(line) {
  const headingObject = {
    '^#\\s':'h1',
    '^##\\s':'h2',
    '^###\\s':'h3',
    '^####\\s':'h4',
    '^#####\\s':'h5',
    '^######\\s':'h6'
  }
  const lineStartTest = {
    'oList': '^\\d\\d?\\.\\s\\S.+',
    'uList': '^-\\s\\S.+',
    'nestedOl': '^\\d\\d?\\.\\s\\s\\s\\s\\S.+',
    'nestedUl': '^-\\s\\s\\s\\s\\S.+',
    'nestedItem': '^\\s\\s\\s\\s\\S.+',
    'blockquote': '^>\\s\\S',
    'nestedBlockquote': '^>\\s>\\S.+',
    'hr': '^---'
  }
  const firstCharTest = {
    'code': '^`.+',
    'codeBlock': '^```',
    'heading': '^#',
    'oList': '^\\d\\d?\\.\\s\\S.+',
    'uList': '^-\\s\\S.+'
  }

  for (var key in headingObject) {
    if (headingObject.hasOwnProperty(key)) {
      let reg = new RegExp(key, 'g');
      let lineContainsMarkdownHeading = reg.test(line);
      lineContainsMarkdownHeading ?
        line = createHeading(line, reg, headingObject[key])
      : null;
    }
  }
  return line;
}

function createHeading(line, reg, value) {
  let heading = document.createElement(value);
  heading.innerHTML = line.replace(reg, '');
  return heading.outerHTML;
}

function markdownify(val) {
  //console.log(val);
  const lineEnding = /\n/g;
  const lines = val.split(lineEnding);
  let newVal = parseLines(lines);
  return newVal;
}

export default markdownify;
