const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const userSchema = new Schema({
    username:{
        type:String,
        unique:[true,"el nombre de usuario ya existe"],
        required:[true,"Debes agregar un nombre de usuario"]
    },
    email:{
        type:String,
        unique:[true,"el email ya existe"],
        required:[true,"Debes agregar un correo"]
    },
    password:{
        type:String,
        required:[true,"Debes agregar una contraseña"]
    },
    platforms:[{
        type:String,
        enum:["Xbox","Playstation","Nintendo","PC","Mobile"]
    }],
    intereses:[{
        type:String,
        required:[true,"Debes indicar por lo menos un interes"],
        enum:["Casual","Competitivo","eSport"]
    }],
    country:{
        type:String,
        enum:["Mexico","Estados Unidos","Canada"]
    },
    language:[{
        type:String,
        enum:["Español","Ingles","Frances","Otro"]
    }],
    mainLanguage: {
        type:String
    },
    discord: {
        type:String
    },
    twitch: {
        type:String
    },
    skype: {
        type:String
    },
    xboxGamertag: {
        type:String
    },
    steamUsername: {
        type:String
    },
    playstationUsername: {
        type:String
    },
    nintendoUsername: {
        type:String
    },
    _friends:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    _blocked:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }],
    role:{
        type:String,
        default:'USER',
        enum:['ADMIN','USER']
    }
},{timestapms:true})

module.exports = model("User",userSchema);