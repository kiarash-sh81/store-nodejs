const { permissionControoler } = require('../../http/controller/admin/RBAC/permission.controller');

const router = require('express').Router();

router.get("/list" , permissionControoler.getAllPermissions);
router.post("/add" , permissionControoler.creatNewPermission);

module.exports = {
    permissionRoutes : router
}