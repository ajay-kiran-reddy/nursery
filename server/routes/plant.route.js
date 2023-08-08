const express = require("express");
const {
  listAllPlants,
  createPlant,
} = require("../controllers/plant.controller");
const route = express.Router();

route.get("/", (req, res) => {
  return listAllPlants(req, res);
});

route.post("/", (req, res) => {
  return createPlant(req, res);
});

module.exports = route;
