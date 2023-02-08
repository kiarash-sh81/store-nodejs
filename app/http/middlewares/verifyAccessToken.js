const JWT = require('jsonwebtoken');
const { ACCESS_SECRET_KEY } = require('../../utils/constans');
const createError = require('http-errors');
const { UserMoldle } = require('../../models/users');

function getToken(headers){
    const [bearer , token] = headers?.authorization?.split(" ") || [];
    if(token && ["bearer", "Bearer"].includes(bearer))  return token;
    throw createError.Unauthorized("pleadse log in to you account");
}

function verifyAccessToken(req, res, next){
    try {
        const headers = req.headers;
        const token = getToken(headers);
        JWT.verify(token ,ACCESS_SECRET_KEY ,async (err , payload)=>{
          try {
                if(err)  throw createError.Unauthorized("please login to your account");
                const {phone} = payload || {};
                const user = await UserMoldle.findOne({phone} , {password: 0 , otp:0 , bills: 0});
                if(!user) throw createError.NotFound("user not founded");
                req.user = user;
                return next();
          } catch (error) {
            next(error)
          }
        });

    } catch (error) {
        next(error)
    }
}



module.exports ={
    verifyAccessToken,
}