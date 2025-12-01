const jwt = require("jsonwebtoken");

// A ideia não é ter um super sistema de login apenas proteger as rotas com o JWT
exports.loginUser = async (req, res) => {
  const { username } = req.body;

  const token = jwt.sign({ username }, process.env.JWT_KEY, {
    expiresIn: "1h",
  });

  res.status(200).json({ token });
};
