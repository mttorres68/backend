import mysql from "mysql2";
import dotenv from "dotenv";
import { createTable } from "../query.js";
dotenv.config();

const con = mysql
  .createPool({
    host: "mysql-zeus",
    user: "root",
    password: "root",
    database: "db",
    port: "3306",
  })
  .promise();

const connectionTestDB = async () => {
  try {
    const connection = await con.getConnection();
    console.log("Conexão estabelecida ao BD com ID: ", connection.threadId);
    connection.release();
    await createTable();
  } catch (err) {
    console.error("Erro ao conectando-se no BD: ", err.stack);
    process.exit(1);
  }
};

export { con, connectionTestDB };

// async function getAll(){
//   const rows = await con.query("SELECT * FROM onu");
//   return rows[0]
// }

// const onu = await getAll()

// console.log(onu());

// const endConnection = async () => {
//   con.end((err) => {
//     if(err) {
//       console.error('Error while closing connection: ', err.stack);
//       process.exit[1];
//     }

//     console.log('Connection Closed Successfully');
//     return con;
//   })
// }

// export {connectDB, endConnection}
