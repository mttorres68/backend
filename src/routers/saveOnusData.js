import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { savaOnus } from "../db/insert/db_insert.js";
import { mergeJsonZte } from "../utils/mergeJson.js";
import { existsSync } from "node:fs";

const router = Router();

const saveOnusData = router.get("/save", verifyJWT, async (req, res) => {
  const path_files = [
    "src/utils/json/ONUs_zte.json",
    "src/utils/json/ONUs-Huawei.json",
  ];

  const outputZTE = [
    "src/utils/outputZTE/ONUs-zte-state.json",
    "src/utils/outputZTE/ONUs-zte.json",
  ];

  try {
    if (existsSync(outputZTE[0]) && existsSync(outputZTE[1])) {
      mergeJsonZte(outputZTE);
    } else {
      console.log("Arquivos não encontrados.");
    }
    const data = savaOnus(path_files);
    console.log(data);
    res.status(200).json({ message: "Dados salvos com sucesso!" });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Falha ao salvar dados. Tente novamente!" });
  }
});

export { saveOnusData };
