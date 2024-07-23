import { Router } from "express";
import { addUser, getUserInfo } from "../query.js";
import bcrypt from "bcrypt";
import crypto from "node:crypto";
import { verifyJWT } from "../middleware/verifyJWT.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
const router = Router();

/**
 * @description Create User
 * @route POST /user/create
 */
const createUser = router.post("/create", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const randomSalt = crypto.randomInt(10, 16);
    const passwordHash = await bcrypt.hash(password, randomSalt);
    const query = await addUser(name, email, passwordHash);
    if (query.length === 0) {
      res.status(500).json({ message: "Não foi possível criar o usuário!" });
    } else {
      const id = query.insertId;
      const token = jwt.sign({ id, email }, process.env.SECRET, {
        expiresIn: 5000,
      });
      return res.json({
        auth: true,
        token: token,
        user_id: id,
        message: "Usuário cadastrado com sucesso!",
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Não foi possível criar o usuário" });
  }
});

/**
 * @description Buscar informações do usuário
 * @route GET /user/info
 */
const getUser = router.get("/info", verifyJWT, async (req, res) => {
  const query = await getUserInfo(req.id);
  try {
    if (!req.id) {
      res.status(404).json({ message: "Dados incompletos" });
    }

    const userInfo = {
      id: req.id,
      email: req.email,
      name: query[0].name,
    };

    res.status(200).json(userInfo);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Erro" });
  }
});

export { createUser, getUser };
