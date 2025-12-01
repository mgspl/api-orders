const mongoose = require("mongoose");

// Mapeamento da Schema, achei melhor usar o items como um subschema
const itemSchema = new mongoose.Schema(
  {
    orderId: {
      type: String,
      required: true,
      unique: true,
    },
    value: {
      type: Number,
      required: true,
    },
    creationDate: {
      type: Date,
      required: true,
    },
    items: [
      new mongoose.Schema({
        productId: Number,
        quantity: Number,
        price: String,
      }),
    ],
  },
  // Removi as timestamps padrão do mongo pois o pedido já possui uma
  { timestamps: false },
);

module.exports = mongoose.model("Order", itemSchema);
