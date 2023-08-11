const Order = require("../models/order.model");
const Plant = require("../models/plant.model");

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

const updateOrder = (req, res) => {
  const isOrderApproved = req.body.status;

  Order.findByIdAndUpdate(
    { _id: req.params.id },
    {
      $set: req.body,
    },
    { new: true }
  )
    .then(() => {
      if (isOrderApproved === "APPROVED") {
        const plantId = req.body.items[0].plant._id;
        const orderQuantity = req.body.items[0].quantity;
        const totalQuantity = req.body.items[0].plant.quantity;

        Plant.findByIdAndUpdate(
          { _id: plantId },
          {
            $set: { quantity: totalQuantity - orderQuantity },
          }
        )
          .then((order) =>
            res
              .status(200)
              .json({ message: "Your order has been updated successfully" })
          )
          .catch((error) =>
            res.status(500).json({
              message: "Failed to update plants stock available",
              error,
            })
          );
      }
      if (isOrderApproved === "DENIED") {
        const plantId = req.body.items[0].plant._id;
        const orderQuantity = req.body.items[0].quantity;
        const totalQuantity = req.body.items[0].plant.quantity;

        Plant.findByIdAndUpdate(
          { _id: plantId },
          {
            $set: { quantity: totalQuantity + orderQuantity },
          }
        )
          .then((order) =>
            res
              .status(200)
              .json({ message: "Your order has been updated successfully" })
          )
          .catch((error) =>
            res.status(500).json({
              message: "Failed to update plants stock available",
              error,
            })
          );
      }
    })
    .then((order) =>
      res
        .status(200)
        .json({ message: "Your order has been updated successfully" })
    )
    .catch((error) =>
      res.status(500).json({ message: "Failed to update your order", error })
    );
};

const deleteOrder = (req, res) => {
  Order.findByIdAndDelete({
    _id: req.params.id,
  })
    .then(() =>
      res.status(200).json({ message: "Successfully deleted the order" })
    )
    .catch((error) =>
      res.status(500).json({ message: "Failed to delete the order" })
    );
};

module.exports = { createOrder, fetchAllOrders, updateOrder, deleteOrder };
