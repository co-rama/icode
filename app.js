const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
require("dotenv").config();

const app = express();
const feedRoutes = require("./routes/feed");

const PORT = process.env.PORT;
const MONGODB_URI = process.env.MONGODB_URI;

const diskStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString + "-" + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimeType === "images/jpg" ||
    file.mimeType === "image/jpeg" ||
    file.mimeType === "image/png"
  ) {
    return cb(null, true);
  }
  cb(null, false);
};

//MIDDLEWARES
app.use(bodyParser.json()); //application/json
app.use(bodyParser.urlencoded({ extended: false }));

app.use("/images", express.static(path.join(__dirname, "images")));
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
app.use(multer({storage: diskStorage, fileFilter: fileFilter}).single('image'))
// app.use(cors());

//FEED ROUTES
app.use("/feed", feedRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  const status = err.statusCode || 500;
  const message = err.message;
  res.status(status).json({ message: message });
  next();
});

mongoose.connect(
  MONGODB_URI,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (err) => {
    if (err != null) {
      app.listen(PORT, null, (error) => {
        if (!error) {
          return console.log(
            "Mongoose is not connected due to low internet connectivity\nListening to PORT: " +
              PORT
          );
        }
        console.log(error);
      });
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
