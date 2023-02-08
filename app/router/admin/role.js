const { roleControoler } = require('../../http/controller/admin/RBAC/role.controller');
const { stringToArray } = require('../../http/middlewares/stringToArray');

const router = require('express').Router();

router.get("/list" , roleControoler.getAllRoles);
router.post("/add" ,stringToArray("permission"), roleControoler.addRole);
router.delete("/remove/:field" , roleControoler.removeRole);
router.patch("/update/:id" ,stringToArray("permission"), roleControoler.updateRole);

module.exports = {
    roleRoutes : router
}