const {Schema, default: mongoose} = require('mongoose');

const commentSchema = new Schema({
    user: {type:  mongoose.Types.ObjectId , ref: "user" , required: true},
    comment: {type: String , required: true},
    createdAt: {type: Date , default: new Date().getTime()},
    parent: {type: mongoose.Types.ObjectId }
})
const schema = new Schema({
    author : {type: mongoose.Types.ObjectId , required : true},
    title : {type: String , required : true},
    short_text : {type: String , required : true},
    text : {type: String , required : true},
    image : {type: String , required : true},
    tags : {type: [String]},
    category : {type: [mongoose.Types.ObjectId] , required : true},
    comments : {type: [commentSchema] , default: []},
    like : {type: [mongoose.Types.ObjectId] ,ref: "user", default:[]},
    dislike : {type: [mongoose.Types.ObjectId] ,ref: "user", default:[]},
    bookmark : {type: [mongoose.Types.ObjectId] ,ref: "user", default:[]},
} , {timestamps : true , versionKey: false});

module.exports ={
    BlogMoldle : mongoose.model("blog",schema)
}