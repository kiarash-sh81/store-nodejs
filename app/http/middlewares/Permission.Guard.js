const createHttpError = require("http-errors");
const { PermissionModel } = require("../../models/permmision");
const { RoleModel } = require("../../models/role");

function checkPermission(requiredPermission = []){
    return async function(req, res, next){
        try {
            const user = req.user;
            const role = await RoleModel.findOne({title : user.Role});
            const permission = await PermissionModel.find({_id : {$in : role.permission}});
            const userPermission = permission.map(item => item.title);
            const hasPermission = requiredPermission.every(permission =>{
                return userPermission.includes(permission)
            });
            if(userPermission.includes("all")) return next();
            if(requiredPermission.length == 0 || hasPermission) return next();
            throw createHttpError.Forbidden("your access denied");  
        } catch (error) {
            next(error)
        }
    }
}

module.exports ={
    checkPermission
}