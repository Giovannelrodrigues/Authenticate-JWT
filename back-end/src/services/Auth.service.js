import AuthRepository from '../repositories/Auth.repository.js'
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

async function generateToken(id){
    return jwt.sign({id: id}, process.env.SECRET_JWT, {
        expiresIn: 840000
    })
}

async function login(user, erro){
    let userDB = await AuthRepository.login(user, erro)
    if(userDB.password === 'gg'){
        erro.push('You must login with google')
    }

    if(!await bcrypt.compare(user.password, userDB.password)){
        erro.push('Password invalid')
    }
    if(erro.length  < 1){
        return erro
    }else{
        userDB.password = undefined
        const token = await generateToken(userDB._id)
    
        return {
            user: userDB,
            token
        }
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