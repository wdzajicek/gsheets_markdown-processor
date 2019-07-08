function replaceMarkdown(val, reg, value) {
  let heading = document.createElement(value);
  heading.innerHTML = val.replace(reg, '');
  console.log(heading);
  return heading;
}
function createHeadings(val) {
  console.log('VAL = ' + val);
  const headingObject =
  {
    '^#\\s':'h1',
    '^##\\s':'h2',
    '^###\\s':'h3',
    '^####\\s':'h4',
    '^#####\\s':'h5',
    '^######\\s':'h6'
  }
  for (var key in headingObject) {
    if (headingObject.hasOwnProperty(key)) {
      let reg = new RegExp(key, 'g');
      let test = reg.test(val);
      test ?
        val = replaceMarkdown(val, reg, headingObject[key])
      : null;
    }
  }
}

function markdownify(val) {
  console.log(val);
  const lineEnding = /\n/g;
  const lines = val.split(lineEnding);
  for (var i = 0; i < lines.length; i++) {
    let line = lines[i];
    createHeadings(line);
  }
}

export default markdownify;
