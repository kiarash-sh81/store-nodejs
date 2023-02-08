const { permissionControoler } = require('../../http/controller/admin/RBAC/permission.controller');

const router = require('express').Router();

router.get("/list" , permissionControoler.getAllPermissions);
router.post("/add" , permissionControoler.creatNewPermission);
router.delete("/remove/:id" , permissionControoler.removePermission);
router.patch("/update/:id" , permissionControoler.updatePermission);

module.exports = {
    permissionRoutes : router
}