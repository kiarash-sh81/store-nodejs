const {Schema, default: mongoose} = require('mongoose');
const { getCourseTime } = require('../utils/function');
const { commentSchema } = require('./public.schema');
const episodes = new Schema({
    title:{type: String , requierd: true},
    text:{type: String , requierd: true},
    type:{type: String , default: "unlock"},
    time:{type: String , requierd: true},
    videoAddress: {type: String , default : ""}
}, {toJSON:{virtuals: true}});
episodes.virtual("videoURL").get(function(){
    return `http://localhost:3000/${this.videoAddress}`
});
const chapter = new Schema({
    title: {type: String , requierd: true},
    text: {type: String , default: ""},
    episodes:{type:[episodes] , default:[]}
});

const courseSchema = new Schema({
    title : {type: String , requierd: true},
    short_text : {type: String , requierd: true},
    text : {type: String , requierd: true},
    images : {type: String , requierd: true},
    tags : {type: [String] , default:[]},
    category : {type: mongoose.Types.ObjectId ,ref: "category", requierd: true},
    comments : {type: [commentSchema] , default: []},
    likes : {type: [mongoose.Types.ObjectId] ,ref: "user" , default: []},
    dislikes : {type: [mongoose.Types.ObjectId] ,ref: "user", default: []},
    bookmarks : {type: [mongoose.Types.ObjectId] ,ref: "user", default : []},
    price : {type: Number , default: 0},
    discount : {type: Number , default: 0},
    type : {type: String ,default:"free"/*free , cash , special */ ,requierd: true},
    status:{type: String , default: "notStarted"/*holding , notStarted , completed*/},
    time : {type: String , default: "00:00:00" },
    teacher : {type: mongoose.Types.ObjectId ,ref: "user", requierd: true},
    chapters:{type: [chapter] , default: []},
    students: {type: [mongoose.Types.ObjectId] , ref: "user" ,default: []}
} ,{toJSON:{virtuals:true}});

courseSchema.index({title: "text" , short_text: "text" , text: "text"});
courseSchema.virtual("imageURL").get(function(){
    return `http://localhost:3000/${this.images}`
});
courseSchema.virtual("totalTime").get(function(){
    return getCourseTime(this.chapters);
})

module.exports ={
    CoursesModel : mongoose.model("course",courseSchema)
}