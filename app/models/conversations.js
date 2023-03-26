const {Schema , model, default: mongoose} = require('mongoose');

const messageSchema = new Schema({
    sender: {type: mongoose.Types.ObjectId , ref: "user"},
    message: {type: String , default:""},
    dateTime: {type: Number}
});

const locationSchema = new Schema({
    sender: {type: mongoose.Types.ObjectId , ref: "user"},
    location: {type: Object , default:{}},
    dateTime: {type: Number}
});

const roomSchema = new Schema({
    name: {type: String},
    description: {type: String},
    image: {type: String},
    messages: {type: [messageSchema] , default: []},
    location: {type: [locationSchema] , default: []},
});

const conversationSchema = new Schema({
    title: {type: String , required: true},
    endpoint: {type: String , required: true},
    rooms:{type: [roomSchema] , default: []}
});

module.exports ={
    ConversationModel : model("conversation" , conversationSchema)
}


