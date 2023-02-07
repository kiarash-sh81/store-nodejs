const {Schema, default: mongoose} = require('mongoose');

const Userschema = new Schema({
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
},{timestamps: true,toJSON:{virtuals: true}});
Userschema.index({phone: "text" ,first_name: "text" , last_name: "text" , username: "text" , email: "text"});
Userschema.virtual("user" , {
    ref: "user",
    localField: "_id",
    foreignField: "author"
});


module.exports ={
    UserMoldle : mongoose.model("user",Userschema)
}