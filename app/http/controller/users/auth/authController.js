const { authSchema } = require("../../../validator/user/auth.schema")
const createError = require('http-errors');
const controller = require("../../controller");
const { randomNumberGenerator } = require("../../../../utils/function");
const  {UserMoldle}   = require("../../../../models/users");
const { USER_ROLE, EXPIRES_IN } = require("../../../../utils/constans");

class Authentication extends controller{
    async login(req , res , next){
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
    async saveUser(phone , code){
        let otp = {
            code,
            expiresIn: EXPIRES_IN
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
        console.log(objectData);
        const updateResualt = await UserMoldle.updateOne({phone},{$set:objectData});
        console.log(updateResualt.modifiedCount);
        return !!updateResualt.modifiedCount
    }
}

module.exports ={
    Authentication : new Authentication()
}