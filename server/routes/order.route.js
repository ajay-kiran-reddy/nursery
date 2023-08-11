const express = require("express");
const {
  fetchAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
} = require("../controllers/order.controller");
const { isUserAuthenticated } = require("../middleware/authenticate");

const route = express.Router();

route.get("/", (req, res) => {
  return fetchAllOrders(req, res);
});

route.post("/", isUserAuthenticated, (req, res) => {
  return createOrder(req, res);
});

route.put("/:id", isUserAuthenticated, (req, res) => {
  return updateOrder(req, res);
});

route.delete("/:id", isUserAuthenticated, (req, res) => {
  return deleteOrder(req, res);
});

module.exports = route;
