function testForMarkdown(line) {

}

function loopMarkdownArray(markdownArray) {
  let newArray = [];
  for (var i = 0; i < markdownArray.length; i++) {
    let prevLine = markdownArray[i - 1];
    let nextLine = markdownArray[i + 1];
    let line = markdownArray[i];
    let nextLineIsBlank = nextLine === '';
    let lineIsNotBlank = line !== '';
    let prevLineIsNotBlank = prevLine !== '';
    let nextLineIsNotBlank = nextLine !== '';
    if (lineIsNotBlank) {
      if (prevLineIsNotBlank) {
        if (nextLineIsNotBlank) {
          // In-the-middle list items
        } else {
          // Last list item stuff here
        }
      } else if (nextLineIsBlank) {
        // Do single-list-item list stuff here
      } else {
        // Do previous line is blank stuff here
        // (first list item)
      }
    }
    line =  testForMarkdown(line);
    newArray.push(line)
  }
}

function createHeadingHTML(markdown, el, regEx) {
  let output;
  output = markdown.replace(regEx, '<' + el + '>$<text></' + el + '>');
  return output;
}

function createInlineHTML(markdown, el, regEx) {
  let output;
  switch (el) {
    case 'both':
    case '_both':
      output = markdown.replace(regEx, '<strong><em>$<text></em></strong>');
      return output;
      break;
    case 'strong':
    case '_strong':
      output = markdown.replace(regEx, '<strong>$<text></strong>');
      return output;
      break;
    case 'em':
    case '_em':
      output = markdown.replace(regEx, '<em>$<text></em>');
      return output;
      break;
  }
}

function markdownify(input) {
  let markdown = input.toString();
  console.log(input);
  const headingMarkdown = {
    'h1': /^#\s(?<text>.+)/gm,
    'h2': /^##\s(?<text>.+)/gm,
    'h3': /^###\s(?<text>.+)/gm,
    'h4': /^####\s(?<text>.+)/gm,
    'h5': /^#####\s(?<text>.+)/gm,
    'h6': /^######\s(?<text>.+)/gm,
  }
  const inlineMarkdown = {
    'both': /\*\*\*(?<text>.+)\*\*\*/g,
    'strong': /\*\*(?<text>.+)\*\*/g,
    'em': /\*(?<text>.+)\*/g,
    '_both': /___(?<text>.+)___/g,
    '_strong': /__(?<text>.+)__/g,
    '_em': /_(?<text>.+)_/g
  }
  for (var key in headingMarkdown) {
    if (headingMarkdown.hasOwnProperty(key)) {
      markdown = createHeadingHTML(markdown, key, headingMarkdown[key]);
    }
  }
  for (var key in inlineMarkdown) {
    if (inlineMarkdown.hasOwnProperty(key)) {
      markdown = createInlineHTML(markdown, key, inlineMarkdown[key]);
    }
  }
  markdown = markdown.replace(/^(?<text>[^-#\d><\s].+)/gm, '<p>$<text></p>');
  markdown = markdown.replace(/^---/gm, '<hr>');
  let markdownArray = markdown.split(/\n/g);
  console.log(markdownArray);
  loopMarkdownArray(markdownArray)
  return markdown;
}

export default markdownify;
