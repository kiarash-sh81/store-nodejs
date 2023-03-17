const controller = require("../controller");

class RoomsController extends controller{
    async addRooms(req, res, next){
        try {
            const {title , endpoint} = req.body;
            const createNameSpace = await ConversationModel.create({title , endpoint});
            if(!createNameSpace) throw createHttpError.InternalServerError("cant create name space");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data:{
                    message: "name space create successfully"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getListOfRooms(req, res, next){
        try {
            const List = await ConversationModel.find({} , {rooms: 0});
            if(!List) throw createHttpError.InternalServerError("cant get name space");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    List
                }
            });
        } catch (error) {
            next(error)
        }
    }    
}

module.exports ={
    roomsController : new RoomsController()
}