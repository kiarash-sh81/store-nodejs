const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const morgan = require('morgan');
const cors = require('cors');
const createError = require('http-errors');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
require('dotenv').config();
const expressEjsLayout = require('express-ejs-layouts');
const { AllRoutes } = require('./router/router');
module.exports = class Application{
    #port;
    #DB_URI;
    #app = express();
    constructor(port , DB_URI){
        this.#port = port;
        this.#DB_URI = DB_URI;
        this.configApplication();
        this.intTemplateEngin();
        this.connectToDatabase();
        this.redisInit();
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
                openapi: "3.0.0",
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
                ],
                components:{
                    securitySchemes:{
                        BearerAuth : {
                            type: "http",
                            scheme: "bearer",
                            bearerFormat: "JWT"
                        }
                    }
                },
                security:[{BearerAuth : []}]
            },
            apis :["./app/router/**/*.js"]
        }),
            {explorer: true}       
        )
    )
}
    connectToDatabase(){
        mongoose.set("strictQuery" , false);
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
    redisInit(){
        require('./utils/redisInit');
    }
    intTemplateEngin(){
        this.#app.use(expressEjsLayout);
        this.#app.set("view engine" , "ejs");
        this.#app.set("views" , "resource/views");
        this.#app.set("layout extractStyles" , true);
        this.#app.set("layout extractScripts" , true);
        this.#app.set("layout" , "./layouts/master")
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