const express = require('express');
const router = express.Router();
//Importar los modelos necesarios
const FriendRequest = require('../models/FriendRequest');
const User = require('../models/User');

//Importamos los utils
const {checkRole, veryToken, checkParty} = require('../utils/auth-mid');

//Crear friend request
router.patch('/createFriendRequest', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
  const userId = req.user._id;
  const myRequest = {date,message,_to} = req.body

  myRequest["_from"]=`${userId}`;

  //Verificar que el usuario al que enviamos el request no sea a el mismo o a un usuario bloqueado
  if(myRequest._to === myRequest._from){
    res.status(200).json({msg:"No puedes enviar una invitacion a ti mismo"});
  }
  else if(req.user._blocked.includes(myRequest._to)){
    res.status(200).json({msg:"No puedes enviar una invitacion a un usuario bloqueado"});
  }
  else {
    //Verificamos que el usuario destinatario no tenga bloqueado a el usuario que envia el request
    User.findById(myRequest._to)
    .then(foundUser => {
      if(foundUser._blocked.includes(userId)) {
        res.status(200).json({msg:"No puedes enviar una invitacion a un usuario que te ha bloqueado"});
      }
      else {
        FriendRequest.find({_from:userId, _to:myRequest._to, status:"pending"})
        .then(foundRequests => {
          if(foundRequests.length>0) {
            res.status(200).json({msg:"Ya existe una friend request activa para este usuario"});
          }
          else {
            FriendRequest.create(myRequest)
            .then(request => {
              res.status(200).json({result:request})
            })
            .catch( error => res.status(400).json({error}));
          }
        })
        .catch( error => res.status(400).json({error}));
      }
    })
    .catch( error => res.status(400).json({error}));


  }

});

//Encontrar todos los requests creados por el usuario, tiene que estar logueado
router.get('/friendRequestsFrom', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
  FriendRequest.find({_from: req.user._id})
  .then(requests => {
    res.status(200).json({result:requests})
  })
  .catch( error => res.status(400).json({error}))
});

//Encontrar todos los requests realizados hacia el usuario, tiene que estar logueado
router.get('/friendRequestsTo', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
  FriendRequest.find({_to: req.user._id})
  .then(parties => {
    res.status(200).json({result:parties})
  })
  .catch( error => res.status(400).json({error}))
});

//Eliminar request, debe de ser ADMIN
router.delete('/deleteFriendRequest/:id', veryToken, checkRole(['Admin']), (req, res, next)=> {
  //Sacamos el parametro id del req.params
  const{id} = req.params;
  FriendRequest.findByIdAndDelete(id)
  .then(()=>{
    res.status(200).json({msg:'Request borrado'})
  })
  .catch( error => res.status(400).json({error}))
});

//Aceptar Request
router.post('/acceptFriendRequest/:id', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
  FriendRequest.create({_from:req.user._id})
  .then(request => {
    res.status(200).json({result:request})
  })
  .catch( error => res.status(400).json({error}))
});

//Rechazar Request
router.post('/rejectFriendRequest /:id', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
  FriendRequest.create({_from:req.user._id})
  .then(request => {
    res.status(200).json({result:request})
  })
  .catch( error => res.status(400).json({error}))
});

module.exports = router;