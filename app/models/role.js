const {Schema, default: mongoose , model} = require('mongoose');

const RoleSchema = new Schema({
    title: {type: String , unique: true},
    permission : {type: [mongoose.Types.ObjectId] , ref: "permission" , default: []},
    description:{type: String , default: ""}
} , {toJSON:{virtuals: true}});

module.exports ={
    RoleModel : model("role" , RoleSchema)
}