const express = require("express");
const bodyParser = require('body-parser');
const path = require("path");

const app = express();

//MIDDLEWARES
app.use(bodyParser.json());

//FEED ROUTES
const feedRoutes = require("./routes/feed");
app.use("/feed", feedRoutes);

const PORT = 3000;
app.listen(PORT, null, (error) => {
  if (error) {
    console.log(error);
    return;
  }
  console.log("Listening at PORT: " + PORT);
});
