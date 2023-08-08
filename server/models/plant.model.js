const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const plant = new Schema(
  {
    name: {
      type: String,
      required: [true, "Plant name must not be empty"],
      unique: true,
    },
    images: [String],
    price: {
      required: true,
      type: Number,
    },
    description: {
      required: false,
      type: String,
    },
    quantity: {
      required: [true, "Quantity can not be empty"],
      type: Number,
    },
    color: {
      type: String,
    },
  },
  { timestamps: true }
);

const Plant = mongoose.model("Plant", plant);

module.exports = Plant;
