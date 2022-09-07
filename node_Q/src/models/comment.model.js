const mongoose = require("mongoose");


const commentSchema = new mongoose.Schema({
    postId:{type:mongoose.Schema.Types.ObjectId , ref:"post" , required:true},
    name:{type:String , required:true},
    email:{type:String , required:true},
    body:{type:String , required:true}

},{
    versionKey:false,
    timestamps:true
})


module.exports = mongoose.model("comment" , commentSchema)