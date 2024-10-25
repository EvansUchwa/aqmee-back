const mongoose = require("mongoose");
const { Schema } = mongoose;

const theSchema = new Schema(
  {
    subject: {
      type: String,
      required: true,
    },

    message: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("newletterMail", theSchema);
