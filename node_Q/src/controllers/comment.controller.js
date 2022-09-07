const express = require("express");
const router = express.Router();


const Comment = require("../models/comment.model")
const Post = require("../models/post.model")

router.get("/", async (req, res) => {
    try {
      const comments = await Comment.find()
        .lean()
        .exec();
  
      return res.send(comments);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  router.post("/", async (req, res) => {
    try {
      let post = await Post.findById(req.body.postId)
   if(!post){
    return res.status(400).send({message:"Post dosen't exist "});
   }
      const comment = await Comment.create(req.body);
  
      return res.send(comment);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const comment = await Comment.findById(req.params.id).lean().exec();
  
      return res.send(comment);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  router.patch("/:id", async (req, res) => {
    try {
      const comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      return res.send(comment);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const comment = await Comment.findByIdAndDelete(req.params.id)
        .lean()
        .exec();
  
      return res.send(comment);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

  
  module.exports = router;