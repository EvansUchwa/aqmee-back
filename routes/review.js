const multer = require("multer");
const express = require("express");
const {
  dynamicStorage,
  serveStorageFiles,
  getFileTypeFromMimeType,
} = require("../helpers/storage");
const MediaFile = require("../models/MediaFile");
const UserReview = require("../models/UserReview");
const router = express.Router();

const upload = multer({ storage: dynamicStorage });

router.post(
  "/add",
  upload.fields([
    { name: "autorPicture", maxCount: 1 },
    { name: "audioOrVideo", maxCount: 1 },
  ]),
  async (req, res) => {
    const { autorName, text } = req.body;
    if (req.files.autorPicture && req.files.audioOrVideo) {
      let userPicture = req.files.autorPicture[0];
      let audioOrVideo = req.files.audioOrVideo[0];
      let userPictureSave = await MediaFile.create({
        url: serveStorageFiles(userPicture.destination, userPicture.filename),
        filename: userPicture.filename,
        type: getFileTypeFromMimeType(userPicture.mimetype),
      });
      let audioOrVideoSave = await MediaFile.create({
        url: serveStorageFiles(audioOrVideo.destination, audioOrVideo.filename),
        filename: audioOrVideo.filename,
        type: getFileTypeFromMimeType(audioOrVideo.mimetype),
      });

      const newreview = await UserReview.create({
        autorName,
        text,
        autorPicture: userPictureSave._id,
        audioOrVideo: audioOrVideoSave._id,
      });
      res.send(newreview);
    } else {
      res.status(400).json({ noFileFound: true });
    }
  }
);

router.put(
  "/update/:reviewId",
  upload.fields([
    { name: "autorPicture", maxCount: 1 },
    { name: "audioOrVideo", maxCount: 1 },
  ]),
  async (req, res) => {
    const { autorName, text } = req.body;

    let finalBody = { autorName, text };

    if (req.files.autorPicture) {
      let userPicture = req.files.autorPicture[0];
      if (userPicture) {
        let userPictureSave = await MediaFile.create({
          url: serveStorageFiles(userPicture.destination, userPicture.filename),
          filename: userPicture.filename,
          type: getFileTypeFromMimeType(userPicture.mimetype),
        });
        finalBody.autorPicture = userPictureSave._id;
      }
    }

    if (req.files.audioOrVideo) {
      let audioOrVideo = req.files.audioOrVideo[0];
      if (audioOrVideo) {
        let audioOrVideoSave = await MediaFile.create({
          url: serveStorageFiles(
            audioOrVideo.destination,
            audioOrVideo.filename
          ),
          filename: audioOrVideo.filename,
          type: getFileTypeFromMimeType(audioOrVideo.mimetype),
        });
        finalBody.audioOrVideo = userPictureSave._id;
      }
    }

    const newreview = await UserReview.findByIdAndUpdate(
      req.params.reviewId,
      finalBody
    );
    res.send(newreview);
  }
);

router.get("/all", async (req, res) => {
  const allReviews = await UserReview.find()
    .populate("audioOrVideo")
    .populate("autorPicture");
  res.send(allReviews);
});

router.delete("/delete/:reviewId", async (req, res) => {
  const findP = await UserReview.findById(req.params.reviewId)
    .populate("audioOrVideo")
    .populate("autorPicture");

  deleteFileFromStorage("/reviews/" + findP.audioOrVideo.filename);
  deleteFileFromStorage("/autorPictures/" + findP.autorPicture.filename);
  const deleteReview = await UserReview.findByIdAndDelete(req.params.reviewId);
  res.send(deleteReview);
});

module.exports = router;
