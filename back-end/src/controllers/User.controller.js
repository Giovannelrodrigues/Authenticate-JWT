import UserService from '../services/User.service.js'

async function Store(req, res, next){
    try{
        let user = req.body

        if(!user.email || !user.password || !user.confirmPassword){
            throw new Error('Email and Password is required')
        }
        if(user.password.length < 6){
            throw new Error('Password must be six charactere')
        }
        if(user.password !== user.confirmPassword){
            throw new Error('Passwords not matcheds')
        }
        user = await UserService.Store(user)
        res.status(200).send(user)
    }catch(err){
        next(err)
    }
}

async function changeroles(req, res, next){
    try{
        let user = req.body
        if(!user.id){
            throw new Error('Email not provide')
        }
        user = await UserService.changeroles(user)
        res.status(200).send(user)
    }catch(err){
        next(err)
    }
}

export default {
    Store,
    changeroles
}