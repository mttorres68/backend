import { readFile, writeFile } from "node:fs";

function readFileTxtHuawei(path) {
  try {
  const readFileHuawei = readFile(path, "utf8", (err, data) => {
      const dataLine = data.split("\n");

      let onus = [];

      dataLine.map((line, index) => {
        const parts = line.trim().split(/\s+/);
        if (
          index < 8 ||
          line.trim() === "" ||
          line.includes("-------") ||
          parts.length < 6
        ) {
          return;
        }

        const ont_id = parts[2];
        const slot = parseInt(parts[1].replace("/6", ""));
        const port = parseInt(parts[1].replace("3/", ""));
        const sn = parts[3];
        const state = parts[5];

        if (ont_id && slot && port && sn && state) {
          const onu = {
            ont_id: parseInt(ont_id),
            slot,
            port,
            sn,
            state,
          };
          onus.push(onu);
        }
      });
      
      writeFile(
        "src/utils/json/ONUs-Huawei.json",
        JSON.stringify(onus, null, 2),
        function (err) {
          if (err) throw err;
          console.log("Sucesso!");
        }
      );

      return onus
    });

    console.log(readFileHuawei);

    return readFileHuawei
  } catch (error) {
    console.error(err);
    return;
  }
}

function readFileTxtZteState(path) {
  try {
    readFile(path, "utf8", (err, data) => {
      const dataLine = data.split("\n");

      let onus = [];

      dataLine.map((line, index) => {
        const parts = line.trim().split(/\s+/);
        if (index < 2 || line.includes("-------") || parts.length < 5) {
          return;
        }

        const ont_id = parts[0].split(":")[1];
        const slot = parseInt(parts[0].split("/")[1]);
        const port = parseInt(parts[0].split("/")[2].split(":")[0]);
        const state = parts[3].toLowerCase();

        if (ont_id && state) {
          const onu = {
            ont_id: parseInt(ont_id),
            slot,
            port,
            // sn: '_',
            state,
          };
          onus.push(onu);
        }
      });

      writeFile(
        "src/utils/outputZTE/ONUs-zte-state.json",
        JSON.stringify(onus, null, 2),
        function (err) {
          if (err) throw err;
          console.log("Sucesso!");
        }
      );
    });
  } catch (error) {
    console.error(err);
    return;
  }
}

function readFileTxtZte(path) {
  try {
    readFile(path, "utf8", (err, data) => {
      const dataLine = data.split("\n");

      let onus = [];

      dataLine.map((line, index) => {
        const parts = line.trim().split(/\s+/);
        if (index < 2 || line.includes("-------") || parts.length < 5) {
          return;
        }

        const ont_id = parts[0].split(":")[1];
        const slot = parseInt(parts[0].split("/")[1]);
        const port = parseInt(parts[0].split("/")[2].split(":")[0]);
        const sn = parts[3];

        if (ont_id && sn) {
          const onu = {
            ont_id: parseInt(ont_id),
            slot,
            port,
            sn,
          };
          onus.push(onu);
        }
      });

      writeFile(
        "src/utils/outputZTE/ONUs-zte.json",
        JSON.stringify(onus, null, 2),
        function (err) {
          if (err) throw err;
          console.log("Sucesso!");
        }
      );
    });
  } catch (error) {
    console.error(err);
    return;
  }
}

export { readFileTxtHuawei, readFileTxtZteState, readFileTxtZte };
