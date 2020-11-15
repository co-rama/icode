const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();
const feedRoutes = require("./routes/feed");

//MIDDLEWARES
app.use(bodyParser.json()); //application/json
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Methods",
    "*"
  );
  res.setHeader("Access-Control-Headers", "Content-type, Authorization");
  next();
});

//FEED ROUTES
app.use("/feed", feedRoutes);

const PORT = 3000;
app.listen(PORT, null, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("Listening at PORT: " + PORT);
});
