const fs = require("fs");
const fsExtra = require("fs-extra");

//const template = fs.readFileSync("template.html", "utf-8");
const templateDe = fs.readFileSync("template_de.html", "utf-8");
const templateEn = fs.readFileSync("template_en.html", "utf-8");

const templates = { de: templateDe, en: templateEn };

// create index.html
const indexContent = fs.readFileSync("pages/aboutme_en.html", "utf-8");
const fullPage = templates.en.replace("{{content}}", indexContent);
fs.writeFileSync("dist/index.html", fullPage);

// create pages from ./pages/
const pagenames = fs.readdirSync("pages");
for (let pagename of pagenames) {
  let lang = pagename.slice(pagename.length - 7, pagename.length - 5);
  if (lang !== "de") {
    lang = "en";
  }
  try {
    const pagecontent = fs.readFileSync(`pages/${pagename}`, "utf-8");
    const fullPage = templates[lang].replace("{{content}}", pagecontent);
    fs.writeFileSync(`dist/${pagename}`, fullPage);
  } catch {
    const pagecontent = fs.readFileSync(
      `pages/${pagename}/index.html`,
      "utf-8"
    );
    const fullPage = templates[lang].replace("{{content}}", pagecontent);
    fs.mkdirSync(`dist/${pagename}`);
    fs.writeFileSync(`dist/${pagename}/index.html`, fullPage);
  }
}

// create articles from ./articles/
const articlefiles = fs.readdirSync("articles");
for (let articlefile of articlefiles) {
  const content = fs.readFileSync(`articles/${articlefile}`, "utf-8");
  const fullPage = templates.en.replace("{{content}}", content);
  fs.writeFileSync(`dist/${articlefile}`, fullPage);
}

// create resume pages
for (let lang of ["de", "en"]) {
  const pagecontent = fs.readFileSync(
    `node_modules/@karuga/karuga-jsonresume/dist/resume_react_bootstrap_material_${lang}.html`,
    { encoding: "utf-8" }
  );
  const fullPage = templates[lang].replace("{{content}}", pagecontent);
  fs.writeFileSync(`dist/cv_${lang}.html`, fullPage);
}

fsExtra.copySync("images", "dist/images");
fsExtra.copySync("cup-images", "dist/cup-images");
