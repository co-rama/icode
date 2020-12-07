const express = require("express");
const { body } = require("express-validator");

const router = express.Router();

const feedController = require("../controllers/feedController");

//FEED
// feed/posts
router.get("/posts", feedController.getPosts);
// feed/post
router.post(
  "/post",
  [
    body("title").trim().isLength({ min: 8 }),
    body("content").trim().isLength({ min: 5 }),
  ],
  feedController.createPost
);

router.get('/post:postId', feedController.getPost);

module.exports = router;
