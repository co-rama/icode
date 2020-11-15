const e = require("express");
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [{ title: "First post", content: "This is the first Post" }],
  });
};
exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  //DB resosurce
  res.status(201).json({
    message: "Post posted successfuly!",
    post: { id: new Date().toISOString(), title: title, content: content },
  });
};
