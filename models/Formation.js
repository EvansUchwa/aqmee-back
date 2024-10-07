const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    name: {
      type: String,
      required: false,
    },
    price: {
      type: Number,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    details: {
      type: [],
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("formations", schema);
