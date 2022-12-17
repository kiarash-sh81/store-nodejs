const {Schema, default: mongoose} = require('mongoose');

const schema = new Schema({
    title: {type: String , required: true},
    parent: {type: mongoose.Types.ObjectId }
});

module.exports ={
    CategoryMoldle : mongoose.model("category",schema)
}