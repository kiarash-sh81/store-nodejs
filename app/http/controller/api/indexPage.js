const controller = require("../controller");

module.exports = new class indexPage extends controller{
    indexPage(req , res , next){
        return res.status(200).send("Index Page");
    }
}