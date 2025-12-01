const jwt = require("jsonwebtoken");

// Função para verificar a validade do token
exports.verifyToken = (req, res, next) => {
  const token = req.header("Authorization");

  if (!token) return res.status(401).json({ message: "Erro: Acesso negado" });

  try {
    const verified = jwt.verify(token.split(" ")[1], process.env.JWT_KEY);
    req.user = verified;
    next();
  } catch (err) {
    res.status(400).json({ message: "Erro: Token inválido" });
  }
};
