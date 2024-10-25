const multer = require("multer");
const express = require("express");
const {
  dynamicStorage,
  serveStorageFiles,
  getFileTypeFromMimeType,
  deleteFileFromStorage,
} = require("../helpers/storage");
const MediaFile = require("../models/MediaFile");
const Product = require("../models/Product");
const router = express.Router();
var uniqid = require("uniqid");
const upload = multer({ storage: dynamicStorage });

router.post(
  "/add",
  upload.fields([{ name: "productPictures", maxCount: 4 }]),
  async (req, res) => {
    console.log(req.files, req.file);

    if (req.files) {
      let allPictures = req.files.productPictures;
      let allPicturesIdArray = [];
      for (let k = 0; k < allPictures.length; k++) {
        const element = allPictures[k];
        let savePicture = await MediaFile.create({
          url: serveStorageFiles(element.destination, element.filename),
          filename: element.filename,
          type: getFileTypeFromMimeType(element.mimetype),
        });
        allPicturesIdArray.push(savePicture._id);
      }
      let createProduct = await Product.create({
        ...req.body,
        // productNumber: uniqid.time(),
        pictures: allPicturesIdArray,
      });

      res.send(createProduct);
    } else {
      res.status(400).json({ noFileFound: true });
    }
  }
);

router.put("/update/:productId", upload.any(), async (req, res) => {
  console.log(req.body);

  let upProduct = await Product.findByIdAndUpdate(
    req.params.productId,
    req.body
  );
  res.send(upProduct);
});

router.put(
  "/update-file/:productId",
  upload.fields([{ name: "productPictures", maxCount: 1 }]),
  async (req, res) => {
    const { fileIndex } = req.body;
    const productFile = req.files.productPictures[0];
    let savePicture = await MediaFile.create({
      url: serveStorageFiles(productFile.destination, productFile.filename),
      filename: productFile.filename,
      type: getFileTypeFromMimeType(productFile.mimetype),
    });
    const findProduct = await Product.findById(req.params.productId);
    findProduct.pictures[fileIndex] = savePicture._id;
    await findProduct.save();
    res.send(findProduct);
  }
);

router.get("/all", async (req, res) => {
  const products = await Product.find().populate("pictures");
  res.send(products);
});

router.get("/:productId", async (req, res) => {
  const product = await Product.findById(req.params.productId).populate(
    "pictures"
  );
  res.send(product);
});

router.delete("/delete/:productId", async (req, res) => {
  const findP = await Product.findById(req.params.productId).populate(
    "pictures"
  );
  const deleteReview = await Product.findByIdAndDelete(req.params.productId);
  for (let i = 0; i < findP.pictures.length; i++) {
    const element = findP.pictures[i];
    // deleteFileFromStorage("/products/" + element.filename);
  }
  res.send(deleteReview);
});

module.exports = router;
