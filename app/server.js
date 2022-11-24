const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
module.exports = class Application{
    #port;
    #DB_URI;
    #app = express();
    constructor(port , DB_URI){
        this.#port = port;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.connectToDatabase();
        this.createServer();
        this.createRoutes();
        this.errorHanddler();
    }
    configApplication(){
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended:true}));
        this.#app.use(express.static(path.join(__dirname,".." , "public")));
    }
    connectToDatabase(){
        mongoose.connect(this.#DB_URI , (error)=>{
            if(!error) return console.log("connecting to DB Successfully...");
            return console.log("there is an error in connecting to DB please check that!");
        });  
    }
    createServer(){
        const http = require('http');
        http.createServer(this.#app).listen(this.#port , ()=>{
            console.log(`run > http://localhost:`+ this.#port);
        });
    }
    createRoutes(){
        this.#app.get("/" , (req , res , next)=>{
            return res.status(200).json({
                statusCode:200,
                success:true,
                message:"this is the store application"
            });
        })
    }
    errorHanddler(){
        this.#app.use((req , res , next)=>{
            return res.status(404).json({
                statusCode: 404,
                success:false,
                message:"page not founded"
            });
        });
        this.#app.use((error , req , res , next)=>{
            const status = error.status || 500;
            const message = error.message || "Internal Server Error";
            return res.status(status).json({
                statusCode:status,
                success:false,
                message
            });
        });
    }
}