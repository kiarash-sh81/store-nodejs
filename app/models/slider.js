const {Schema, default: mongoose} = require('mongoose');

const schema = new Schema({
    title: {type: String},
    text: {type: String},
    image: {type: String , required: true},
    type: {type: String , default: "main"},
});

module.exports ={
    SliderMoldle : mongoose.model("slider",schema)
}