const express = require('express');
const router = express.Router();
//Importar los modelos necesarios
const Party = require('../models/Party');

//Importamos los utils
const {checkRole, veryToken, checkParty} = require('../utils/auth-mid');

//Tengo que crear un crud completo si es necesario

//Encontrar todas las parties, tiene que estar logueado
router.get('/parties', veryToken, (req, res, next) => {
  Party.find()
  .then(parties => {
    res.status(200).json({result:parties})
  })
  .catch( error => res.status(400).json({error}))
});

//Crear party
router.post('/createParty', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
  Party.create()
  .then(party => {
    req.user._partiesOwned.push(party._id);
    res.status(200).json({result:party})
  })
  .catch( error => res.status(400).json({error}))
});

//Actualizar party
router.patch('/editMyParty/:id', veryToken, checkRole(['Admin','USER']), (req, res, next)=> {
  const {role} = req.user
  const{id} = req.params;

  if(role.includes('Admin')){
    //Si el usuario es admin, puede eliminar la party
    Party.findByIdAndUpdate(id,{new:true})
    .then(party => {
      res.status(200).json({result:party})
    })
    .catch( error => res.status(400).json({error}))
  }
  else {
    //Si el usuario es dueño de la party, tambien puede eliminar la party
    checkParty(id);

    Party.findByIdAndUpdate(id,{new:true})
    .then(party => {
      res.status(200).json({result:party})
    })
    .catch( error => res.status(400).json({error}))
  }
});

//Eliminar parties
router.delete('/deleteParty/:id', veryToken, checkRole(['Admin','USER']), (req, res, next)=> {
  const {role} = req.user
  const{id} = req.params;

    if(role.includes('Admin')){
      //Si el usuario es admin, puede eliminar la party
      Party.findByIdAndDelete(id)
      .then(()=>{
        res.status(200).json({msg:'Usuario borrado'})
      })
      .catch( error => res.status(400).json({error}))
    }
    else {
      //Si el usuario es dueño de la party, tambien puede eliminar la party
      checkParty(id);

      Party.findByIdAndDelete(id)
      .then(()=>{
        res.status(200).json({msg:'Usuario borrado'})
      })
      .catch( error => res.status(400).json({error}))
        return res.status(403),json({msg:'No tienes permiso para realizar esta accion',error})
    }
});

module.exports = router;
