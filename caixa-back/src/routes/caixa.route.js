const express = require("express");
const CaixaController = require("../controllers/caixa.controller");

const router = express.Router();

router.post("/", CaixaController.insertCaixa);
router.get("/", CaixaController.getCaixas);
router.get("/:id", CaixaController.getCaixa);
router.delete("/:id", CaixaController.deleteCaixa);
router.put("/", CaixaController.updateCaixa);

module.exports = router;
