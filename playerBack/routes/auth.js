//Rutas para logeo registro logout
const express = require('express');
const router = express.Router();
//import el modelo que utilizare
const User = require('../models/User')
//Importar las herramientas a utilzar
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const {clearRes, createJWT} = require('../utils/auth-mid');

//en este archivo se tendran 3 rutas, LOGIN, SIGNUP, LOGOUT

router.post('/signup', function(req, res, next) {
    const {email, username, password, confirmPassword, role} = req.body;

    if(password != confirmPassword) {
        return res.status(400).json({msg:"Las contraseñas no coinciden"});
    }

    //ahora encriptamos el password
    bcrypt.hash(password,10)
    .then(hashedPass =>{
        const user = {
            email,
            password:hashedPass,
            username,
            role
        }
        User.create(user)
        .then(userCreated=>{
            //Esto se va a pasar a utils por que se utilizara varias veces
            const newUser = clearRes(userCreated.toObject());
            const token = createJWT(user);
            res.cookie('token', token,{
                expires: new Date(Date.now+86400000),
                secure:false, //Si lo ponemos en true, esta cookie unicamente funciona con https
                httpOnly:true //las cookies solo son accesibles por webserver
            }).status(200).json({result:newUser});
        })
        .catch(error=>res.status(400).json({error}));
    })
    .catch(error=>res.status(400).json({error}));
});

//ruta para el login
router.post('/login',(req,res)=>{
    const {email, password} = req.body;

    User.findOne({email})
    .then(user =>{
        if(user===null) {
            return res.status(404).json({msg:'El correo o contraseña son erroneos'});
        }

        bcrypt.compare(password,user.password)
        .then(match=>{
            //Si match es verdadero, nos logeamos
            if(match) {
                const newUser = clearRes(user.toObject());
                const token = createJWT(user);
                res.cookie('token', token,{
                    expires: new Date(Date.now+86400000),
                    secure:false, //Si lo ponemos en true, esta cookie unicamente funciona con https
                    httpOnly:true //las cookies solo son accesibles por webserver
                }).status(200).json({result:newUser});
            }
            else {
                return res.status(403).json({msg:'El correo o contraseña son erroneos'});
            }
        })
    })
    .catch(error=>res.status(400).json({error}));
})

router.post('/logout',(req,res)=>{
    res.clearCookie('token').json({msg:'vuelve pronto'});
})

module.exports = router;