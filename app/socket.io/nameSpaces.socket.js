const { ConversationModel } = require("../models/conversations");
const path = require('path');
const fs = require('fs');
class NameSpaceHandler{
    #io;
    constructor(io){
        this.#io = io
    }

    initConnection(){
        this.#io.on("connection" ,async socket=>{
            const nameSpaces = await ConversationModel.find({} , {title: 1 , endpoint: 1, rooms: 1});
            socket.emit("nameSpacesList" , nameSpaces);
        })
    }
    async createNameSpaceConnection(){
        const nameSpaces = await ConversationModel.find({} , {title: 1 , endpoint: 1, rooms: 1});
        for (const namespace of nameSpaces) {
            this.#io.of(`/${namespace.endpoint}`).on("connection" ,async socket=>{
            const conversation= await ConversationModel.findOne({endpoint: namespace.endpoint} , {endpoint:1 , rooms: 1});
                socket.emit("roomList" , conversation.rooms);
                socket.on("joinRoom" , async roomName =>{
                    const lastRooms = Array.from(socket.rooms)[1];
                    if(lastRooms){
                        socket.leave(lastRooms);
                        await this.getOnlineUser(conversation.endpoint ,roomName);
                    }
                    socket.join(roomName);
                    await this.getOnlineUser(conversation.endpoint ,roomName);
                    const roomInfo = conversation.rooms.find(item => item.name == roomName);
                    socket.emit("roomInfo" , roomInfo);
                    this.getNewMessage(socket)
                    this.getNewLocation(socket);
                    this.uploadFile(socket);
                    socket.on("disconnect" , async ()=>{
                    await this.getOnlineUser(conversation.endpoint ,roomName);
                    })
                })
            })
        }
    }

    async  getOnlineUser(endpoint , roomName){
        const onlineUser = await  this.#io.of(`/${endpoint}`).in(roomName).allSockets();
        this.#io.of(`/${endpoint}`).in(roomName).emit("CountOfOnlineUser" , Array.from(onlineUser).length);
    }

    async getNewMessage(socket){
        socket.on("newMessage" ,async data=>{
            const {message , endpoint , roomName , sender} = data;
            await ConversationModel.updateOne({endpoint , "rooms.name": roomName} , {
                $push:{
                    "rooms.$.messages": {
                        sender,
                        message,
                        dateTime: Date.now()
                    }
                }
            })
            this.#io.of(`/${endpoint}`).in(roomName).emit("confirmMessage" , data);
        })
    }
    async getNewLocation(socket){
        socket.on("newLocation" ,async data=>{
            const {location , endpoint , roomName , sender} = data;
            await ConversationModel.updateOne({endpoint , "rooms.name": roomName} , {
                $push:{
                    "rooms.$.location": {
                        sender,
                        location,
                        dateTime: Date.now()
                    }
                }
            })
            this.#io.of(`/${endpoint}`).in(roomName).emit("confirmLocation" , data);
        })
    }

    uploadFile(socket){
        socket.on("upload", ({file , filename} , callback)=>{
            const ext = path.extname(filename);
            fs.writeFile("public/uploads/sockets/" + String(Date.now() + ext) , file , (err)=>{
                callback({message: err? "failur" : "success"})
            })
        })
    }
}

module.exports ={
     NameSpaceHandler
}