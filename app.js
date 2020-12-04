const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();
const feedRoutes = require("./routes/feed");

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

//MIDDLEWARES
app.use(bodyParser.json()); //application/json
app.use(bodyParser.urlencoded({ extended: false }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Requested-With"
  );
  // res.setHeader('Access-Control-Allow-Credentials', true)
  next();
});
// app.use(cors());

//FEED ROUTES
app.use("/feed", feedRoutes);

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err) {
      console.log(err);
      return;
    }
    app.listen(PORT, null, (error) => {
      if (error) {
        console.log(error);
        return;
      }
      console.log("Listening at PORT: " + PORT);
    });
  }
);
