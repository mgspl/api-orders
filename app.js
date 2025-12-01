const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("[BANCO] MongoDB conectado corretamente"))
  .catch((err) => console.error("[BANCO] Erro de conexão:", err));

// Routes
const orderRoutes = require("./routes/ordersRoutes.js");
app.use("/order", orderRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`[SERVIDOR] Aberto e rodando na porta: ${PORT}`),
);
