const writeFileSync = require("fs").writeFileSync;
const readFileSync = require("fs").readFileSync;
const pkgDir = require("pkg-dir");
const path = require("path");
const fs = require("fs");

async function updateDocusaurusSidebars() {
  const PROJECT_ROOT = await pkgDir(__dirname);
  const hooksListJSONFilePath = path.join(
    PROJECT_ROOT,
    "./helpers/hooks-list.json"
  );
  const { hooks: hooksList } = JSON.parse(
    fs.readFileSync(hooksListJSONFilePath, "utf-8")
  );
  const hookNames = hooksList.map(({ name }) => name);
  let INDEPENDENT_PACKAGES_SIDEBAR_INDEX = 2;
  let currentSidebarJson;
  let fileContent;
  try {
    fileContent = readFileSync(
      path.join(PROJECT_ROOT, `./sidebars.json`),
      "utf8"
    );
    currentSidebarJson = JSON.parse(fileContent);

    const independentPackages = {
      ...currentSidebarJson.docs[INDEPENDENT_PACKAGES_SIDEBAR_INDEX],
      items: Array.from(new Set([...hookNames])).sort(),
    };
    const newSidebarJson = {
      ...currentSidebarJson,
      docs: [
        ...currentSidebarJson.docs.slice(0, INDEPENDENT_PACKAGES_SIDEBAR_INDEX),
        independentPackages,
        ...currentSidebarJson.docs.slice(
          INDEPENDENT_PACKAGES_SIDEBAR_INDEX + 1
        ),
      ],
    };
    writeFileSync(
      path.join(PROJECT_ROOT, `./sidebars.json`),
      JSON.stringify(newSidebarJson, null, 2),
      "utf-8"
    );
  } catch (err) {
    console.log("----");
    console.log(err);
    console.log("----");
  }
}

module.exports = updateDocusaurusSidebars;

if (require.main === module) {
  updateDocusaurusSidebars();
}
