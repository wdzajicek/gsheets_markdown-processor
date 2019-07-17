function testLineForMarkdown(line, expr) {
  /*
switch (expr) {
    case 'testOne':

      break;
      case 'testTwo':

      break;
    default:

  }*/


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
    'h': /^#/g,
    'p': /^.[^#`\d->]/g,
    'inline': /^\*/g,
    'hr': /^---/g,
    'ul': /^-\s\S.+/g,
    'ol': /^\d\d?\.\s\S.+/g,
    'code': /^`.+/g,
    'codeBlock': /^```/g
  }
  const hTest = firstCharTest['h'].test(line);
  const pTest = firstCharTest['p'].test(line);
  const inlineTest = firstCharTest['inline'].test(line);
  const hrTest = firstCharTest['hr'].test(line);
  const ulTest = firstCharTest['ul'].test(line);
  const olTest = firstCharTest['ol'].test(line);
  const codeTest = firstCharTest['code'].test(line);
  const codeBlockTest = firstCharTest['codeBlock'].test(line);

  hTest ? checkForHeadings(line)
  : pTest ?

  //console.log(headingTest);
   /*
for (var test in firstCharTest) {
    if (firstCharTest.hasOwnProperty(test)) {
      console.log(test);
      let reg = new RegExp(test, 'g');
      let matchFirstCharTest = reg.test(line);
      matchFirstCharTest ?
        line = testMarkdownType(line, )
      : null;
    }
  }*/


}

function parseLines(lineArray) {
  // TODO:
  // Test each lineArray for the precense of any markdown
  // that may potentially have a non-blank line following it.
  // e.g.:
  //
  // # heading 1
  // ## Heading 2
  //
  // *em*
  // **strong**
  // ***both***
  //
  // ---
  // \*escaped characters \*\#\1.\-
  // `code`
  // ```
  // code block
  // more code
  // ```
  //
  // > Blockquotes
  // >
  // > continued blockquote
  //
  // - list items
  // - list items
  //
  // 1. Line starting with '1. ' (ordered list)
  // 2. Second list item
  //
  let lineHTML = '';
  for (var i = 0; i < lineArray.length; i++) {
    let lineContents, expr;
    let line = lineArray[i];
    let nextLine = lineArray[i + 1];
    let lineIsNotBlank = line != '';
    let nextLineIsNotBlank = nextLine != '';
    if (lineIsNotBlank) {
      if (nextLineIsNotBlank) {
        lineContents = [line];
        expr = 'testOne';
        testLineForMarkdown(lineContents, expr);
      } else {
        lineContents = [line, nextLine];
        expr = 'testTwo';
        testLineForMarkdown(lineContents, expr);
      }
    }
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
