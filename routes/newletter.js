const express = require("express");
const NewLetterMail = require("../models/NewletterMail");
const { sendEmail } = require("../helpers/others");
const { mailTemplateContainer } = require("../helpers/mail/template");
const Lead = require("../models/Lead");
const router = express.Router();

router.post("/add", async (req, res) => {
  const { message, subject } = req.body;
  if (message && subject) {
    const addN = await NewLetterMail.create({ message, subject });
    // const allUser = await Lead.find({ leadType: "newletter" });
    const allUser = await Lead.find();
    if (allUser.length > 0) {
      for (let k = 0; k < allUser.length; k++) {
        const element = allUser[k];
        const senM = await sendEmail(
          element.email,
          subject,
          message,
          mailTemplateContainer(message)
        );
      }
    }
    res.send("ok");
  } else {
    res.status(400).json({ noFileFound: true });
  }
});

router.get("/all", async (req, res) => {
  const all = await NewLetterMail.find();
  res.send(all);
});

router.post("/test", async (req, res) => {
  try {
    const senM = await sendEmail(
      "johnsonevans686@gmail.com",
      "Test",
      "Holla Senior",
      mailTemplateContainer("Hey guy")
    );
    res.send("isOk");
  } catch (error) {
    console.log(error);

    res.status(400).json({ error: true });
  }
});

module.exports = router;
