const express = require("express");
const { loginUser } = require("../controllers/usersController");
const router = express.Router();

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Envie um nome de usuário para receber o token
 *     responses:
 *       200:
 *         description: O token
 */
router.post("/", loginUser);

module.exports = router;
