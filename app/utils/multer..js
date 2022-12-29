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
        const filepath = createRoute(req);
        cb(null , filepath);
    },
    filename: (req , file , cb)=>{
        const ext = path.extname(file.originalname);
        const fileName = (new Date().getTime() + ext);
        req.body.fileName = fileName;
        cb(null , fileName);
    }
});
function fileFilter(req, file, cb){
    const ext = path.extname(file.originalname);
    const mimetype = [".jpg",".jpeg",".gif",".png",".webp"];
    if(mimetype.includes(ext)){
        return cb(null, true);
    }
    return cb(creatError.BadRequest("the file format is incorecct"));
}
const maxSize = 1 *1000 * 1000;
const uploadfile = multer({storage,fileFilter , limits: {fileSize:maxSize}});

module.exports = {
    uploadfile
}