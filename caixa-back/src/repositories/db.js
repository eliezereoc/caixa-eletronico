import MongoClient from "mongodb";
import dotenv from "dotenv/config.js";
 


const client = new MongoClient(url);

class Database {
  constructor() {
    this.conectDb();
  }

  conectDb() {
    await client.connect();
    console.log("Conectado com sucesso ao servidor");
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection("dadoCol");
  }
}

export default new Database();
