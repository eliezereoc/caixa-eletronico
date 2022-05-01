import express from "express";
import CaixaController from "../controllers/caixa.controller.js";

const router = express.Router();

router.post("/", CaixaController.insertCaixa);
router.get("/", CaixaController.getCaixas);
router.get("/:id", CaixaController.getCaixa);
router.delete("/:id", CaixaController.deleteCaixa);
router.put("/", CaixaController.updateCaixa);

export default router;
