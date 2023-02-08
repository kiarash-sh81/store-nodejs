const stringToArray = function(filed){
    return function(req, res, next){
        if(req.body[filed]){
            if(typeof req.body[filed] == "string"){
                if(req.body[filed].indexOf("#") >= 0){
                    req.body[filed] = (req.body[filed].split("#")).map(item => item.trim())
                }
                else if(req.body[filed].indexOf(",") >= 0){
                    req.body[filed] = (req.body[filed].split(",")).map(item => item.trim())
                }else{
                    req.body[filed] = [req.body[filed]]
                }
            }else if((req.body[filed].constructor).toString().toLowerCase().indexOf("array") >= 0){
                req.body[filed] = req.body[filed].map(item => item.trim());
            }
            if(Array.isArray(req.body[filed])){
                req.body[filed] = req.body[filed].map(item => item.trim());
                console.log(req.body[filed]);
                // req.body[filed] = {...new Set(req.body[filed])}
            }
        }else{
            req.body[filed] = [];
        }
        next()
    }
}
module.exports ={
    stringToArray
}