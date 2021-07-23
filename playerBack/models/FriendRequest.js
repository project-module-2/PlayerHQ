const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const friendRequestSchema = new Schema({
    date:{
        type: Date,
        default: Date.now
    },
    message: {
        type:String,
        default:"Agregame como amigo!",
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

module.exports = model("FriendRequest",friendRequestSchema);