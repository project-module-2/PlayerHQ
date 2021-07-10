const express = require('express');
const router = express.Router();
//Importar los modelos necesarios
const User = require('../models/User');

//Importamos los utils
const {checkRole, veryToken} = require('../utils/auth-mid');

//Encontrar usuarios
router.get('/', veryToken, (req, res, next) => {
  //Excluir su propio ID y los IDs de los usuarios que ha bloqueado
  const excludedIds = [req.user._id, ...req.user._blocked];
  const userId = req.user._id;
  console.log(userId);
  //Encontrar users que no tengan role de ADMIN y que no sean parte de los IDs excluidos
  User.find({
    $nor:[{role:'ADMIN'}],
    _id: {$nin:excludedIds},
    '_blocked': {"$ne":userId}
  })
  .then(users => {
    res.status(200).json({result:users})
  })
  .catch( error => res.status(400).json({error}))
});

//Actualizar mi perfil
router.patch('/editMyUser', veryToken, checkRole(['Admin','USER']), (req, res, next)=> {
  const{_id} = req.user;
  console.log(_id)
  const{role, ...restUser} = req.body; //el role no se puede modificar
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

//Bloquear perfil
router.patch('/blockUser/:id', veryToken, checkRole(['Admin']), (req, res, next)=> {
  //Sacamos el parametro id del req.params
  const{id} = req.params;

  User.findByIdAndUpdate({_id: req.user._id} ,{$push:{_blocked:id}}, {new:true})
  .then(() => {
    res.status(200).json({msg:`Se ha bloqueado el usuario exitosamente ${req.user._blocked}`});
  })
  .catch( error => res.status(400).json({error}));

  //Marcar solicitudes de amistad como declined
  //Marcar invitaciones de party como declined
});

//Desbloquear perfil
router.patch('/unBlockUser/:id', veryToken, checkRole(['Admin']), (req, res, next)=> {
  //Sacamos el parametro id del req.params
  const{id} = req.params;

  User.findByIdAndUpdate({_id: req.user._id} ,{$pull:{_blocked:id}}, {new:true})
  .then(() => {
    res.status(200).json({msg:`Se ha bloqueado el usuario exitosamente ${req.user._blocked}`});
  })
  .catch( error => res.status(400).json({error}));
});

//Eliminar amigo
router.patch('/unBlockUser/:id', veryToken, checkRole(['Admin']), (req, res, next)=> {
  //Sacamos el parametro id del req.params
  const{id} = req.params;

  User.findByIdAndUpdate({_id: req.user._id} ,{$pull:{_friends:id}}, {new:true})
  .then((user) => {
    res.status(200).json({msg:`Se ha borrado a el usuario exitosamente ${user._friends}`});
  })
  .catch( error => res.status(400).json({error}));

  User.findByIdAndUpdate({_id: id} ,{$pull:{_friends:req.user._id}}, {new:true})
  .then((friend) => {
    res.status(200).json({msg:`Se ha borrado a el usuario exitosamente ${friend._friends}`});
  })
  .catch( error => res.status(400).json({error}));
});

//Buscar la lista de parties de la cual pertenece el usuario

//Buscar la lista de parties de la cual el usuario es dueño

module.exports = router;
