const { validationResult } = require("express-validator");
const Post = require("../models/post");
exports.getPosts = (req, res, next) => {
  Post.find()
  .then(posts => {
    if(!posts){
      const error = new Error('No posts were fetched');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({message : 'Posts were found and fetched successfully', posts: posts})
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  });
  // res.status(200).json({
  //   posts: [
  //     {
  //       _id: "1",
  //       title: "Bread Share",
  //       content: "This is the first Bread Share Post",
  //       imageUrl: "images/home.png",
  //       creator: {
  //         name: "Corama",
  //       },
  //       createdAt: new Date(),
  //     },
  //   ],
  // });
};
exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    const error = new Error("Validation failed, data entered is incorrect");
    error.statusCode = 422;
    throw error;
    // return res.status(422).json({
    //   message: "Validation failed, data entered is incorrect",
    //   errors: errors.array(),
    // });
  }
  const title = req.body.title;
  const content = req.body.content;
  console.log(req.body)
  if(!req.file){
    const error = new Error('No image file provided');
    error.statusCode = 422;
    throw error;
  }
  const imageUrl = req.file.path;
  //DB resosurce
  const post = new Post({
    title: title,
    content: content,
    imageUrl: imageUrl,
    creator: {
      name: "Corama",
    },
  });
  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        post: result,
        message: "Post posted successfuly!",
      });
    })
    .catch((err) => {
      // console.log(err);
      if(!err.statusCode){
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.getPost = (req, res, next) => {
  const postId = req.params.postId;
  // console.log(postId);
  Post.findById(postId)
  .exec()
  .then(post => {
    if(!post){
      const error = new Error('Could not find a post');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({message : 'Post was found.', post: post});
  })
  .catch(err => {
    if(!err.statusCode){
      err.statusCode = 500;
    }
    next(err);
  })
}