import { con } from "../connection.js";
import { existsSync, readFile, writeFile } from "node:fs";

function savaOnus(pathOnus) {
  async function createOnus(sn, ont_id, slot, port, state) {
    try {
      const [result] = await con.query(
        `
                INSERT INTO onu(sn, ont_id, slot, port, state)
                VALUES (?, ?, ?, ?, ?)
                `,
        [sn, ont_id, slot, port, state]
      );
      return {
        id: result.insertId,
        state,
      };
    } catch (err) {
      if (err.errno === 1062) {
        const errWords = err.sqlMessage.split(" ");
        const entry = errWords[2];
        const fieldDB = errWords[5];
        const formattedField = fieldDB.substring(
          fieldDB.lastIndexOf(".") + 1,
          fieldDB.lastIndexOf("_")
        );
        // console.log(`Duplicate entry - ${formattedField}: ${entry}`);
        return `Duplicate entry - ${formattedField}: ${entry}`;
      }
    }
  }

  async function readJson(path) {
    if (existsSync(path)) {
      readFile(path, "utf8", (err, data) => {
        const onu_data = JSON.parse(data);

        const saveData = onu_data.map(async (element) => {
          return await createOnus(
            element.sn,
            element.ont_id,
            element.slot,
            element.port,
            element.state
          ).then(function (result) {
            result;
          });
        });

        Promise.all(saveData).then(function (results) {
            return results
        })
      });
    }
  }

  for (const file of pathOnus) {
    readJson(file);
  }
}

export { savaOnus };
