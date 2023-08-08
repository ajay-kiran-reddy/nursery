const express = require("express");
const {
  fetchAllOrders,
  createOrder,
} = require("../controllers/order.controller");
const { isUserAuthenticated } = require("../middleware/authenticate");

const route = express.Router();

route.get("/", (req, res) => {
  return fetchAllOrders(req, res);
});

route.post("/", isUserAuthenticated, (req, res) => {
  return createOrder(req, res);
});

module.exports = route;
