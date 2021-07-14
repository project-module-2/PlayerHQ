const mongoose = require("mongoose");
const {Schema, model} = mongoose;

const partySchema = new Schema({
    title:{
        type:String,
        required:[true,"Debes agregar un tipo de request"]
    },
    date:{
        type:String,
        required:[true,"Debes agregar una fecha"]
    },
    expireDate:{
        type:String,
        required:[true,"Debes agregar una fecha"]
    },
    description: {
        type:String,
        required:[true,"Debes agregar una descripcion"],
        max:200
    },
    game: {
        type:String,
        required:[true,"Debes agregar un juego"],
        max:50
    },
    type: {
        type:String,
        required:[true,"Debes indicar el tipo de party"],
        enum:["casual","competitivo","esport"],
        max:50
    },
    _owner:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    _members:[{
        type:Schema.Types.ObjectId,
        ref:"User"
    }]
},{timestapms:true})

module.exports = model("Party",partySchema);