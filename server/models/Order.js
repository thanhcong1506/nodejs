import mongoose from "mongoose";

const OrderSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    cartItems: [
      {
        name: { type: String, required: true },
        image: { type: String, required: true },
        quantity: { type: Number, required: true },
        price: { type: Number, required: true },
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        date: { type: Date, default: Date.now() },
      },
    ],

    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: { type: Object, required: true },
    totalBill: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      default: "pending",
      enum: ["pending", "processing", "shipped", "deliverd", "cancel"],
    },
  },
  { timestamps: true }
);

export default mongoose.model("Order", OrderSchema);
