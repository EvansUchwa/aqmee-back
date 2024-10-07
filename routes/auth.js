require("dotenv").config();
const express = require("express");
const User = require("../models/User");
const router = express.Router();
const bcrypt = require("bcrypt");
const saltRounds = 10;

var jwt = require("jsonwebtoken");
const { middleware } = require("../middleware");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (email && password) {
      const findUserEmail = await User.findOne({ email: email });

      if (findUserEmail) {
        let comparePass = await bcrypt.compare(
          password,
          findUserEmail.password
        );
        if (comparePass == true) {
          var token = jwt.sign(
            { id: findUserEmail._id, grade: findUserEmail.grade },
            process.env.JWT_SECRET
          );
          return res.send({ logged: true, token });
        } else {
          res.status(400).json({ passwordIncorrect: true });
        }
      } else {
        res.status(400).json({ emailNotFound: true });
      }
    } else {
      res.status(400).json({ bodyIncomplete: true });
    }
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true });
  }
});

router.get("/user", middleware, async (req, res) => {
  try {
    const { id, grade } = req.userConnected;
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    console.log(error);
    res.status(400).json({ error: true });
  }
});

module.exports = router;
