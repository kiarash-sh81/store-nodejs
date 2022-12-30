const {Schema, default: mongoose} = require('mongoose');
const { commentSchema } = require('./public.schema');

const schema = new Schema({
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
    suplier : {type: mongoose.Types.ObjectId , requierd: true},
    size : {type: Object , default:{
        length:"",
        height:"",
        wedth:"",
        weight:"",
        color: [],
        model: [],
        madein:""
    }},
});

module.exports ={
    ProductsMoldle : mongoose.model("products",schema)
}