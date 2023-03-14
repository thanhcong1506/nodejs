import mongoose, { Schema } from "mongoose";
const TransactionSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      //ref: "User",
      required: true,
    },
    hotel: {
      type: String,
      //ref: "Hotel",
      required: true,
    },
    rooms: [Number],
    dateStart: {
      type: Date,
      required: true,
    },
    dateEnd: {
      type: Date,
    },
    price: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      required: true,
    },
    info: {
      type: Object,
      required: false,
    },
    status: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model("Payment", TransactionSchema);
