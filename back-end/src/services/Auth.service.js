import AuthRepository from '../repositories/Auth.repository.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

async function generateToken(id){
    return jwt.sign({id: id}, process.env.SECRET_JWT, {
        expiresIn: 840000
    })
}

async function login(user){
    let userDB = await AuthRepository.login(user)
    if(userDB.password === 'gg'){
        throw new Error('You must login with google')
    }
    if(!await bcrypt.compare(user.password, userDB.password)){
        throw new Error('Password invalid')
    }
    userDB.password = undefined
    const token = await generateToken(userDB._id)
    return {
        user: userDB,
        token
    }
}
async function loginGoogle(user){
    let userDB = await AuthRepository.loginGoogle(user)
    if(!userDB){
        userDB = await AuthRepository.StoreGoogle(user)
    }
    const token = await generateToken(userDB._id)
    userDB.password = undefined
    return {
        userDB,
        token
    }
}

async function logout(token){
    return await AuthRepository.logout(token)
}

export default {
    login,
    logout,
    loginGoogle
}