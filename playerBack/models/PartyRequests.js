const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const partyRequestsSchema = new Schema({
    date:{
        type: Date,
        default: Date.now
    },
    message: {
        type:String,
        default:"Unete a mi party!",
        max:50
    },
    status:{
        type:String,
        enum:["accepted","declined","pending"],
        default:"pending"
    },
    _from: {
        type:Schema.Types.ObjectId,
        ref:"Party",
        require:[true,"Debes agregar el id de la party, la cual pertenece la invitacion"]
    },
    _owner: {
        type:Schema.Types.ObjectId,
        ref:"User",
        require:[true,"Debes agregar el id del dueño de la party"]
    },
    _to:{
        type:Schema.Types.ObjectId,
        ref:"User",
        require:[true,"Debes agregar el usuario destinatario de la invitacion"]
    }
},{timestapms:true})

module.exports = model("PartyRequest",partyRequestsSchema);