const Order = require("../models/order.model");

const createOrder = (req, res) => {
  console.log(req.body, "[req.body]");
  console.log(req.user, "[USER]");
  const order = new Order({
    ...req.body,
    user: req.user._id,
  });

  order
    .save()
    .then((orders) =>
      res.status(200).json({ message: "Created the orders successfully" })
    )
    .catch((error) =>
      res.status(500).json({ message: "Failed to create order", error })
    );
};

const fetchAllOrders = (req, res) => {
  Order.find()
    .populate("items.plant", "name quantity price")
    .then((orders) => res.status(200).json([...orders]))
    .catch((error) =>
      res.status(500).json({ message: "Failed to fetch orders", error })
    );
};

module.exports = { createOrder, fetchAllOrders };
