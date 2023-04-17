import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  category: {
    type: "string",
    // type: mongoose.ObjectId,
    // ref: "Category",
    required: true,
  },
  name: {
    type: "String",
    required: true,
  },
  price: {
    type: "Number",
    required: true,
  },
  images: {
    type: [String],
    required: true,
  },
  // img1: {
  //   type: "String",
  //   // data: Buffer,
  //   // contentType: String,
  //   required: true,
  // },
  // img2: {
  //   type: "String",
  //   // data: Buffer,
  //   // contentType: String,
  //   required: true,
  // },
  // img3: {
  //   type: "String",
  //   // data: Buffer,
  //   // contentType: String,
  //   required: true,
  // },
  // img4: {
  //   type: "String",
  //   // data: Buffer,
  //   // contentType: String,
  //   required: true,
  // },

  long_desc: {
    type: "String",
    required: true,
  },
  short_desc: {
    type: "String",
    required: true,
  },
});
export default mongoose.model("Product", productSchema);
