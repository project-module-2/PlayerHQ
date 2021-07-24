const express = require('express');
const router = express.Router();
//Importar los modelos necesarios
const Party = require('../models/Party');
const User = require('../models/User');

//Importamos los utils
const {checkRole, veryToken} = require('../utils/auth-mid');

//Tengo que crear un crud completo si es necesario

//Encontrar todas las parties (de las cuales el owner no bloqueo al usuario o viceversa), tiene que estar logueado
router.get('/parties', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
  //Excluir su propio ID y los IDs de los usuarios que ha bloqueado
  const excludedIds = [req.user._id, ...req.user._blocked];

  User.find({
    _id: {$nin:excludedIds},
    '_blocked': {"$in":req.user._id}
  })
  .then(user =>{
    //Excluir los usuarios que han bloqueado al usuario que busca las parties
    excludedIds.push(user._id);
  })
  .catch( error => res.status(400).json({error}))

  //Buscar todas las parties cuyo owner no sea parte de la lista de usuarios excluidos
  Party.find({
    _owner: {$nin:[req.user._id]}
  })
  .then(parties => {
    res.status(200).json({result:parties})
  })
  .catch( error => res.status(400).json({error}))
});

//Crear party
router.patch('/createParty', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
  let request = {title, date, expireDate, description, game, type} = req.body;
  request["_owner"]=req.user._id;

  Party.create(request)
  .then(party => {
    res.status(200).json({result:party})
  })
  .catch( error => res.status(400).json({error}))
});

//Actualizar party
router.patch('/editMyParty', veryToken, checkRole(['Admin','USER']), (req, res, next)=> {
  const {role} = req.user;
  const{id} = req.body;

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
    const changes = {title, date, expireDate, description, game, type} = req.body;
    Party.findOneAndUpdate({$and: [{_id: id},{_owner: req.user._id}]} ,{changes}, {new:true})
    .then((party) => {
      if(party===null){
        res.status(200).json({msg:"esta party no se encontro o no le pertenece al usuario"});
      }
      else {
        res.status(200).json({result:party});
      }
    })
    .catch( error => res.status(400).json({error}));
  }
});

//Eliminar parties
router.delete('/deleteParty', veryToken, checkRole(['Admin','USER']), (req, res, next)=> {
  const {role} = req.user
  const{id} = req.body;

    if(role.includes('Admin')){
      //Si el usuario es admin, puede eliminar la party
      Party.findByIdAndDelete(id)
      .then(()=>{
        res.status(200).json({msg:'Party eliminada'});
      })
      .catch( error => res.status(400).json({error}))
    }
    else {
      Party.findOneAndDelete({$and: [{_id: id},{_owner: req.user._id}]})
      .then((party) => {
        if(party===null){
          res.status(200).json({msg:"esta party no se encontro o no le pertenece al usuario"});
        }
        else {
          res.status(200).json({msg:'Party eliminada'});
        }
      })
      .catch( error => res.status(400).json({error}));
    }
});

//Eliminar a usuario de party
router.patch('/removePartyMember', veryToken, checkRole(['Admin','USER']), (req, res, next)=> {
  const {role} = req.user
  const{partyId, userId} = req.bod;

  if(role.includes('Admin')){
    //Si el usuario es admin, puede eliminar un usuario de una party
    Party.findByIdAndUpdate({_id: partyId} ,{$pull:{_members:userId}}, {new:true})
    .then((party) => {
      res.status(200).json({msg:`Se ha eliminado exitosamente al usuario de la party: ${party}`});
    })
    .catch( error => res.status(400).json({error}));
  }
  else {
    //Si el usuario es dueño de la party, puede eliminar un usuario de una party
    Party.findOneAndUpdate({$and: [{_id: partyId},{_owner: req.user._id}]} ,{$pull:{_members:userId}}, {new:true})
    .then((party) => {
      res.status(200).json({msg:`Se ha eliminado exitosamente al usuario de la party: ${party}`});
    })
    .catch( error => res.status(400).json({error}));
  }
});

//Salirme de una party
router.patch('/removeMeFromParty', veryToken, checkRole(['Admin','USER']), (req, res, next)=> {
  const{partyId} = req.body;

  //Si el usuario es dueño de la party, puede eliminar un usuario de una party
  Party.findOneAndUpdate({_id: partyId} ,{$pull:{_members:req.user._id}}, {new:true})
  .then((party) => {
    res.status(200).json({msg:`Se ha eliminado exitosamente al usuario de la party: ${party}`});
  })
  .catch( error => res.status(400).json({error}));
});

module.exports = router;