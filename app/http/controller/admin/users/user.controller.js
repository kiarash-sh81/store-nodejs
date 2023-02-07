const createHttpError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const { UserMoldle } = require('../../../../models/users');
const { copyObject, deleteInvalidData } = require('../../../../utils/function');
const controler = require('../../controller');
class userController extends controler{
    async getAllUser(req, res, next){
        try {
            let users;
            const {search} = req.query;
            const dataBaseQuery = {}
            if(search) {
                users =await  UserMoldle.find({$text: {$search: search}}) 
            }else{
                users = await UserMoldle.find({});
            }
            return res.status(StatusCodes.OK).json({
                statusCode : StatusCodes.OK,
                data:{
                    users
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async updateUserProfile(req, res, next){
        try {
            const id = req.user._id;
            const data = copyObject(req.body);
            let blackList = ["otp","bills","discount","Roles","courses"];
            deleteInvalidData(data , blackList);
            const updateResualt = await UserMoldle.updateOne({_id : id} , {$set: data});
            if(!updateResualt.modifiedCount) throw createHttpError.InternalServerError("cant update user profile");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    message: "updating profile successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }
}

module.exports = {
    userController : new userController()
}