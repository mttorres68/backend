import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";
import { existsSync } from "node:fs";
import {
  readFileTxtHuawei,
  readFileTxtZteState,
  readFileTxtZte,
} from "../utils/readFileTxtOnus.js";
import { mergeJsonZte } from "../utils/mergeJson.js";

const router = Router();

const readFileOnus = router.get("/read", verifyJWT, async (req, res) => {
  const path = {
    fileHuawei: "src/inputs/OntInfo - Huawei.txt",
    fileZteState: "src/inputs/OntInfo - ZTE - SNs - State.txt",
    fileZte: "src/inputs/OntInfo - ZTE - SNs.txt",
  };

  try {
    if (
      existsSync(path.fileHuawei) &&
      existsSync(path.fileZteState) &&
      existsSync(path.fileZte)
    ) {
      readFileTxtHuawei(path.fileHuawei);
      readFileTxtZteState(path.fileZteState);
      readFileTxtZte(path.fileZte);

      res.status(200).json({ message: "Dados obtidos com sucesso!" });
    } else {
      res.status(404).json({ message: "Dados não encontrados." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Erro" });
  }
});

export { readFileOnus };
