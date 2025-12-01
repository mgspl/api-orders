const express = require("express");
const router = express.Router();
const {
  createOrder,
  listAll,
  selectOne,
  updateOne,
  deleteOne,
} = require("../controllers/ordersController.js");

// Rota para fazer um novo pedido
router.post("/", createOrder);

// Rota para listar todos os pedidos
router.get("/list", listAll);

// Seleciona um pedido
router.get("/:numeroPedido", selectOne);

// Atualiza o pedido
router.put("/:numeroPedido", updateOne);

// Deleta um pedido
router.delete("/:numeroPedido", deleteOne);

module.exports = router;
