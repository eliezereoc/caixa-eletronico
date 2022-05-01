import CaixaRepository from "../repositories/caixa.repository.js";

async function insertCaixa(caixa) {
  return await CaixaRepository.insertCaixa(caixa);
}

async function getCaixas() {
  return await CaixaRepository.getCaixas();
}

async function getCaixa(id) {
  return await CaixaRepository.getCaixa(id);
}

async function deleteCaixa(id) {
  return await CaixaRepository.deleteCaixa(id);
}

async function updateCaixa(caixa) {
  return await CaixaRepository.updateCaixa(caixa);
}

export default {
  insertCaixa,
  getCaixas,
  getCaixa,
  deleteCaixa,
  updateCaixa,
};
