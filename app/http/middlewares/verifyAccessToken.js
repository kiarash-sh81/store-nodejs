const JWT = require('jsonwebtoken');
const { ACCESS_SECRET_KEY } = require('../../utils/constans');
const createError = require('http-errors');
const { UserMoldle } = require('../../models/users');

function verifyAccessToken(req, res, next){
    const headers = req.headers;
    const [bearer , token] = headers?.["accesstoken"]?.split(" ") || [];
    if(token && ["bearer", "Bearer"].includes(bearer)){
        JWT.verify(token ,ACCESS_SECRET_KEY ,async (err , payload)=>{
          if(err) return next(createError.Unauthorized("please login to your account"));
          const {phone} = payload || {};
          const user = await UserMoldle.findOne({phone} , {password: 0 , otp:0 , bills: 0});
          if(!user) return next(createError.NotFound("user not founded"));
          req.user = user;
          return next();
        })

    }
    else return next(createError.Unauthorized("please login to your account"));
}

module.exports ={
    verifyAccessToken
}