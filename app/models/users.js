const {Schema, default: mongoose} = require('mongoose');

const schema = new Schema({
    first_name: {type: String},
    last_name: {type: String},
    username: {type: String  , lowercase:true},
    phone: {type: String  , required: true},
    email: {type: String, lowercase: true},
    password: {type: String},
    otp: {type: Object , default: {
        code: 0,
        expiresIn : 0
    }},
    bills: {type: [] , default: []},
    discount: {type: Number , default: 0},
    birthDay: {type: String},
    Roles: {type: [] , default: ["USER"]},
    courses:{type: [mongoose.Types.ObjectId] , ref: "course" , default: []}
},{timeseries: true,toJSON:{virtuals: true}});
schema.virtual("user" , {
    ref: "user",
    localField: "_id",
    foreignField: "author"
});

module.exports ={
    UserMoldle : mongoose.model("user",schema)
}