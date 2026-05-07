const fs = require("node:fs");
const path = require("node:path");

const distDir = path.join(__dirname, "..", "dist");

const importPattern =
  /\b(from\s+["']|import\s*\(\s*["'])(\.{1,2}\/[^"']+?)(["'])/g;

function hasKnownExtension(specifier) {
  return /\.[cm]?js$|\.json$|\.node$/i.test(specifier);
}

function shouldPatch(filePath, specifier) {
  if (hasKnownExtension(specifier)) return false;

  const absoluteTarget = path.resolve(path.dirname(filePath), specifier);
  return fs.existsSync(`${absoluteTarget}.js`);
}

function patchFile(filePath) {
  const source = fs.readFileSync(filePath, "utf8");
  const next = source.replace(importPattern, (match, prefix, specifier, suffix) => {
    if (!shouldPatch(filePath, specifier)) return match;
    return `${prefix}${specifier}.js${suffix}`;
  });

  if (next !== source) {
    fs.writeFileSync(filePath, next);
  }
}

function walk(dir) {
  if (!fs.existsSync(dir)) return;

  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      walk(fullPath);
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".js")) {
      patchFile(fullPath);
    }
  }
}

walk(distDir);
