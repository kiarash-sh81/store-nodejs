const { UserMoldle } = require("../../../models/users");
const { SignAccessToken } = require("../../../utils/function");
const controller = require("../controller");

class SupportController extends controller{
    loginForm(req, res, next){
        try {
            return res.render("login.ejs" , {
                error:""
            })
        } catch (error) {
            next(error)
        }
    }

    async login(req, res, next){
        try {
            const {mobile} = req.body;
            const user = await UserMoldle.findOne({phone: mobile});
            if(!user) {
                res.render("login.ejs",{
                    error: "this mobile not exist"
                });
            }
            const token = await SignAccessToken(user._id);
            user.token = token;
            user.save();
            res.cookie("authorization" , token , {signed: true , httpOnly: true , expires: new Date(Date.now() + 1000*60*60*1)});
            return res.redirect("/support");
        } catch (error) {
            next(error)
        }
    }
    
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