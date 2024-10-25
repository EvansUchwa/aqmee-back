require("dotenv").config();

const nodePath = require("path");
const fs = require("fs");
const multer = require("multer");

var productsDir = "./Storage/products";
var reviewDir = "./Storage/reviews";
var userPicDir = "./Storage/autorPictures";
var otherMediasDir = "./Storage/otherMedias";
var documentsDir = "./Storage/documents";

const reviewStorage = makeMulterStorage(reviewDir);
const userPicStorage = makeMulterStorage(userPicDir);

function serveStorageFiles(path, filename) {
  if (process.env.NODE_ENV == "production")
    return process.env.APP_URL_PROD + path.replace("./", "/") + "/" + filename;
  return process.env.APP_URL_DEV + path.replace("./", "/") + "/" + filename;
}

function deleteFileFromStorage(fileName) {
  const directoryPath = "./Storage/" + fileName;
  fs.unlink(directoryPath, (err) => {
    if (err) {
      // throw err;
    } else {
      console.log("File Deleted");
    }
  });
}

function createDirectoryIfNotExist(dirPath) {
  if (!fs.existsSync(dirPath)) {
    return fs.mkdirSync(dirPath);
  }
}

function makeMulterStorage(path) {
  createDirectoryIfNotExist("./Storage");

  return multer.diskStorage({
    destination: function (req, file, cb) {
      createDirectoryIfNotExist(path);
      cb(null, path);
    },
    filename: function (req, file, cb) {
      const ext = nodePath.extname(file.originalname);
      const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
      cb(null, file.fieldname + "-" + uniqueSuffix + ext);
    },
  });
}

const dynamicStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    createDirectoryIfNotExist("./Storage");
    createDirectoryIfNotExist(reviewDir);
    createDirectoryIfNotExist(userPicDir);
    createDirectoryIfNotExist(productsDir);
    createDirectoryIfNotExist(otherMediasDir);
    createDirectoryIfNotExist(documentsDir);

    if (file.fieldname === "audioOrVideo") {
      cb(null, reviewDir);
    } else if (file.fieldname === "autorPicture") {
      cb(null, userPicDir);
    } else if (file.fieldname === "productPictures") {
      cb(null, productsDir);
    } else if (file.fieldname === "otherMedias") {
      cb(null, otherMediasDir);
    } else if (file.fieldname === "documents") {
      cb(null, documentsDir);
    } else {
      cb(new Error("Invalid fieldname"));
    }
  },
  filename: (req, file, cb) => {
    const ext = nodePath.extname(file.originalname);
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  },
});

function getFileTypeFromMimeType(mimeType) {
  if (mimeType.startsWith("image/")) {
    return "image";
  } else if (mimeType.startsWith("audio/")) {
    return "audio";
  } else if (mimeType.startsWith("video/")) {
    return "video";
  } else {
    return "unknown";
  }
}
module.exports = {
  serveStorageFiles,
  deleteFileFromStorage,
  createDirectoryIfNotExist,
  makeMulterStorage,
  dynamicStorage,
  reviewDir,
  userPicDir,
  getFileTypeFromMimeType,
};
