const {Schema, default: mongoose} = require('mongoose');

const schema = new Schema({
    title: {type: String , required: true}
});

module.exports ={
    CategoryMoldle : mongoose.model("category",schema)
}