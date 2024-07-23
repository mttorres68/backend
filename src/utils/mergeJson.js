import { readFileSync, writeFile, writeFileSync } from "node:fs";
import deepmerge from "deepmerge";

function mergeJsonZte(paths) {
  function mergeJson(json_01, json_02) {
    const merged = json_01.map((item_01) => {
      const findItem = json_02.find(
        (item_02) => item_02.ont_id === item_01.ont_id
      );

      return findItem ? deepmerge(item_01, findItem) : item_01;
    });

    json_02.forEach((item_02) => {
      const exists = json_01.find(
        (item_01) => item_01.ont_id === item_02.ont_id
      );

      if (!exists) {
        merged.push(item_02);
      }
    });

    return merged;
  }

  // console.log(paths);
  const [json_01, json_02] = paths.map((file) => {
    const filesContents = readFileSync(file, "utf8");
    return JSON.parse(filesContents);
  });

  const merged = mergeJson(json_01, json_02);
  writeFileSync(
    "src/utils/json/ONUs_zte.json",
    JSON.stringify(merged, null, 2),
    function (err) {
      if (err) throw err;
      console.log("Sucesso! Merge json.");
    }
  );
}

export { mergeJsonZte };

// writeFileSync('json_merge.json', JSON.stringify(merged, null))

// const merged = files
//   .map((file) => {
//     const filesContents = readFileSync(file, "utf8");
//     return JSON.parse(filesContents);
//   })
//   .reduce((a, b) => deepmerge(a, b));
