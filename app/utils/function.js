const { UserMoldle } = require("../models/users");
const { SECRET_KEY, ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("./constans");
const JWT = require('jsonwebtoken');
const path = require('path');
const fs = require('fs');
const createError = require('http-errors');
const redisClient = require("./redisInit");

function randomNumberGenerator(){
    return (Math.floor(Math.random()*90000)+10000)
}

function SignAccessToken(userId){
    return new Promise(async(resolve , reject)=>{
        const user =await UserMoldle.findById(userId);
        const payload = {phone:user.phone};
        const secretKey  = ACCESS_SECRET_KEY;
        const options = {
            expiresIn: "365d"
        }
        JWT.sign(payload , secretKey , options , (err , token)=>{
            if(err) reject(createError.InternalServerError("internal server error"));
            resolve(token)
        })

    })
}

function SignRefreshToken(userId){
    return new Promise(async (resolve , reject)=>{
        const user =await UserMoldle.findById(userId);
        const payload = {phone:user.phone};
        const secretKey  = REFRESH_SECRET_KEY;
        const options = {
            expiresIn: "365d"
        }
        JWT.sign(payload , secretKey , options , async(err , token)=>{
            if(err) reject(createError.InternalServerError("internal server error"));
            const date = (365*24*60*60);
            await redisClient.SETEX(userId ,date ,token);
            resolve(token);
        })

    })
}

function verifyRefreshToken(token){

        return new Promise(async(resolve , reject)=>{
            JWT.verify(token ,REFRESH_SECRET_KEY ,async (err , payload)=>{
              if(err) reject(createError.Unauthorized("please login to your account"));
              const {phone} = payload || {};
              const user = await UserMoldle.findOne({phone} , {password: 0 , otp:0 , bills: 0});
              if(!user) reject(createError.NotFound("user not founded"));
              const refreshToken = await redisClient.get(user._id);
              if(token === refreshToken) return resolve(phone)
              reject(createError.Unauthorized("you cant login please login to your account again"));
            })    

        })
}

function deleteFileInPublic(fileAdress){
    if(fileAdress){
        const filePath = path.join(__dirname , "..",".." ,"public" ,fileAdress);
        console.log(filePath);
        fs.unlinkSync(filePath);
    }
}
function returnListOfImagesFromRequest(files , fileUploadPath){
    if(files?.length > 0){
        return (files.map(file => path.join(fileUploadPath , file.filename)));
    }else{
        return []
    }
}

function setFeatures(body){
    const { colors , weight , height , length , width } = body;
    let feature = {};
    feature.colors = colors;
            if(!isNaN(+weight) || !isNaN(+height) || !isNaN(+length) || !isNaN(+width)){
                if(!weight) feature.weight = 0;
                else feature.weight = +weight
                if(!height) feature.height = 0;
                else feature.height = +height
                if(!length) feature.length = 0;
                else feature.length = +length
                if(!width) feature.width = 0;
                else feature.width = +width
            }
            return feature;
}

function copyObject(object){
    return JSON.parse(JSON.stringify(object));
}

function deleteInvalidData(data = {} , blackList = []){
    let nullishData = ["" , " " , "0" , 0 , undefined , null];
    Object.keys(data).forEach(key => {
        if(blackList.includes(data[key])) delete data[key];
        if(typeof data[key] == "string") data[key] = data[key].trim();
        if(Array.isArray(data[key]) && data[key].length > 0) data[key] = data[key].map(item => item.trim());
        if(Array.isArray(data[key]) && data[key].length == 0) delete data[key]
        if(Array.isArray(data[key]) && data[key].length < 1) delete data[key]
        if(nullishData.includes(data[key])) delete data[key];
    });
}

module.exports ={
    randomNumberGenerator,
    SignAccessToken,
    SignRefreshToken,
    verifyRefreshToken,
    deleteFileInPublic,
    returnListOfImagesFromRequest,
    copyObject,
    setFeatures,
    deleteInvalidData
}