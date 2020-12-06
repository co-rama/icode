const { validationResult } = require("express-validator");
const Post = require("../models/post");
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "Bread Share",
        content: "This is the first Bread Share Post",
        imageUrl: "images/home.png",
        creator: {
          name: "Corama",
        },
        createdAt: new Date(),
      },
    ],
  });
};
exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    return res.status(422).json({
      message: "Validation failed, data entered is incorrect",
      errors: errors.array(),
    });
  }
  const title = req.body.title;
  const content = req.body.content;
  //DB resosurce
  const post = new Post({
    title: title,
    content: content,
    imageUrl : 'images/duck.jpg',
    creator: {
      name: "Corama",
    },
  });
  post.save()
  .then(result => {
    console.log(result);
    res.status(201).json({
      post: result,
      message: "Post posted successfuly!",
    });
  })
  .catch(err => console.log(err))
  
};
