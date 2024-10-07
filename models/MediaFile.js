const mongoose = require("mongoose");
const { Schema } = mongoose;

const schema = new Schema(
  {
    url: {
      type: String,
      required: true,
    },
    filename: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("mediaFile", schema);
