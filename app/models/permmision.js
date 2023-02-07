const {model , Schema} = require('mongoose');

const PermissionSchema = new Schema({
    title: {type: String , unique: true},
    description:{type: String , default: ""}
} , {toJSON: {virtuals: true}});

module.exports ={
    PermissionModel : model("permission" , PermissionSchema)
}