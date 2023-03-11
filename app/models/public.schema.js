const {Schema, default: mongoose} = require('mongoose');
const answersSchema = new Schema({
    user: {type:  mongoose.Types.ObjectId , ref: "user" , required: true},
    comment: {type: String , required: true },
    show: {type: Boolean , required: true  , default: false},
    openToComment: {type: Boolean , required: true  , default: true},
} , {
    timestamps: true
});
const commentSchema = new Schema({
    user: {type:  mongoose.Types.ObjectId , ref: "user" , required: true},
    comment: {type: String , required: true },
    show: {type: Boolean , required: true  , default: false},
    openToComment: {type: Boolean , required: true  , default: true},
    answers: {type: [answersSchema] , default: []}
} , {
    timestamps: true
});

module.exports = {
    commentSchema
}