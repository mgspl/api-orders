const express = require("express");
const router = express.Router();
const { verifyToken } = require("../middlewares/authMiddleware.js");
const {
  createOrder,
  listAll,
  selectOne,
  updateOne,
  deleteOne,
} = require("../controllers/ordersController.js");

// Rota para fazer um novo pedido
/**
 * @swagger
 * /order:
 *   post:
 *     summary: Cadastra um novo pedido
 *     responses:
 *       201:
 *         description: O pedido cadastrado
 *       500:
 *         description: Mensagem do erro
 */
router.post("/", verifyToken, createOrder);

// Rota para listar todos os pedidos
/**
 * @swagger
 * /order/list:
 *   get:
 *     summary: Retorna todos os pedidos cadastrados
 *     responses:
 *       200:
 *         description: Uma lista de pedidos
 *       500:
 *         description: Mensagem do erro
 */
router.get("/list", verifyToken, listAll);

// Seleciona um pedido
/**
 * @swagger
 * /order/:numeroPedido:
 *   get:
 *     summary: Retorna o pedido especificado
 *     responses:
 *       200:
 *         description: O pedido
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Mensagem do erro
 */
router.get("/:numeroPedido", verifyToken, selectOne);

// Atualiza o pedido
/**
 * @swagger
 * /order/:numeroPedido:
 *   put:
 *     summary: Atualiza um pedido
 *     responses:
 *       200:
 *         description: O pedido atualizado
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Mensagem do erro
 */
router.put("/:numeroPedido", verifyToken, updateOne);

// Deleta um pedido
/**
 * @swagger
 * /order/:numeroPedido:
 *   delete:
 *     summary: Deleta o pedido especificado
 *     responses:
 *       200:
 *         description: Pedido deletado com sucesso
 *       404:
 *         description: Pedido não encontrado
 *       500:
 *         description: Mensagem do erro
 */
router.delete("/:numeroPedido", verifyToken, deleteOne);

module.exports = router;
