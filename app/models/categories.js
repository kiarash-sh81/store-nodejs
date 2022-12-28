const { path } = require('@hapi/joi/lib/errors');
const {Schema, default: mongoose} = require('mongoose');

const schema = new Schema({
    title: {type: String , required: true},
    parent: {type: mongoose.Types.ObjectId , ref: "category" , default: undefined}
},{
    id: false,
    toJSON:{
        virtuals: true
    }
});
schema.virtual("children" , {
    ref: "category",
    localField: "_id",
    foreignField: "parent"
});
function prePopulate(next){
    this.populate({path: "children" , select: {__v: 0 , id : 0}});
    next();
}
schema.pre("findOne" , prePopulate).pre("find" , prePopulate);

module.exports ={
    CategoryMoldle : mongoose.model("category",schema)
}