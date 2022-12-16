const redis = require('redis');
const redisClient = redis.createClient();
redisClient.connect();
redisClient.on("connect" , ()=>console.log("connect to redis"));
redisClient.on("error" , (err)=> console.log("redisError: " , err.message));
redisClient.on("connected" , ()=>console.log("connected to redis and ready to use..."))
redisClient.on("end" , ()=>console.log("disconnected from redis..."));

module.exports = redisClient;
