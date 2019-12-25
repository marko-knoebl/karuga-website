const fs = require("fs");
const fsExtra = require("fs-extra");

const template = fs.readFileSync("template.html", "utf-8");

const pagenames = fs.readdirSync("pages");

// create index.html
const indexContent = fs.readFileSync("pages/aboutme_en.html", "utf-8");
const fullPage = template.replace("{{content}}", indexContent);
fs.writeFileSync("dist/index.html", fullPage);

// create pages from ./pages/
for (let pagename of pagenames) {
  const pagecontent = fs.readFileSync(`pages/${pagename}`, "utf-8");
  const fullPage = template.replace("{{content}}", pagecontent);
  fs.writeFileSync(`dist/${pagename}`, fullPage);
}

// create resume pages
for (let lang of ["de", "en"]) {
  const pagecontent = fs.readFileSync(
    `node_modules/@karuga/karuga-jsonresume/dist/resume_react_bootstrap_material_${lang}.html`,
    { encoding: "utf-8" }
  );
  const fullPage = template.replace("{{content}}", pagecontent);
  fs.writeFileSync(`dist/cv_${lang}.html`, fullPage);
}

fsExtra.copySync("images", "dist/images");
