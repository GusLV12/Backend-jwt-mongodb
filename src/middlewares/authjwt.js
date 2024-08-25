import jwt from 'jsonwebtoken'
import config from '../config.js'
import User from '../models/user.js';
import Role from '../models/role.js';

export const verifyToken = async (req, res, next) => {
  const token = req.headers["x-access-token"];

  if(!token) return res.status(403).json({message: 'No Token provided'});

  const decoded = jwt.verify(token, config.SECRET);

  const user = await User.findById(decoded.id);
  if(!user) return res.status(401).json({message: 'Usuario no encontrado.'});

  console.log(token)
  next(); 
}

export const isModerator = async (req, res, next) => {
  const user = await User.findById(req.userId)
  const roles = Role.find({_id: {$in: user.roles}})

  for(let i = 0; i<(await roles).length; i++){
    if(roles[i].name === 'moderator'){
      next();
      return;
    }
  }

  return res.status(404).json({message: 'No puedes acceder role'})
}

export const isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId)
  const roles = Role.find({_id: {$in: user.roles}})

  for(let i = 0; i<(await roles).length; i++){
    if(roles[i].name === 'admin'){
      next();
      return;
    }
  }

  return res.status(404).json({message: 'No puedes acceder role'})
}