const {Schema, default: mongoose} = require('mongoose');
const { commentSchema } = require('./public.schema');

const Productschema = new Schema({
    title : {type: String , requierd: true},
    short_text : {type: String , requierd: true},
    text : {type: String , requierd: true},
    images : {type: [String] , requierd: true},
    tags : {type: [String] , default:[]},
    category : {type: mongoose.Types.ObjectId ,ref: "category", requierd: true},
    comments : {type: [commentSchema] , default: []},
    likes : {type: [mongoose.Types.ObjectId] , default: []},
    dislikes : {type: [mongoose.Types.ObjectId] , default: []},
    bookmarks : {type: [mongoose.Types.ObjectId] , default : []},
    price : {type: Number , default: 0},
    discount : {type: Number , default: 0},
    count : {type: Number },
    type : {type: String , requierd: true},
    format : {type: String },
    suplier : {type: mongoose.Types.ObjectId , ref: "user",requierd: true},
    feature : {type: Object , default:{
        length:"",
        height:"",
        wedth:"",
        weight:"",
        colors: [],
        model: [],
        madein:""
    }},
}, {toJSON:{virtuals: true}});
Productschema.index({title : "text" , short_text : "text", text : "text"});
Productschema.virtual("imagesURL").get(function(){
    return this.images.map(image => `http://localhost:3000/${image}`)
})
module.exports ={
    ProductsMoldle : mongoose.model("products",Productschema)
}