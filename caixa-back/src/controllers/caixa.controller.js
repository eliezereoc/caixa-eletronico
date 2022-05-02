const CaixaService = require("../services/caixa.service");

async function insertCaixa(req, res, next) {
  try {
    let caixa = req.body;

    if (
      !caixa.id ||
      !caixa.qtdN100 ||
      !caixa.qtdN50 ||
      !caixa.qtdN20 ||
      !caixa.qtdN10
    ) {
      throw new Error("Todos os campos são obrigatórios!");
    }

    caixa = await CaixaService.insertCaixa(caixa);
    res.send(caixa);

    //logger.info(`POST /caixa - ${JSON.stringify(caixa)}`);
  } catch (err) {
    next(err);
  }
}

async function getCaixas(req, res, next) {
  try {
    const caixa = await CaixaService.getCaixas();

    res.send(caixa);
    logger.info("GET /caixa");
  } catch (err) {
    next(err);
  }
}

async function getCaixa(req, res, next) {
  try {
    const id = req.params.id;

    const caixa = await CaixaService.getCaixa(id);
    if (caixa) {
      res.send(caixa);
    } else {
      res.send("Caixa não encontrado!");
    }
    logger.info("GET /caixa");
  } catch (err) {
    next(err);
  }
}

async function deleteCaixa(req, res, next) {
  try {
    const id = req.params.id;
    await CaixaService.deleteCaixa(id);
    res.status(200).send("Cadastro excluido com sucesso!");
    logger.info("DELETE /caixa");
  } catch (err) {
    next(err);
  }
}

async function updateCaixa(req, res, next) {
  try {
    let caixa = req.body;
    const caixaLog = caixa;

    // if (
    //   !caixa.id ||
    //   !caixa.qtdN100 ||
    //   !caixa.qtdN50 ||
    //   !caixa.qtdN20 ||
    //   !caixa.qtdN10
    // ) {
    //   throw new Error("PUT - Todos os campos são obrigatórios!");
    // }

    caixa = await CaixaService.updateCaixa(caixa);

    console.log(caixa);

    res.send(caixa);
    logger.info(`PUT /caixa - ${JSON.stringify(caixaLog)}`);
  } catch (err) {
    next(err);
  }
}

module.exports = {
  insertCaixa,
  getCaixas,
  getCaixa,
  deleteCaixa,
  updateCaixa,
};
