const fs = require("fs");
const path = require("path");

const escapeSnippetLine = (line) => {
  return line.replace(/\$/g, "\\$");
};

const extractJsDocDescription = (code) => {
  const jsDocMatch = code.match(/\/\*\*([\s\S]*?)\*\//);
  if (!jsDocMatch) return null;

  const jsDocContent = jsDocMatch[1];
  const lines = jsDocContent
    .split("\n")
    .map((line) => line.replace(/^\s*\*\s?/, "").trim())
    .filter((line) => line.length > 0);

  return lines[0] || null;
};

const convertHookToSnippet = (filePath) => {
  const code = fs.readFileSync(filePath, "utf8");
  const lines = code.split(/\r?\n/).map(escapeSnippetLine);
  const name = path.basename(filePath, path.extname(filePath));
  const description = extractJsDocDescription(code);

  return {
    [name]: {
      prefix: name,
      body: lines,
      description,
    },
  };
};

const processHooksInFolder = (folderPath) => {
  const snippets = {};
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const fullPath = path.join(folderPath, file);
    const stat = fs.statSync(fullPath);
    if (stat.isFile() && /\.(js|ts|jsx|tsx)$/.test(file)) {
      const snippet = convertHookToSnippet(fullPath);
      Object.assign(snippets, snippet);
    }
  }

  return snippets;
};

const cleanOutputDir = (outputDir) => {
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
    return;
  }

  const files = fs.readdirSync(outputDir);
  for (const file of files) {
    fs.unlinkSync(path.join(outputDir, file));
  }
};

const generateSnippets = (inputDir, outputDir) => {
  const jsPath = path.join(inputDir, "js");
  const tsPath = path.join(inputDir, "ts");

  cleanOutputDir(outputDir);

  const jsSnippets = processHooksInFolder(jsPath);
  const tsSnippets = processHooksInFolder(tsPath);

  fs.writeFileSync(
    path.join(outputDir, "js.code-snippets"),
    JSON.stringify(jsSnippets, null, 2)
  );
  fs.writeFileSync(
    path.join(outputDir, "ts.code-snippets"),
    JSON.stringify(tsSnippets, null, 2)
  );

  console.log("VSCE snippets generated");
};

const [inputDir, outputDir] = process.argv.slice(2);

generateSnippets(inputDir, outputDir);
