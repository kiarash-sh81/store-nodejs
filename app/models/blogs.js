const {Schema, default: mongoose} = require('mongoose');

const commentSchema = new Schema({
    user: {type:  mongoose.Types.ObjectId , ref: "user" , required: true},
    comment: {type: String , required: true},
    createdAt: {type: Date , default: new Date().getTime()},
    parent: {type: mongoose.Types.ObjectId }
})
const schema = new Schema({
    author : {type: mongoose.Types.ObjectId ,ref: "user", required : true},
    title : {type: String , required : true},
    short_text : {type: String , required : true},
    text : {type: String , required : true},
    image : {type: String , required : true},
    tags : {type: [String]},
    category : {type: [mongoose.Types.ObjectId] ,ref: "category" , required : true},
    comments : {type: [commentSchema] , default: []},
    like : {type: [mongoose.Types.ObjectId] ,ref: "user", default:[]},
    dislike : {type: [mongoose.Types.ObjectId] ,ref: "user", default:[]},
    bookmark : {type: [mongoose.Types.ObjectId] ,ref: "user", default:[]},
} , {timestamps : true , versionKey: false, toJSON:{virtuals: true}});
schema.virtual("user" , {
    ref: "user",
    localField: "_id",
    foreignField: "author"
});
schema.virtual("category_deteils" , {
    ref: "category",
    localField: "_id",
    foreignField: "category"
});

module.exports ={
    BlogMoldle : mongoose.model("blog",schema)
}