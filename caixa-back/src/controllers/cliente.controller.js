import ClienteService from "../services/cliente.service.js";

async function insertCliente(req, res, next) {
  try {
    let cliente = req.body;

    if (!cliente.id || !cliente.nome || !cliente.saldo) {
      throw new Error("Todos os campos são obrigatórios!");
    }

    cliente = await ClienteService.insertCliente(cliente);
    res.send(cliente);

    //logger.info(`POST /cliente - ${JSON.stringify(cliente)}`);
  } catch (err) {
    next(err);
  }
}

async function getClientes(req, res, next) {
  try {
    const cliente = await ClienteService.getClientes();

    res.send(cliente);
    logger.info("GET /cliente");
  } catch (err) {
    next(err);
  }
}

async function getCliente(req, res, next) {
  try {
    const id = req.params.id;

    const cliente = await ClienteService.getCliente(id);
    if (cliente) {
      res.send(cliente);
    } else {
      res.send("Cliente não encontrado!");
    }
    logger.info("GET /cliente");
  } catch (err) {
    next(err);
  }
}

async function deleteCliente(req, res, next) {
  try {
    const id = req.params.id;
    await ClienteService.deleteCliente(id);
    res.status(200).send("Cadastro excluido com sucesso!");
    logger.info("DELETE /cliente");
  } catch (err) {
    next(err);
  }
}

async function updateCliente(req, res, next) {
  try {
    let cliente = req.body;
    const clienteLog = cliente;

    if (!cliente.id || !cliente.nome || !cliente.saldo || !cliente.saque) {
      throw new Error("Todos os campos são obrigatórios!");
    }

    cliente = await ClienteService.updateCliente(cliente);
    res.send(cliente);
    logger.info(`PUT /cliente - ${JSON.stringify(clienteLog)}`);
  } catch (err) {
    next(err);
  }
}

export default {
  insertCliente,
  getClientes,
  getCliente,
  deleteCliente,
  updateCliente,
};
