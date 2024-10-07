const mongoose = require("mongoose");
const { Schema } = mongoose;

const userReviewSchema = new Schema(
  {
    autorName: {
      type: String,
      required: true,
    },
    autorPicture: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mediaFile",
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    audioOrVideo: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mediaFile",
      required: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("userReview", userReviewSchema);
