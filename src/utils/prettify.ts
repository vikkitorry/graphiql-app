export const prettify = (text: string) => {
  const indent = '  ';
  let indentIndex = 0;

  const arrayFromText = text
    .replaceAll(/[^\S\r\n]+/gm, ' ')
    .replaceAll(/[\n\r]+/gm, '')
    .replaceAll(/\s*:\s*/gm, ':')
    .replaceAll(/\s*,\s*/gm, ',')
    .replaceAll(/\s*\)\s*/gm, ')')
    .replaceAll(/\s*\(\s*/gm, '(')
    .replaceAll(/\s*\$\s*/gm, '$')
    .replaceAll(/\s*{\s*/gm, '{')
    .replaceAll(/\s*}\s*/gm, '}')
    .replaceAll(/[^\S\r\n](?=(?:[^'"`]*(['"`])[^'"`]*\1)*[^'"`]*$)/g, '\n')
    .replaceAll(/{(?=[^\)]*?(?:\(|$))/gm, '{\n')
    .replaceAll(/}(?=[^\)]*?(?:\(|$))/gm, '\n}\n')
    .split('\n');

  const prettifiedText = arrayFromText
    .map((line) => {
      if (indentIndex < 0) indentIndex = 0;
      const trimmedLine = line.trim();
      if (trimmedLine === '') return;
      if (trimmedLine.endsWith('{')) {
        return indent.repeat(indentIndex++) + trimmedLine;
      } else if (trimmedLine.startsWith('}')) {
        indentIndex--;
      }
      return indentIndex <= 0 ? trimmedLine : indent.repeat(indentIndex) + trimmedLine;
    })
    .join('\n')
    .replace(/^query\s*/g, 'query ')
    .replace(/^mutation\s*/g, 'mutation ')
    .replace(/^subscription\s*/g, 'subscription ')
    .replaceAll(/\s*:\s*/gm, ': ')
    .replaceAll(/\s*,\s*/gm, ', ')
    .replaceAll(/(?<![^\S\r\n]){/g, ' {')
    .replaceAll(/\n+/g, '\n')
    .trim();

  return prettifiedText;
};
