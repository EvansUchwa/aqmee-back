const mongoose = require("mongoose");
const { Schema } = mongoose;

const contentTypeEnum = [
  "gallery",
  "video",
  "pdf",
  "paragraph",
  "reviews",
  "button",
];

const leadPageContentSchema = new Schema(
  {
    contentType: {
      type: String,
      required: true,
      enum: contentTypeEnum,
    },
    gallery: {
      type: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "mediaFile",
        },
      ],
      required: function () {
        if (this.contentType == "gallery") {
          return true;
        }
        return false;
      },
    },
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mediaFile",
      required: function () {
        if (this.contentType == "video") {
          return true;
        }
        return false;
      },
    },
    pdf: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mediaFile",
      required: function () {
        if (this.contentType == "pdf") {
          return true;
        }
        return false;
      },
    },
    pdfImage: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "mediaFile",
      required: function () {
        if (this.contentType == "pdf") {
          return true;
        }
        return false;
      },
    },
    paragraph: {
      type: String,
      required: function () {
        if (this.contentType == "paragraph") {
          return true;
        }
        return false;
      },
    },
    reviews: {
      type: Boolean,
      required: function () {
        if (this.contentType == "reviews") {
          return true;
        }
        return false;
      },
    },
    buttonText: {
      type: String,
      required: function () {
        if (this.contentType == "button") {
          return true;
        }
        return false;
      },
    },
    buttonLink: {
      type: String,
      required: function () {
        if (this.contentType == "button") {
          return true;
        }
        return false;
      },
    },
    order: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("leadPageContent", leadPageContentSchema);
