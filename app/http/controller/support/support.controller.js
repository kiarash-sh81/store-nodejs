const controller = require("../controller");

class SupportController extends controller{
    renderChat(req , res, next){
        try {
            return res.render("chat.ejs");
        } catch (error) {
            next(error)
        }
    }
}

module.exports ={
    supportController : new SupportController()
}