const {Schema, default: mongoose} = require('mongoose');
const { commentSchema } = require('./public.schema');
const episodes = new Schema({
    title:{type: String , requierd: true},
    text:{type: String , requierd: true},
    type:{type: String , default: "free"},
    time:{type: String , requierd: true}
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
    likes : {type: [mongoose.Types.ObjectId] , default: []},
    dislikes : {type: [mongoose.Types.ObjectId] , default: []},
    bookmarks : {type: [mongoose.Types.ObjectId] , default : []},
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

module.exports ={
    CoursesModel : mongoose.model("course",courseSchema)
}