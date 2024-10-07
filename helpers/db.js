const mongoose = require("mongoose");

async function dbConnect() {
  await mongoose.connect(
    "mongodb+srv://DevAqmee:Golem1234%40Aqmee@aqmee.e1y25.mongodb.net/?retryWrites=true&w=majority&appName=aqmee"
  );
  console.log("Base de donee connecte");

  // use `await mongoose.connect('mongodb://user:password@127.0.0.1:27017/test');` if your database has auth enabled
}

module.exports = {
  dbConnect,
};
