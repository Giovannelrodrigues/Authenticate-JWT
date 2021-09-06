import User from '../models/User.model.js'
import Blacklist from '../models/BlackList.model.js'

async function StoreGoogle(user){
    let email = user._json.email
    let newUser = {
        email: email,
        password: 'gg'
    }
    newUser = await User.create(newUser)
    return newUser
}

async function login(user){
    let userDB = await User.findOne({email: user.email})
    if(userDB){
        return userDB
    }else{
        throw new Error("User not exists")
    }
}

async function logout(token){
    return await Blacklist.create({token: token})
}
async function loginGoogle(user){
    let email = user._json.email
    return await User.findOne({email: email})
}

export default {
    login,
    logout,
    loginGoogle,
    StoreGoogle
}