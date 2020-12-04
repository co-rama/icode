const { validationResult } = require("express-validator");
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
    return res
      .status(422)
      .json({
        message: "Validation failed, data entered is incorrect",
        errors: errors.array(),
      });
  }
  const title = req.body.title;
  const content = req.body.content;
  //DB resosurce
  res.status(201).json({
    message: "Post posted successfuly!",
    post: {
      id: new Date().toISOString(),
      title: title,
      content: content,
      createdAt: new Date(),
      creator: {
        name: "Corama",
      },
    },
  });
};
