const express = require("express");
const app = express();
require('dotenv').config()
const port=process.env.PORT
const db = require('./config/db');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(require("cors")());
require('./models/User')
require('./models/Chatroom')
require('./models/Message')
const userRouter=require('./routes/user')
const chatRoom=require('./routes/chatroom')
app.use("/user", userRouter); 
app.use("/chat", chatRoom); 

app.listen(port,()=>{
    console.log(`Server  listening on ${port} port`)
})