require("dotenv").config()//<=== importmos el dot env
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
//importamos mongoose y el dotenv
const mongoose = require("mongoose")
const cors = require("cors")

//Agregamos la conexion  de mongoose
mongoose.connect(process.env.DB,{
    useUnifiedTopology:true
})
.then((x)=>{
    console.log(`Connect to Mongo! Database name: "${x.connections[0].name}"`)
}).catch((err)=>{
    console.log("Error connecting to mongo", err)
})

const app = express();
//utilizamos cors para darle permisos a otras apps

app.use(
        cors({
            origin:["http://localhost:3000","https://www.paginaDeploy.com"],
            credentials:true
        })
    );

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//rutas
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const partyRouter = require('./routes/party');
const authRouter = require('./routes/auth');
const friendRequestRouter = require('./routes/friendRequests');
const partyRequestRouter = require('./routes/partyRequests');

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/party', partyRouter);
app.use('/api/auth',authRouter);
app.use('/api/friendRequests',friendRequestRouter);
app.use('/api/partyRequests',partyRequestRouter);

module.exports = app;