const express = require('express');
const router = express.Router();
//Importar los modelos necesarios
const Party = require('../models/Party');
const Request = require('../models/Party');

//Importamos los utils
const {checkRole, veryToken, checkParty} = require('../utils/auth-mid');

//Tengo que crear un crud completo si es necesario

//Encontrar todos los requests creados por el usuario, tiene que estar logueado
router.get('/requestsFrom', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
  Request.find({_from: req.user._id})
  .then(parties => {
    res.status(200).json({result:parties})
  })
  .catch( error => res.status(400).json({error}))
});

//Encontrar todos los requests realizados hacia el usuario, tiene que estar logueado
router.get('/requestsTo', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
  Request.find({_to: req.user._id})
  .then(parties => {
    res.status(200).json({result:parties})
  })
  .catch( error => res.status(400).json({error}))
});

//Crear request
router.post('/createRequest', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
  Request.create({_from:req.user._id})
  .then(request => {
    res.status(200).json({result:request})
  })
  .catch( error => res.status(400).json({error}))
});

//Eliminar request
router.delete('/deleteRequest/:id', veryToken, checkRole(['Admin','USER']), (req, res, next)=> {
  //Sacamos el parametro id del req.params
  const{id} = req.params;

  Request.findByIdAndDelete(id)
  .then(()=>{
    res.status(200).json({msg:'Request borrado'})
  })
  .catch( error => res.status(400).json({error}))
});

module.exports = router;