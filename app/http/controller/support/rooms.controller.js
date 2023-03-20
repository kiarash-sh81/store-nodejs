const createHttpError = require("http-errors");
const { StatusCodes } = require("http-status-codes");
const { ConversationModel } = require("../../../models/conversations");
const path = require('path');
const controller = require("../controller");

class RoomsController extends controller{
    async addRooms(req, res, next){
        try {
            const {name , description , namespace,fileUploadPath , fileName} = req.body;
            console.log(name);
            await findNameSpaceWithname(name);
            await findNameSpaceWithEndpoint(namespace);
            const image = path.join(fileUploadPath , fileName);
            const room ={
                name,
                description,
                image
            }
            const createRoom = await ConversationModel.updateOne({endpoint: namespace} , {
                $push:{
                    rooms: room 
                }
            });
            if(!createRoom) throw createHttpError.InternalServerError("cant create room");
            return res.status(StatusCodes.CREATED).json({
                statusCode: StatusCodes.CREATED,
                data:{
                    message: "room create successfully"
                }
            });
        } catch (error) {
            next(error)
        }
    }
    async getListOfRooms(req, res, next){
        try {
            const List = await ConversationModel.find({} , {rooms: 1});
            if(!List) throw createHttpError.InternalServerError("cant get name space");
            return res.status(StatusCodes.OK).json({
                statusCode: StatusCodes.OK,
                data:{
                    rooms: List.rooms
                }
            });
        } catch (error) {
            next(error)
        }
    }    
}

async function findNameSpaceWithname(name){
    const conversations = await ConversationModel.findOne({"rooms.name" : name});
    if(conversations) throw  createHttpError.BadRequest("this room name has been already used");
}
async function findNameSpaceWithEndpoint(endpoint){
    const conversations = await ConversationModel.findOne({endpoint});
    if(!conversations) throw  createHttpError.NotFound("this endpoint not founded");
}

module.exports ={
    roomsController : new RoomsController()
}