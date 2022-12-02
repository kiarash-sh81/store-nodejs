const {Schema, default: mongoose} = require('mongoose');

const schema = new Schema({
    title : {type: String , requierd: true},
    short_desc : {type: String , requierd: true},
    total_desc : {type: String , requierd: true},
    images : {type: [String] , requierd: true},
    tags : {type: [String] , default:[]},
    category : {type: mongoose.Types.ObjectId , requierd: true},
    comments : {type: [] , default: []},
    like : {type: [mongoose.Types.ObjectId] , default: []},
    dislike : {type: [mongoose.Types.ObjectId] , default: []},
    bookmark : {type: [mongoose.Types.ObjectId] , default : []},
    price : {type: Number , default: 0},
    discount : {type: Number , default: 0},
    count : {type: Number },
    type : {type: String , requierd: true},
    time : {type: String },
    format : {type: String },
    teacher : {type: mongoose.Types.ObjectId , requierd: true},
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