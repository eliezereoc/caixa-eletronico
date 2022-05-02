const express = require("express");
const ClienteController = require("../controllers/cliente.controller");

const router = express.Router();

router.post("/", ClienteController.insertCliente);
router.get("/", ClienteController.getClientes);
router.get("/:id", ClienteController.getCliente);
router.delete("/:id", ClienteController.deleteCliente);
router.put("/", ClienteController.updateCliente);

module.exports = router;
