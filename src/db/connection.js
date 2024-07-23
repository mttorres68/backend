import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

const con = mysql
  .createPool({
    host: 'localhost',
    user: 'root',
    password: 'root',
    database: 'db',
    port: '3306',
  })
  .promise();


  
  
export{ con }
  
// async function getAll(){
//   const rows = await con.query("SELECT * FROM onu");
//   return rows[0]  
// }

// const onu = await getAll()

// console.log(onu());

// const connectDB = async () => {
//   con.connect(function (err) {
//     if(err){
//       console.error('Erro connecting to database: ', err.stack);
//       process.exit[1]
//     }

//     console.log('Connection established with ID: ', con.threadId);
//     return con;
//   });
// }



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


