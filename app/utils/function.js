const { UserMoldle } = require("../models/users");
const { SECRET_KEY, ACCESS_SECRET_KEY } = require("./constans");
const JWT = require('jsonwebtoken');
const createError = require('http-errors');

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


module.exports ={
    randomNumberGenerator,
    SignAccessToken
}