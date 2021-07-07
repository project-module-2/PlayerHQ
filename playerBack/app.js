//Importamos dotenv
require('dotenv').config();

const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//Importamos mongoose
const mongoose = require('mongoose');
const cors = require('cors');

//Conexion a mongoose
mongoose.connect(process.env.DB,{
    useCreateIndex:true,
    useNewUrlParser:true,
    useUnifiedTopology:true
    })
    .then( x => console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`))
    .catch(error => console.log("Error connecting to mongo",error))

const app = express();

//Usar CORS
app.use(cors({
    origin:["http:localhost:3007","https://www.paginaDeploy.com"],
    credentials:true
}));

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//Estas son las rutas:
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');

app.use('/api', indexRouter);
app.use('/api/users', usersRouter);

module.exports = app;