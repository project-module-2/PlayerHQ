const express = require('express');
const router = express.Router();
//Importar los modelos necesarios
const User = require('../models/User');
const Party = require('../models/Party');
const FriendRequest = require('../models/FriendRequest');
const PartyRequest = require('../models/PartyRequests');

//Importamos los utils
const {checkRole, veryToken} = require('../utils/auth-mid');

//Encontrar usuarios
router.get('/', veryToken,checkRole(['Admin','USER']), (req, res, next) => {
  //Excluir su propio ID y los IDs de los usuarios que ha bloqueado
  const excludedIds = [req.user._id, ...req.user._blocked];
  const userId = req.user._id;
  console.log(userId);
  //Encontrar users que no tengan role de ADMIN y que no sean parte de los IDs excluidos
  User.find({
    $nor:[{role:'ADMIN'}],
    $and:[{_id: {$nin:excludedIds}},{_blocked: {$nin:[req.user._id]}}]
  })
  .then(users => {
    let userArr = users;
    userArr = userArr.filter(user => !user._blocked.includes(userId));

    res.status(200).json({result:userArr});
  })
  .catch( error => res.status(400).json({error}))
});

//Conseguir los 10 usuarios mas populares
router.get('/popularUsers', veryToken,checkRole(['Admin','USER']), (req, res, next) => {
  //Excluir su propio ID y los IDs de los usuarios que ha bloqueado
  const excludedIds = [req.user._id, ...req.user._blocked];
  const userId = req.user._id;
  console.log(userId);
  //Encontrar users que no tengan role de ADMIN y que no sean parte de los IDs excluidos
  User.find({
    $nor:[{role:'ADMIN'}],
    $and:[{_id: {$nin:excludedIds}},{_blocked: {$nin:[req.user._id]}}]
  })
  User.aggregate([
    {
      $addFields: {
        subscribedGroupsLength: {
          $size: "$_friends"
        }
      }
    },
    {
      $sort: {
        subscribedGroupsLength: -1
      }
    }
  ])
  .limit(10)
  .then(users => {
    let userArr = users;
    userArr = userArr.filter(user => !user._blocked.includes(userId));
    console.log("USERARR",userArr);
    res.status(200).json({result:userArr});
  })
  .catch( error => res.status(400).json({error}))
});

//Find users by their name, platform, style and favorite game
router.post('/findUsers', veryToken,checkRole(['Admin','USER']), (req, res, next) => {
  //Excluir su propio ID y los IDs de los usuarios que ha bloqueado
  const {user,platform,style,favoriteGame} = req.body;
  const excludedIds = [req.user._id, ...req.user._blocked];
  const userId = req.user._id;
  console.log(req.body);
  console.log(user);
  //Encontrar users que no tengan role de ADMIN y que no sean parte de los IDs excluidos
  User.find({
    $nor:[{role:'ADMIN'}],
    $and:[{_id: {$nin:excludedIds}},{_blocked: {$nin:[req.user._id]}}],
    $and:[{platforms:{$regex:`.*${platform}.*`, $options:'i'}},
        {intereses:{$regex:`.*${style}.*`, $options:'i'}},
        {favoriteGame:{$regex:`.*${favoriteGame}.*`, $options:'i'}},
        {username:{$regex:`.*${user}.*`, $options:'i'}}]
  })
  .limit(100)
  .then(users => {
    let userArr = users;
    userArr = userArr.filter(user => !user._blocked.includes(userId));

    res.status(200).json({result:userArr});
  })
  .catch( error => res.status(400).json({error}))
});

//Find users by id
router.post('/findUsersByID', veryToken,checkRole(['Admin','USER']), (req, res, next) => {
  //Excluir su propio ID y los IDs de los usuarios que ha bloqueado
  const {_id} = req.body;

  //Encontrar users que no tengan role de ADMIN y que no sean parte de los IDs excluidos
  User.findById(_id)
  .then(user => {
    res.status(200).json({result:user});
  })
  .catch( error => res.status(400).json({error}))
});

//Actualizar mi perfil
router.patch('/editMyUser', veryToken, checkRole(['Admin','USER']), (req, res, next)=> {
  const{_id} = req.user;
  const{role, _friends, _blocked, ...restUser} = req.body; //el role no se puede modificar
  console.log(restUser);
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
router.patch('/blockUser', veryToken, checkRole(['Admin','USER']), (req, res, next)=> {
  //Sacamos el parametro id del req.params
  const{id} = req.body;
  if(req.user._blocked.includes(id)) {
    res.status(200).json({msg:"Error, ya tienes bloqueado a este usuario"});
  }
  else {
    let responseMsg = "";
    User.findByIdAndUpdate({_id: req.user._id} ,{$push:{_blocked:id}}, {new:true})
    .then(() => {
      responseMsg+='Se ha bloqueado el usuario exitosamente --- '
    })
    .catch( error => res.status(400).json({error}));
  
    //Borrar de la lista de amigos
    User.findByIdAndUpdate({_id: req.user._id} ,{$pull:{_friends:id}}, {new:true})
    .then(() => {
      responseMsg+='Se ha borrado a el usuario exitosamente el usuario de la lista de amigos --- '
    })
    .catch( error => res.status(400).json({error}));
  
    User.findByIdAndUpdate({_id: id} ,{$pull:{_friends:req.user._id}}, {new:true})
    .then(() => {
      responseMsg+='Se ha borrado a el usuario exitosamente el usuario de la lista de amigos del usuario bloqueado --- '
    })
    .catch( error => res.status(400).json({error}));
  
    //Marcar solicitudes de amistad como declined
    FriendRequest.updateMany({$or: [{$and: [{_from: req.user._id},{_to: id}]},{$and: [{_from: id},{_to: req.user._id}]}]}, {status:"declined"}, {new:true})
    .then(() => {
      responseMsg+='Se han limpiado las solicitudes de amistad del usuario bloqueado --- '
    })
    .catch( error => res.status(400).json({error}));
  
    //Marcar invitaciones de party como declined
    PartyRequest.updateMany({$or: [{$and: [{_owner: req.user._id},{_to: id}]},{$and: [{_owner: id},{_to: req.user._id}]}]}, {status:"declined"}, {new:true})
    .then(() => {
      responseMsg+='Se han limpiado las solicitudes de party del usuario bloqueado --- '
      res.status(200).json({msg:responseMsg});
    })
    .catch( error => res.status(400).json({error}));
  }
});

//Desbloquear perfil
router.patch('/unBlockUser', veryToken, checkRole(['Admin','USER']), (req, res, next)=> {
  //Sacamos el parametro id del req.params
  const{id} = req.body;

  User.findByIdAndUpdate({_id: req.user._id} ,{$pull:{_blocked:id}}, {new:true})
  .then(() => {
    res.status(200).json({msg:`Se ha desbloqueado el usuario exitosamente`});
  })
  .catch( error => res.status(400).json({error}));
});

//Eliminar amigo
router.patch('/unFriend/:id', veryToken, checkRole(['Admin']), (req, res, next)=> {
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
router.get('/partiesJoined', veryToken, (req, res, next) => {
  const userId = req.user._id;

  Party.find({'_members': {"$in":userId}})
  .then(parties => {
    res.status(200).json({result:parties})
  })
  .catch( error => res.status(400).json({error}))
});

//Buscar la lista de parties de la cual el usuario es dueño
router.get('/partiesOwned', veryToken, (req, res, next) => {
  const userId = req.user._id;

  Party.find({_owner: userId})
  .then(parties => {
    res.status(200).json({result:parties})
  })
  .catch( error => res.status(400).json({error}))
});

module.exports = router;
