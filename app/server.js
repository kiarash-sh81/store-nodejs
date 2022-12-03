const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const { AllRoutes } = require('./router/router');
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
        this.#app.use(cors())
        this.#app.use(morgan("dev"));
        this.#app.use(express.json());
        this.#app.use(express.urlencoded({extended:true}));
        this.#app.use(express.static(path.join(__dirname,".." , "public")));
        this.#app.use("/api-doc" , swaggerUI.serve , swaggerUI.setup(swaggerJsDoc({
            swaggerDefinition:{
                info:{
                    title: "Store",
                    version: "1.0.0",
                    description: "best Store for developers",
                    contact:{
                        name: "kiarash shahroudi",
                        email:"kiarashshahroudi@gmail.com"
                    },
                },
                servers:[
                    {
                        url: "http://localhost:3000"
                    }
                ]
            },
            apis :["./app/router/**/*.js"]
        })))
    }
    connectToDatabase(){
        mongoose.connect(this.#DB_URI , (error)=>{
            if(!error) return console.log("connecting to DB Successfully...");
            return console.log("there is an error in connecting to DB please check that!");
        });  
        mongoose.connection.on("connected" , ()=> {
            console.log("mongoose connected to database");
        });
        mongoose.connection.on("disconnected" , ()=>{
            console.log("mongoose connection is disconnected");
        });
        process.on("SIGINT" , async()=>{
            await mongoose.connection.close();
            process.exit(0);
        })
    }
    createServer(){
        const http = require('http');
        http.createServer(this.#app).listen(this.#port , ()=>{
            console.log(`run > http://localhost:`+ this.#port);
        });
    }
    createRoutes(){
        this.#app.use(AllRoutes);
    }
    errorHanddler(){
        this.#app.use((req , res , next)=>{
            next(createError.NotFound("page not founded!"))
        });
        this.#app.use((error , req , res , next)=>{
            const  serverError = createError.InternalServerError("Internal Server Error");
            const status = error.status || serverError.status;
            const message = error.message || serverError.message;
            return res.status(status).json({
                errors:{
                    statusCode:status,
                    message
                }
            });
        });
    }
}