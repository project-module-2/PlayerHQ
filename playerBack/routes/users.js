const express = require('express');
const { findByIdAndUpdate } = require('../models/User');
const router = express.Router();
//Importar los modelos necesarios
const User = require('../models/User');

//Importamos los utils
const {checkRole, veryToken} = require('../utils/auth-mid');

//Encontrar todos los usuarios (que no sean admins), tiene que estar logueado
router.get('/users', veryToken, (req, res, next) => {
  User.find({$nor:[{role:'ADMIN'}]})
  .then(users => {
    res.status(200).json({result:users})
  })
  .catch( error => res.status(400).json({error}))
});

//Actualizar mi perfil
router.patch('/editMyUser', veryToken, checkRole(['Admin','USER']), (req, res, next)=> {
  const{_id} = req.user;
  const{role,...restUser} = req.body; //el role no se puede modificar
  User.findByIdAndUpdate(_id,restUser,{new:true})
  .then(user => {
    res.status(200).json({result:user})
  })
  .catch( error => res.status(400).json({error}))
});

//Actualizar perfil de otros usuarios (tiene que ser ADMIN)
router.patch('/:id/editUser', veryToken, checkRole(['Admin']), (req, res, next)=> {
  //Sacamos el parametro id del req.params
  const{id} = req.params;
  const{role,...restUser} = req.body; //el role no se puede modificar
  User.findByIdAndUpdate(id,restUser,{new:true})
  .then(user => {
    res.status(200).json({result:user})
  })
  .catch( error => res.status(400).json({error}))
});

//Eliminar perfil (tiene que ser ADMIN)
router.delete('/:id/deleteUser', veryToken, checkRole(['Admin']), (req, res, next)=> {
  //Sacamos el parametro id del req.params
  const{id} = req.params;

  User.findByIdAndDelete(id)
  .then(()=>{
    res.status(200).json({msg:'Usuario borrado'})
  })
  .catch( error => res.status(400).json({error}))
});

module.exports = router;
