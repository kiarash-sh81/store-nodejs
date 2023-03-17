const {Schema , model, default: mongoose} = require('mongoose');

const messageSchema = new Schema({
    sender: {type: mongoose.Types.ObjectId , ref: "user"},
    message: {type: String},
    dateTime: {type: String}
});

const roomSchema = new Schema({
    name: {type: String},
    description: {type: String},
    image: {type: String},
    messages: {type: [messageSchema] , default: []},
});

const conversationSchema = new Schema({
    title: {type: String , required: true},
    endpoint: {type: String , required: true},
    rooms:{type: [roomSchema] , default: []}
});

module.exports ={
    ConversationModel : model("conversation" , conversationSchema)
}