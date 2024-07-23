import { con } from "./db/connection.js";
import bcrypt from "bcrypt";

/**
 * @description Registrar um novo usuário no banco de dados
 * @query INSERT INTO user (name, email, password)
 */
const addUser = async (name, email, password) => {
  const exist = await verifyExistEmail(email);
  if (exist[0].length === 0) {
    const query = await con.query(
      `
      INSERT INTO user (name, email, password) VALUES (?, ?, ?)`,
      [name, email, password]
    );
    return query[0];
  } else {
    return [];
  }
};

/**
 * @description Buscar dados do usuário por 'user_id'
 * @query SELECT * FROM user
 */
const getUserInfo = async (id) => {
  const info = await con.query(`SELECT * FROM user WHERE user_id = ?`, [id]);

  return info[0];
};

/**
 * @description Verificar se o 'email' já não está registrado no bando de dados, pois foi definido com 'unique'
 * @query SELECT * FROM user WHERE email
 */
const verifyExistEmail = async (email) => {
  const query = await con.query(`SELECT * FROM user WHERE email = ?`, [email]);
  return query;
};

/**
 * @description Verificar se os dados passados para fazer login estão corretos
 * @query SELECT password, user_id FROM user WHERE email
 */
const verifyUser = async (email, password) => {
  try {
    const [rows, fields] = await con.query(
      `SELECT password, user_id FROM user WHERE email = ?`,
      [email]
    );
    if (rows[0] === undefined) {
      return { valid: false };
    }
    const isValidPassword = await bcrypt.compare(password, rows[0].password);
    const user_id = rows[0].user_id;

    const response = {
      user_id: user_id,
      valid: isValidPassword,
    };
    return response;
  } catch (err) {
    return err.message;
  }
};

/**
 * @description Buscar todas as onus salvas no banco de dados
 * @query SELECT * FROM onu
 */
const getOnu = async () => {
  const allOnus = await con.query("SELECT * FROM onu");
  return allOnus[0];
};

const snOnu = async (sn) => {
  const snOnu = await con.query("SELECT * FROM onu WHERE sn LIKE ?", "%" + [sn] + "%");

  return snOnu[0];
};

export { addUser, verifyUser, getUserInfo, getOnu, snOnu };
