//Esto nos va a servir para verificar y crear el json web token, tambien para limpiar al usuario

const jwt = require('jsonwebtoken');
const User = require('../models/User');

//Creamos nuestro util
exports.createJWT = (user) => {
    //Vamos a crear el token
    const token = jwt.sign({id:user._id},process.env.SECRET,{
        expiresIn:'1d'
    })

    return token
}

//Este nos va a servir para verificar si tengo un usuario loggeado
exports.veryToken = (req,res,next) => {
    const {token} = req.cookies

    jwt.verify(token, process.env.SECRET, (error, decoded)=>{
        //Va nuestro codigo si falla o esta correcto
        if(error){
            return res.status(401).json({msg:'Tienes que tener una sesion',error})
        }
        User.findById(decoded.id)
            .then(user => {
                req.user = user
                next()
            })
    });
}

//haremos un middleware para checar los roles
exports.checkRole = (roles) => {
    return(req,res,next) => {
        const {role} = req.user
        if(roles.includes(role)){
            return next()
        }
        else {
            return res.status(403).json({msg:'No tienes permiso para realizar esta accion'})
        }
    }
}

//haremos un middleware para verificar que el usuario sea dueño de la party
exports.checkParty = (partyId) => {
    return(req,res,next) => {
        const {_ownedParties} = req.user
        if(_ownedParties.includes(partyId)){
            return next()
        }
        else {
            return res.status(403),json({msg:'No tienes permiso para realizar esta accion',error})
        }
    }
}

//Limpiar el objecto (le quita el password, __v y updateAt, para enviar el resto de los datos)
exports.clearRes = (data) => {
    //Destructuramos el objeto 'data' y retprma,ps im mievp pnketp
    const{password,__v,updateAt,...cleanedData} = data
    return cleanedData;
}