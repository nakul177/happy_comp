const mongoose = require("mongoose");

const postSchema = new mongoose.Schema(
    {
      userId:{type:Number , default:1},  
      title: { type: String, required: true },
      body: { type: String, required: true },
  
    },
    {
      versionKey: false, 
      timestamps: true,
    }
  );
  

 module.exports = mongoose.model("post", postSchema)
