import AuthService from '../services/Auth.service.js'

async function loginGoogle(req, res, next){
    try{
        let user = req.user
        if(!user){
            res.status(400).send('Login with google failed')
        }
        user = await AuthService.loginGoogle(user)
        res.status(200).send(user)
    }catch(err){
        next(err)
    }
}

async function login(req, res, next){
    try{
        let user = req.body
        if(!user.email || !user.password){
            res.status(400).send({error: 'Email and Password is required'})
        }
        user = await AuthService.login(user)
        res.status(200).send(user)
    }catch(err){
        next(err)
    }
}

async function logout(req, res, next){
    try{
        console.log(req.user)
        const AuthHeader = req.headers.authorization
        const [schema, token] = AuthHeader.split(' ')
        await AuthService.logout(token)
        res.status(200).send({user: 'logout'})
    }catch(err){
        next(err)
    }
}

export default {
    login,
    logout,
    loginGoogle
}
