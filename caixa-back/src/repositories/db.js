const MongoClient = require('mongodb')
const dotenv = require('dotenv/config')


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
