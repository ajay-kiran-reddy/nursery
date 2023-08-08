const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: [true, "User name must not be empty"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User email must not be empty"],
      trim: true,
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User password must not be empty"],
      trim: true,
      //   select: false,
    },

    role: {
      type: String,
      enum: ["ADMIN", "EMPLOYEE"],
      default: "EMPLOYEE",
    },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
