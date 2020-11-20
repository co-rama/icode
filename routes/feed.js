const express = require("express");

const router = express.Router();

const feedController = require("../controllers/feedController");

//FEED 
// feed/posts
router.get("/posts", feedController.getPosts);
// feed/post
router.post("/post", feedController.createPost);

module.exports = router;
