const multer = require("multer");
const express = require("express");
const {
  dynamicStorage,
  serveStorageFiles,
  getFileTypeFromMimeType,
} = require("../helpers/storage");
const MediaFile = require("../models/MediaFile");
const UserReview = require("../models/UserReview");
const LeadPageContent = require("../models/LeadPageContent");
const router = express.Router();

const upload = multer({ storage: dynamicStorage });

function getLastMaxOrder(objets) {
  if (objets.length > 0) {
    const objetAvecMaxOrder = objets.reduce((max, obj) => {
      return obj.order > max.order ? obj : max;
    }, objets[0]);
    return objetAvecMaxOrder.order;
  }
  return 0;
}
// router.post(
//   "/add",
//   upload.fields([
//     { name: "autorPicture", maxCount: 1 },
//     { name: "audioOrVideo", maxCount: 1 },
//   ]),
//   async (req, res) => {
//     const { autorName, text } = req.body;
//     if (req.files.autorPicture && req.files.audioOrVideo) {
//       res.send(newreview);
//     } else {
//       res.status(400).json({ noFileFound: true });
//     }
//   }
// );

router.post("/add-paragraph", async (req, res) => {
  const { paragraph } = req.body;
  if (paragraph) {
    const allContent = await LeadPageContent.find();
    const lastOrder = getLastMaxOrder(allContent);

    const newC = await LeadPageContent.create({
      contentType: "paragraph",
      paragraph,
      order: lastOrder + 1,
    });
    res.send(newC);
  } else {
    res.status(400).json({ noFileFound: true });
  }
});

router.post(
  "/add-gallery",
  upload.fields([{ name: "otherMedias", maxCount: 10 }]),
  async (req, res) => {
    if (req.files.otherMedias) {
      const allContent = await LeadPageContent.find();
      const lastOrder = getLastMaxOrder(allContent);
      const gallery = [];
      const allFiles = req.files.otherMedias;
      for (let i = 0; i < allFiles.length; i++) {
        const element = allFiles[i];
        let saveMedia = await MediaFile.create({
          url: serveStorageFiles(element.destination, element.filename),
          filename: element.filename,
          type: getFileTypeFromMimeType(element.mimetype),
        });
        gallery.push(saveMedia._id);
      }
      const newC = await LeadPageContent.create({
        contentType: "gallery",
        gallery,
        order: lastOrder + 1,
      });
      res.send(newC);
    } else {
      res.status(400).json({ noFileFound: true });
    }
  }
);

router.post(
  "/add-video",
  upload.fields([{ name: "otherMedias", maxCount: 1 }]),
  async (req, res) => {
    if (req.files.otherMedias) {
      const allContent = await LeadPageContent.find();
      const lastOrder = getLastMaxOrder(allContent);
      const video = req.files.otherMedias[0];
      let saveMedia = await MediaFile.create({
        url: serveStorageFiles(video.destination, video.filename),
        filename: video.filename,
        type: getFileTypeFromMimeType(video.mimetype),
      });

      const newC = await LeadPageContent.create({
        contentType: "video",
        video: saveMedia._id,
        order: lastOrder + 1,
      });
      res.send(newC);
    } else {
      res.status(400).json({ noFileFound: true });
    }
  }
);

router.post("/add-reviews", async (req, res) => {
  const allContent = await LeadPageContent.find();
  const lastOrder = getLastMaxOrder(allContent);
  const newC = await LeadPageContent.create({
    contentType: "reviews",
    reviews: true,
    order: lastOrder + 1,
  });
  res.send(newC);
});

router.post("/add-button", async (req, res) => {
  const allContent = await LeadPageContent.find();
  const lastOrder = getLastMaxOrder(allContent);
  const { buttonText, buttonLink } = req.body;
  const newC = await LeadPageContent.create({
    contentType: "button",
    buttonText,
    buttonLink,
    order: lastOrder + 1,
  });
  res.send(newC);
});

router.get("/all", async (req, res) => {
  const newC = await LeadPageContent.find()
    .populate("gallery")
    .populate("video");
  res.json(newC);
});

router.put("/up-order/:contentId", async (req, res) => {
  const findContent = await LeadPageContent.findById(req.params.contentId);
  const findPrevContent = await LeadPageContent.findOneAndUpdate(
    { order: findContent.order - 1 },
    {
      order: findContent.order,
    }
  );
  findContent.order = findPrevContent.order;
  await findContent.save();

  res.json(true);
});

router.put("/down-order/:contentId", async (req, res) => {
  const findContent = await LeadPageContent.findById(req.params.contentId);
  const findNextContent = await LeadPageContent.findOneAndUpdate(
    { order: findContent.order + 1 },
    {
      order: findContent.order,
    }
  );
  findContent.order = findNextContent.order;
  await findContent.save();

  res.json(true);
});

router.delete("/delete/:contentId", async (req, res) => {
  const deleteC = await LeadPageContent.findByIdAndDelete(req.params.contentId);
  const allC = await LeadPageContent.find();
  for (let k = 0; k < allC.length; k++) {
    const element = allC[k];
    await LeadPageContent.findByIdAndUpdate(element._id, { order: k + 1 });
  }
  res.json(deleteC);
});

module.exports = router;
