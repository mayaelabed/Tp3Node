const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    body :{type: String,unique:true},
    postDate : Date
})
const Post = mongoose.model('Post',postSchema);
module.exports=Post;