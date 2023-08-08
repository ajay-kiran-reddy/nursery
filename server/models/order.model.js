const { Schema, model } = require("mongoose");

const orderSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        quantity: { type: Number, required: true },
        plant: {
          type: Schema.Types.ObjectId,
          ref: "Plant",
        },
      },
    ],
    customerInfo: {
      name: { type: String, required: true, trim: true },
      address: { type: String, required: true, trim: true },
      city: { type: String, required: true, trim: true },
      postalCode: { type: String, required: true, trim: true },
      country: { type: String, required: true, trim: true },
      phoneNumber: { type: Number, required: true, trim: true },
    },
    plantsPrice: { type: Number, required: true },
    shippingPrice: { type: Number, required: true },
    totalPrice: { type: Number, required: true },

    paymentMethod: { type: String, required: true, enum: ["COD", "ONLINE"] },
    paymentDone: { type: Boolean, default: false },
    paymentDoneAt: { type: Date },

    status: {
      type: String,
      enum: ["PLACED", "APPROVED"],
      default: "PLACED",
    },
  },
  {
    timestamps: true,
  }
);

module.exports = model("Order", orderSchema);
