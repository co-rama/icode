const e = require("express");
exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: "1",
        title: "First post",
        content: "This is the first Post",
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
      creator : {
        name : 'Corama'
      }
    },
  });
};
