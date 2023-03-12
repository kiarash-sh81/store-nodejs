const {Schema, default: mongoose} = require('mongoose');
const { commentSchema } = require('./public.schema');


const schema = new Schema({
    author : {type: mongoose.Types.ObjectId ,ref: "user", required : true},
    title : {type: String , required : true},
    short_text : {type: String , required : true},
    text : {type: String , required : true},
    image : {type: String , required : true},
    tags : {type: [String]},
    category : {type: [mongoose.Types.ObjectId] ,ref: "category" , required : true},
    comments : {type: [commentSchema] , default: []},
    likes : {type: [mongoose.Types.ObjectId] ,ref: "user", default:[]},
    dislikes : {type: [mongoose.Types.ObjectId] ,ref: "user", default:[]},
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
schema.virtual("imageURL").get(function(){
    return `http://localhost:3000/${this.image}`
})

module.exports ={
    BlogMoldle : mongoose.model("blog",schema)
}