const createHttpError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const { PermissionModel } = require('../../../../models/permmision');
const { copyObject, deleteInvalidData } = require('../../../../utils/function');
const { addPermissionValidation } = require('../../../validator/admin/role');
const controller = require('../../controller');
class permissionControoler extends controller{
    async getAllPermissions(req, res, next){
        try {
            console.log(1);
            const permissions = await PermissionModel.find({});
            if(!permissions) throw createHttpError.InternalServerError("cant find the permissions");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    permissions
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async removePermission(req, res, next){
        try {
            const {id} = req.params;
            await this.findPermissionById(id);
            const removePermissions = await PermissionModel.deleteOne({_id: id});
            if(!removePermissions.deletedCount) throw createHttpError.InternalServerError("cant delete the permissions");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    message: "permission deleted successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async updatePermission(req, res, next){
        try {
            const {id} = req.params;
            await this.findPermissionById(id);
            const data = copyObject(req.body);
            await deleteInvalidData(data , []);
            const updatePermissionResualt = await PermissionModel.updateOne({_id: id} , {$set:data});
            if(!updatePermissionResualt.modifiedCount) throw createHttpError.InternalServerError("cant update perm");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    message: "permission updated successfully"
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async creatNewPermission(req, res, next){
        try {
            const {title , description} = await addPermissionValidation.validateAsync(req.body);
            await this.findPermission(title);
            const permission = await PermissionModel.create({title , description});
            if(!permission) throw createHttpError.InternalServerError("cant creat permission");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data:{
                    message: "permission created successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }
    async findPermission(title){
        const permission = await PermissionModel.findOne({title});
        if(permission) throw createHttpError.BadRequest("the permission has been already exist")
    } 
    async findPermissionById(id){
        const permission = await PermissionModel.findOne({_id: id});
        if(!permission) throw createHttpError.NotFound("the permission not founded")
    } 
}

module.exports={
    permissionControoler : new permissionControoler()
}