const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentTypeEnum = ["product", "newletter"];

const theSchema = new Schema(
  {
    leadType: {
      type: String,
      required: true,
      enum: contentTypeEnum,
    },
    blocked: {
      type: Boolean,
    },
    email: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("lead", theSchema);
