const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
require("dotenv").config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Swagger setup
const swaggerOptions = {
  swaggerDefinition: {
    myapi: "1.0.0",
    info: {
      title: "Order API",
      version: "1.0.0",
      description: "Rotas da API de pedidos",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("[BANCO] MongoDB conectado corretamente"))
  .catch((err) => console.error("[BANCO] Erro de conexão:", err));

// Routes
const orderRoutes = require("./routes/ordersRoutes.js");
const userRoutes = require("./routes/userRoutes.js");
app.use("/order", orderRoutes);
app.use("/login", userRoutes);

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`[SERVIDOR] Aberto e rodando na porta: ${PORT}`),
);
