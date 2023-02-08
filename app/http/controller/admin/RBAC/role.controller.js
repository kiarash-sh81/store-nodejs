const createHttpError = require('http-errors');
const { StatusCodes } = require('http-status-codes');
const { default: mongoose } = require('mongoose');
const { RoleModel } = require('../../../../models/role');
const { copyObject, deleteInvalidData } = require('../../../../utils/function');
const { addRoleValidation } = require('../../../validator/admin/role');
const controller = require('../../controller');
class roleControoler extends controller{
    async getAllRoles(req, res, next){
        try {
            const roles = await RoleModel.find({}).populate([{path: "permission" , select:{title: 1}}]);
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data: {
                    roles
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async addRole(req, res, next){
        try {
            console.log(req.body);
            const {title , permission} = await addRoleValidation.validateAsync(req.body);
            await this.findRole(title);
            const role = await RoleModel.create({title , permission});
            if(!role) throw createHttpError.InternalServerError("cant creat the role");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data:{
                    message: "the role created successfully"
                }
            })
        } catch (error) {
            next(error)
        }
    }

    async removeRole(req, res, next){
        try {
            const {field} = req.params;
            const role = await this.findRoleByIdOrTitle(field);
            const removeResualt = await RoleModel.deleteOne({_id: role._id});
            if(!removeResualt.deletedCount) throw createHttpError.InternalServerError("cant deleted role");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    message: "role deleted successfully"
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async updateRole(req, res, next){
        try {
            const {id} = req.params;
            const role = await this.findRoleByIdOrTitle(id);
            const data = copyObject(req.body);
            await deleteInvalidData(data , []);
            console.log(data);
            const updateRoleResualt = await RoleModel.updateOne({_id: role._id} , {$set:data});
            if(!updateRoleResualt.modifiedCount) throw createHttpError.InternalServerError("cant update role");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    message: "role updated successfully"
                }
            })

        } catch (error) {
            next(error)
        }
    }
    async findRoleByIdOrTitle(field){
        let Query = mongoose.isValidObjectId(field) ? {_id : field} : {title: field};
        const role = await RoleModel.findOne(Query);
        if(!role) throw createHttpError.NotFound('role not founded');
        return role;
    }
    async findRole(title){
        const role = await RoleModel.findOne({title});
        if(role) throw createHttpError.BadRequest("the role has been already exist");
    }
}

module.exports={
    roleControoler : new roleControoler()
}