const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const requestSchema = new Schema({
    type:{
        type:String,
        required:[true,"Debes agregar un tipo de request"],
        enum:["friend","party"]
    },
    date:{
        type:String,
        required:[true,"Debes agregar una fecha"]
    },
    message: {
        type:String,
        required:[true,"Debes agregar un mensaje"],
        max:50
    },
    status:{
        type:String,
        enum:["accepted","declined","pending"],
        default:"pending"
    },
    _from: {
        type:Schema.Types.ObjectId,
        ref:"User",
        require:[true,"Debes agregar el usuario que solicita la invitacion"]
    },
    _to:{
        type:Schema.Types.ObjectId,
        ref:"User",
        require:[true,"Debes agregar el usuario destinatario de la invitacion"]
    }
},{timestapms:true})

module.exports = model("Request",requestSchema);