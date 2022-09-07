const express = require("express");
const router = express.Router();

const Post = require("../models/post.model")
const Comment = require("../models/comment.model")

router.get("/", async (req, res) => {
    try {
      const post = await Post.find()
      const comment = await Comment.find()

      for(let i=0 ; i<post.length ; i++){
        let comments = []
        for(let c=0 ; c<comment.length ; c++){
          if(String(post[i]._id)===String(comment[c].postId)){
            comments.unshift(comment[c])
          }
        }
        post[i]={...post[i]._doc , comments:comments}
      }

  
      return res.send(post);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  router.post("/createpost", async (req, res) => {
    try {
      const post = await Post.create(req.body);
  
      return res.send(post).status(200);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  router.get("/:id", async (req, res) => {
    try {
      const post = await Post.findById(req.params.id).lean().exec();
  
      return res.send(post);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  router.patch("/:id", async (req, res) => {
    try {
      const post = await Post.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
      });
  
      return res.send(post);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });
  
  router.delete("/:id", async (req, res) => {
    try {
      const post = await Post.findByIdAndDelete(req.params.id).lean().exec();
  
      return res.send(post);
    } catch (err) {
      return res.status(500).send(err.message);
    }
  });

  module.exports = router;
