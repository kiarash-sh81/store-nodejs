const {Schema, default: mongoose} = require('mongoose');

const schema = new Schema({
    invoceNumber:{type: String},
    authority:{type: String},
    amount: {type: Number},
    payDate:{type: String , default: ""},
    description: {type: String , default: "بابت پرداخت برای خرید دوره و محصولات"},
    verify:{type: Boolean , default: false},
    user: {type: mongoose.Types.ObjectId , ref: "user"},
    basket: {type: Object , default: {}},
    refID: {type: String , default: undefined},
    cardHash: {type: String , default: undefined},

} , {timestamps: true});

module.exports ={
    PaymentMoldle : mongoose.model("payments",schema)
}