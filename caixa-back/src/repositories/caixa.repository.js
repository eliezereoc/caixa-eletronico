// import Caixa from "../models/caixa.model.js";
import { MongoClient } from "mongodb";
// import DadosCaixa from "../model/caixa.model.js";
import dotenv from "dotenv/config.js";

const client = new MongoClient(process.env.DB_URL);

async function insertCaixa(caixa) {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION_CAIXA);

    // const icludeCaixa = await collection.insertMany([{ caixa: caixa }]);

    const icludeCaixa = await collection.insertMany([
      {
        id: caixa.id,
        qtdN100: caixa.qtdN100,
        qtdN50: caixa.qtdN50,
        qtdN20: caixa.qtdN20,
        qtdN10: caixa.qtdN10,
      },
    ]);

    return icludeCaixa;
  } catch (error) {
    console.log(error.detail);
    throw error;
  } finally {
    // Fecha a conexão à cada execução
    client.close();
  }
}

async function getCaixas() {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION_CAIXA);

    return await collection.find({}).toArray();
  } catch (error) {
    throw error;
  } finally {
    // Fecha a conexão à cada execução
    client.close();
  }
}

async function getCaixa(id) {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION_CAIXA);

    const getCaixa = await collection.find({ id: id }).toArray();
    // console.log(getCaixa[0].caixa.id);

    return getCaixa;
  } catch (error) {
    throw error;
  } finally {
    // Fecha a conexão à cada execução
    client.close();
  }
}

async function deleteCaixa(id) {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION_CAIXA);

    return await collection.deleteMany({ id: id });
  } catch (error) {
    throw error;
  } finally {
    // Fecha a conexão à cada execução
    client.close();
  }
}

async function updateCaixa(caixa) {
  try {
    await client.connect();
    const db = client.db(process.env.DB_NAME);
    const collection = db.collection(process.env.DB_COLLECTION_CAIXA);

    var myquery = { id: caixa.id };
    var newvalues = {
      $set: {
        qtdN100: caixa.qtdN100,
        qtdN50: caixa.qtdN50,
        qtdN20: caixa.qtdN20,
        qtdN10: caixa.qtdN10,
      },
    };

    const updateCaixa = await collection.updateOne(myquery, newvalues);

    return updateCaixa;
  } catch (error) {
    throw error;
  } finally {
    // Fecha a conexão à cada execução
    client.close();
  }
}

export default {
  insertCaixa,
  getCaixas,
  getCaixa,
  updateCaixa,
  deleteCaixa,
};
