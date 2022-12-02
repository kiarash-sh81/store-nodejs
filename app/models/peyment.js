const {Schema, default: mongoose} = require('mongoose');

const schema = new Schema({

});

module.exports ={
    PaymentMoldle : mongoose.model("payments",schema)
}