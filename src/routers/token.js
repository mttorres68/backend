import { Router } from "express";
import { verifyJWT } from "../middleware/verifyJWT.js";

const router = Router();

/**
 * @description Validação do token do usuário
 * @route POST /token/validate
 */
const validateToken = router.post("/validate", verifyJWT, (req, res) => {
  const userInfo = {
    id: req.user_id,
    email: req.email,
  };
  res.send(userInfo);
});

export { validateToken };
