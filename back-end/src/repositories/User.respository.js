import User from '../models/User.model.js'

async function Store(user){
    if(!await User.findOne({email: user.email})){
        let newUser ={
            email: user.email,
            password: user.password
        }
        newUser = await User.create(newUser)
        return newUser
    }else{
        throw new Error("Email already exists")
    }
}

export default {
    Store
}