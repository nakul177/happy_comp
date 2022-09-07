const express = require("express");
const connect = require("./configs/db");
const app = express();
app.use(express.json());

const postController = require("./controllers/post.controller")
const commentController = require("./controllers/comment.controller")

app.use("/post" , postController)
app.use("/comments" , commentController)


app.listen(3001 , async () => {
    try {
      await connect();
      console.log("port 3001");
    } catch (err) {
      console.log(err.message);
    }
  });
