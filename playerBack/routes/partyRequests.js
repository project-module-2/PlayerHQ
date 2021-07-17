const express = require('express');
const router = express.Router();
//Importar los modelos necesarios
const PartyRequests = require('../models/PartyRequests');
const Party = require('../models/Party');
const User = require('../models/User');

//Importamos los utils
const {checkRole, veryToken, checkParty} = require('../utils/auth-mid');

//Crear party request como owner
router.patch('/createPartyRequestAsOwner', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
  const userId = req.user._id;

  //Armar request
  const myRequest = {date,message,_to,_from} = req.body
  myRequest["_owner"]=`${userId}`;

  //Verificar que el request sender sea dueño de la party
  Party.findOne({$and: [{_owner:myRequest._owner},{_id:myRequest._from}]})
  .then(party =>{
    if(party !== null) {
        //Verificar que el usuario al que enviamos el request no sea a el mismo o a un usuario bloqueado
        if(myRequest._to === myRequest._owner){
            res.status(200).json({msg:"No puedes enviar una solicitud de party a ti mismo"});
        }
        else if(req.user._blocked.includes(myRequest._to)){
            res.status(200).json({msg:"No puedes enviar una solicitud de party a un usuario bloqueado"});
        }
        else if(party._members.includes(myRequest._to)){
            res.status(200).json({msg:"No puedes enviar una solicitud de party a un usuario que ya esta incluido en la party"});
        }
        else {
            //Verificamos que el usuario destinatario no tenga bloqueado a el usuario que envia el request
            User.findById(myRequest._to)
            .then(foundUser => {
            if(foundUser._blocked.includes(userId)) {
                res.status(200).json({msg:"No puedes enviar una solicitud de party a un usuario que te ha bloqueado"});
            }
            else {
                PartyRequests.find({_from:myRequest._from, _to:myRequest._to, status:"pending"})
                .then(foundRequests => {
                if(foundRequests.length>0) {
                    res.status(200).json({msg:"Ya existe una solicitud de party activa para este usuario"});
                }
                else {
                    PartyRequests.create(myRequest)
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

    }
    else {
        res.status(200).json({msg:"No se pudo encontrar la party solicitada o el usuario no es dueño de la party"});
    }
  })
  .catch( error => res.status(400).json({error}));

});

//Encontrar todos los requests creados por el usuario, tiene que estar logueado
router.get('/partyRequestsFrom', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
    PartyRequests.find({_from: req.user._id, status:"pending"})
  .then(requests => {
    res.status(200).json({result:requests})
  })
  .catch( error => res.status(400).json({error}))
});

//Encontrar todos los requests realizados hacia el usuario, tiene que estar logueado
router.get('/partyRequestsTo', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
    PartyRequests.find({_to: req.user._id, status:"pending"})
  .then(requests => {
    res.status(200).json({result:requests})
  })
  .catch( error => res.status(400).json({error}))
});

//Eliminar request, debe de ser ADMIN
router.delete('/deletePartyRequest/:id', veryToken, checkRole(['Admin']), (req, res, next)=> {
  //Sacamos el parametro id del req.params
  const{id} = req.params;
  PartyRequests.findByIdAndDelete(id)
  .then(()=>{
    res.status(200).json({msg:'Solicitud de amistad borrada'});
  })
  .catch( error => res.status(400).json({error}))
});

//Aceptar Request
router.patch('/acceptPartyRequest', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
  const{id} = req.body;
  const userId = req.user._id;
  console.log(id)
  PartyRequests.findOne({_id:id})
  .then(request => {
    if(request.status === "pending") {
      //Validaciones
      if(req.user._blocked.includes(request._owner)) {
        PartyRequests.findByIdAndUpdate({_id: id} ,{status: "declined"}, {new:true})
        .then(() => {
          res.status(200).json({msg:"No puedes aceptar una solicitud de una party de un usuario bloqueado"});
        })
        .catch( error => res.status(400).json({error}))
      }
      else {
        User.findById(request._owner)
        .then(foundUser => {
          if(foundUser._blocked.includes(userId)) {
            PartyRequests.findByIdAndUpdate({_id: id} ,{status: "declined"}, {new:true})
            .then(() => {
              res.status(200).json({msg:"No puedes aceptar una solicitud de amistad a un usuario que te ha bloqueado"});
            })
            .catch( error => res.status(400).json({error}))
          }
          else {
            //Agregar user a la party
            let responseMsg = "";
            Promise.all([
              Party.findByIdAndUpdate({_id: request._from} ,{$push:{_members:userId}}, {new:true}),
              PartyRequests.findByIdAndUpdate({_id: id} ,{status: "accepted"}, {new:true})
            ])
            .then(()=>{
              res.status(200).json({msg:"Usuario añadido a la party exitosamente!"});
            })
            .catch( error => res.status(400).json({error}))
          }
        })
        .catch( error => res.status(400).json({error}))
      }
    }
    else {
      res.status(200).json({msg:`Esta solicitud no puede ser aceptada, su status es: ${request.status}`});
    }
  })
  .catch( error => res.status(400).json({error}))
});

//Rechazar Request
router.patch('/rejectPartyRequest', veryToken, checkRole(['Admin','USER']), (req, res, next) => {
    const{id} = req.body;

  PartyRequests.findOneAndUpdate({$and: [{_id: id},{_to: req.user._id}]} ,{status: "declined"}, {new:true})
  .then((party) => {
    if(party===null) {
      res.status(200).json({msg:"no se encontro la solicitud de party"});
    }
    else {
      res.status(200).json({msg:`Invitacion de party rechazada exitosamente!`});
    }
  })
  .catch( error => res.status(400).json({error}));
});

module.exports = router;