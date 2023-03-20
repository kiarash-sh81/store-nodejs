const { NameSpaceHandler } = require("./nameSpaces.socket")

module.exports={
    socketHandler : (io)=>{
        new NameSpaceHandler(io).initConnection();
        new NameSpaceHandler(io).createNameSpaceConnection()
    }
}