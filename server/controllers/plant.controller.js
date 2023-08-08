const Plant = require("../models/plant.model");

const createPlant = (req, res) => {
  const plant = new Plant({ ...req.body });
  plant
    .save()
    .then(() =>
      res.status(201).json({ message: "Plant has been saved successfully" })
    );
};

const listAllPlants = (req, res) => {
  Plant.find()
    .then((plants) => res.status(200).json([...plants]))
    .catch((error) =>
      res.status(500).json({ message: "Failed to fetch plants" })
    );
};

module.exports = { createPlant, listAllPlants };
