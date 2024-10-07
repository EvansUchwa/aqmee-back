const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    pictures: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "mediaFile",
        },
      ],
      required: true,
    },
    supplierPrice: {
      type: Number,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    supplierLink: {
      type: String,
      required: true,
    },
    competitorLink: {
      type: String,
      required: true,
    },
    competitorPubLink: {
      type: String,
      required: true,
    },
    productNumber: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("product", schema);
