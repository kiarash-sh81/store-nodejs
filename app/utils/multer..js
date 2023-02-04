const multer = require('multer');
const path = require('path');
const fs = require('fs');
const creatError = require('http-errors');
function createRoute(req){
    const date = new Date();
    const Year = date.getFullYear().toString();
    const Mounth = date.getMonth().toString();
    const Day = date.getDate().toString();
    const directory = path.join(__dirname , ".." , ".." , "public" , "uploads" , "blogs" , Year , Mounth , Day);
    req.body.fileUploadPath = path.join("uploads" , "blogs" , Year , Mounth , Day);
    fs.mkdirSync(directory , {recursive: true});
    return directory;
}
const storage = multer.diskStorage({
    destination: (req , file , cb)=>{
        if(file?.originalname){
            const filepath = createRoute(req);
            return cb(null , filepath);
        }
        cb(null , null)
    },
    filename: (req , file , cb)=>{
        if(file.originalname){
            const ext = path.extname(file.originalname);
            const fileName = (new Date().getTime() + ext);
            req.body.fileName = fileName;
            return cb(null , fileName);
        }
        cb(null,null);
    }
});
function fileFilter(req, file, cb){
    const ext = path.extname(file.originalname);
    const mimetype = [".jpg",".jpeg",".gif",".png",".webp" ];
    if(mimetype.includes(ext)){
        return cb(null, true);
    }
    return cb(creatError.BadRequest("the file format is incorecct"));
}
function videofileFilter(req, file, cb){
    const ext = path.extname(file.originalname);
    const mimetype = [".mp4",".mpg",".mov",".avi",".mkv"];
    if(mimetype.includes(ext)){
        return cb(null, true);
    }
    return cb(creatError.BadRequest("the video file format is incorecct"));
}
const maxSize = 50 *1000 * 1000;
const videoMaxSize = 300 * 1000 * 1000;
const uploadfile = multer({storage,fileFilter , limits: {fileSize:maxSize}});
const uploadvideofile = multer({storage,videofileFilter , limits: {fileSize:videoMaxSize}});

module.exports = {
    uploadfile,
    uploadvideofile
}