const {Schema, default: mongoose} = require('mongoose');

const courseSchema = new Schema({
    courseID : {type: mongoose.Types.ObjectId , ref: "course"},
    count:{type: Number , default: 1}
});
const productSchema = new Schema({
    productID : {type: mongoose.Types.ObjectId , ref: "product"},
    count:{type: Number , default: 1}
});

const BasketSchema =  new Schema({
    course: {type: [courseSchema] , default: []},
    product: {type: [productSchema] , default: []}
});

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
    Role: {type: String , default: "USER"},
    courses:{type: [mongoose.Types.ObjectId] , ref: "course" , default: []},
    products:{type: [mongoose.Types.ObjectId] , ref: "product" , default: []},
    basket:{type: BasketSchema , default: {}}
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