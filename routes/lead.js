const express = require("express");
const router = express.Router();
const Lead = require("../models/Lead");

router.post("/add", async (req, res) => {
  const { email, leadType } = req.body;
  if (email && leadType) {
    const findEmail = await Lead.findOne({ email });

    if (findEmail) {
      if (findEmail.blocked) {
        return res.json({ blocked: true });
      }
      return res.send(true);
    } else {
      const newLead = await Lead.create({ email, leadType });
      return res.send(newLead);
    }
  } else {
    res.status(400).json({ imcompleteBody: true });
  }
});

router.get("/all", async (req, res) => {
  const { leadType } = req.query;
  let request = {};
  if (leadType) {
    request.leadType = leadType;
  }
  let allLeads = await Lead.find(request);
  res.send(allLeads);
});

router.put("/block/:leadId", async (req, res) => {
  let lead = await Lead.findByIdAndUpdate(req.params.leadId, {
    blocked: true,
  });
  res.send(lead);
});

router.delete("/delete/:leadId", async (req, res) => {
  let lead = await Lead.findByIdAndDelete(req.params.leadId);
  res.send(lead);
});

module.exports = router;
