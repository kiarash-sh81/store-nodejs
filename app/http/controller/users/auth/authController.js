const { authSchema, checkOtp } = require("../../../validator/user/auth.schema")
const createError = require('http-errors');
const controller = require("../../controller");
const { randomNumberGenerator, SignAccessToken, verifyRefreshToken, SignRefreshToken } = require("../../../../utils/function");
const  {UserMoldle}   = require("../../../../models/users");
const { USER_ROLE, EXPIRES_IN } = require("../../../../utils/constans");
const {StatusCodes} = require('http-status-codes');

class Authentication extends controller{
    async getOtp(req , res , next){
        try {
            await authSchema.validateAsync(req.body);
            const {phone} = req.body;
            const code = randomNumberGenerator();
            const resualt = await this.saveUser(phone , code);
            if(!resualt) throw createError.Unauthorized("cant loging you"); 
            return res.status(200).send({
                data:{
                    statusCode:200,
                    message: "authentication code send to you successfully",
                    code,
                    phone
                }
            });
        } catch (error) {
            next(createError.BadRequest(error.message));
        }
    }
    async checkingOtp(req ,res, next){
        try {
            await checkOtp.validateAsync(req.body);
            const {phone , code} =req.body;
            const user = await UserMoldle.findOne({phone});
            if(!user) throw createError.NotFound("user not founded");
            if(user.otp.code != code) throw createError.Unauthorized("inccorect code");
            const now = Date.now();
            if(+user.otp.expiresIn < now) throw createError.Unauthorized("code has been expired");
            const AccessToken =await SignAccessToken(user._id);
            const refreshToken = await SignRefreshToken(user._id);
            return res.json({
                data:{
                    AccessToken,
                    refreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async refreshToken(req, res, next){
        try {
            const {refreshToken} = req.body;
            const phone = await verifyRefreshToken(refreshToken);
            const user = await UserMoldle.findOne({phone});
            const accesstoken = await SignAccessToken(user._id);
            const newRefreshToken = await SignRefreshToken(user._id);
            return res.json({
                data:{
                    accesstoken,
                    newRefreshToken
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async saveUser(phone , code){
        let otp = {
            code,
            expiresIn: (new Date().getTime() + 120000)
        }
        const resualt = await this.checkExistUser(phone);
        if(resualt){
            return (await this.updateUser(phone , otp))
        }
        return !!(await UserMoldle.create({phone , otp , Roles: [USER_ROLE]}))
    }
    async checkExistUser(phone){
        const user = await UserMoldle.findOne({phone});
        return !!user;
    }
    async updateUser(phone , objectData = {}){
        Object.keys(objectData).forEach(keys=>{
            if(["" , " " , NaN , undefined , null , 0 , false].includes(objectData[keys])) delete objectData[keys];
        });
        let otp =objectData;
        const updateResualt = await UserMoldle.updateOne({phone},{$set:{otp}});
        return !!updateResualt.modifiedCount
    }

}

module.exports ={
    Authentication : new Authentication()
}