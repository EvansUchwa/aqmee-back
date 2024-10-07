const express = require("express");
const Formations = require("../models/Formation");
const router = express.Router();

router.post("/add", async (req, res) => {
  try {
    const { name, price, time, details } = req.body;
    if (name && price && time && details) {
      const newFormation = await Formations.create({
        name,
        price,
        time,
        details,
      });
      res.send("Formation ajouter");
    } else {
      res.status(400).json({ error: true, bodyImcomplete: true });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true });
  }
});

router.get("/all", async (req, res) => {
  try {
    const allFormation = await Formations.find();
    res.send(allFormation);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true });
  }
});

router.get("/one/:formationId", async (req, res) => {
  try {
    const formation = await Formations.findOne({ _id: req.params.formationId });
    res.send(formation);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true });
  }
});

router.put("/update/:formationId", async (req, res) => {
  try {
    const updateFormation = await Formations.findByIdAndUpdate(
      req.params.formationId,
      req.body
    );
    res.send({ updated: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true });
  }
});

router.delete("/delete/:formationId", async (req, res) => {
  try {
    const deleteFormation = await Formations.findByIdAndDelete(
      req.params.formationId
    );
    res.send({ deleted: true });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true });
  }
});

module.exports = router;
