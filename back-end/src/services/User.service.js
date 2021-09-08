import UserRepository from '../repositories/User.respository.js'
import jwt from 'jsonwebtoken'


async function generateToken(id){
    return jwt.sign({id: id}, process.env.SECRET_JWT, {
        expiresIn: 840000
    })
}

async function Store(user){
    let userDB =  await UserRepository.Store(user)
    userDB.password = undefined
    const token = await generateToken(userDB._id)
    return {
        user: userDB,
        token
    }
}

async function changeroles(user){
    let userDB = await UserRepository.changeroles(user)
    return {
        _id: userDB.id,
        email: userDB.email,
        createdAt: userDB.createdAt,
        updatedAt: userDB.updatedAt,
        __v: userDB.__v,
        role: userDB.role
    }
}

export default {
    Store,
    changeroles
}