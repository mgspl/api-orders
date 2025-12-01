const Order = require("../models/orders.js");

exports.createOrder = async (req, res) => {
  try {
    // "Separa" os items do resto da requisição.
    const items = req.body.items;

    // "Remapeamento" do request
    const newOrder = new Order({
      orderId: req.body.numeroPedido,
      value: req.body.valorTotal,
      creationDate: req.body.dataCriacao,
    });

    // Itera os items e adiciona um por um no pedido
    for (let i = 0; i < items.length; i++) {
      newOrder.items.push({
        productId: items[i].idItem,
        quantity: items[i].quantidadeItem,
        price: items[i].valorItem,
      });
    }

    // Salva o pedido e retorna o status
    const savedOrder = await newOrder.save();
    res.status(201).json(savedOrder);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listAll = async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.selectOne = async (req, res) => {
  try {
    const order = await Order.find({ orderId: req.params.numeroPedido });
    if (!order) return res.status(404).json({ error: "Item not found" });
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.updateOne = async (req, res) => {
  // Mesma lógica do create
  const items = req.body.items;

  const updateOrder = new Order({
    orderId: req.body.numeroPedido,
    value: req.body.valorTotal,
    creationDate: req.body.dataCriacao,
  });

  for (let i = 0; i < items.length; i++) {
    updateOrder.items.push({
      productId: items[i].idItem,
      quantity: items[i].quantidadeItem,
      price: items[i].valorItem,
    });
  }

  // Aqui é necessário separar os campos pois o _id não pode ser alterado
  try {
    const updatedItem = await Order.findOneAndUpdate(
      { orderId: req.params.numeroPedido },
      {
        $set: {
          orderId: updateOrder.orderId,
          value: updateOrder.value,
          creationDate: updateOrder.creationDate,
          items: updateOrder.items,
        },
      },
      {
        new: true,
      },
    );
    if (!updatedItem)
      return res.status(404).json({ erro: "Pedido não encotrado" });
    res.status(200).json(updatedItem);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteOne = async (req, res) => {
  try {
    const deletedOrder = await Order.findOneAndDelete({
      orderId: req.params.numeroPedido,
    });
    if (!deletedOrder)
      return res.status(404).json({ erro: "Pedido não encontrado" });
    res.status(200).json({ message: "Pedido deletado com sucesso!" });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
