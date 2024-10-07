require("dotenv").config();
const express = require("express");
const { dbConnect } = require("./helpers/db.js");
const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
app.use("/Storage", express.static(__dirname + "/Storage"));
app.use("/api/formation", require("./routes/formation.js"));
app.use("/api/auth", require("./routes/auth.js"));
app.use("/api/review", require("./routes/review.js"));
app.use("/api/product", require("./routes/product.js"));
app.use("/api/leadPage", require("./routes/leadPage.js"));

app.listen(5100, (err) => {
  if (err) {
    console.log("Erreur survenue");
  } else {
    console.log("Le Serveur demarrer sur le port 5100");
    dbConnect().catch((err) => console.log(err));
  }
});
