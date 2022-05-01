// import Cliente from "../models/cliente.model.js";
import { MongoClient } from "mongodb";
import DadosCaixa from "../model/cliente.model.js";
import dotenv from "dotenv/config.js";

const client = new MongoClient(process.env.DB_URL);

async function insertCliente(cliente) {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION_CLIENTE);

    // const icludeCliente = await collection.insertMany([{ cliente: cliente }]);

    const icludeCliente = await collection.insertMany([
      {
        id: cliente.id,
        nome: cliente.nome,
        saldo: cliente.saldo,
        saque: cliente.saque,
      },
    ]);

    return icludeCliente;
  } catch (error) {
    console.log(error.detail);
    throw error;
  } finally {
    // Fecha a conexão à cada execução
    client.close();
  }
}

async function getClientes() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION_CLIENTE);

    return await collection.find({}).toArray();
  } catch (error) {
    throw error;
  } finally {
    // Fecha a conexão à cada execução
    client.close();
  }
}

async function getCliente(id) {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION_CLIENTE);

    const getCliente = await collection.find({ id: id }).toArray();
    // console.log(getCliente[0].cliente.id);

    return getCliente;
  } catch (error) {
    throw error;
  } finally {
    // Fecha a conexão à cada execução
    client.close();
  }
}

async function deleteCliente(id) {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION_CLIENTE);

    return await collection.deleteMany({ id: id });
  } catch (error) {
    throw error;
  } finally {
    // Fecha a conexão à cada execução
    client.close();
  }
}

async function updateCliente(cliente) {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION_CLIENTE);

    var myquery = { id: cliente.id };
    var newvalues = {
      $set: {
        nome: cliente.nome,
        saldo: cliente.saldo,
        saque: cliente.saque,
      },
    };

    const updateCliente = await collection.updateOne(myquery, newvalues);

    return updateCliente;
  } catch (error) {
    throw error;
  } finally {
    // Fecha a conexão à cada execução
    client.close();
  }
}

export default {
  insertCliente,
  getClientes,
  getCliente,
  updateCliente,
  deleteCliente,
};
