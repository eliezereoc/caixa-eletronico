import ClienteRepository from "../repositories/cliente.repository.js";

async function insertCliente(cliente) {
  return await ClienteRepository.insertCliente(cliente);
}

async function getClientes() {
  return await ClienteRepository.getClientes();
}

async function getCliente(id) {
  return await ClienteRepository.getCliente(id);
}

async function deleteCliente(id) {
  return await ClienteRepository.deleteCliente(id);
}

async function updateCliente(cliente) {
  return await ClienteRepository.updateCliente(cliente);
}

export default {
  insertCliente,
  getClientes,
  getCliente,
  deleteCliente,
  updateCliente,
};
