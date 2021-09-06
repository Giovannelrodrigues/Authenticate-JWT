import jwt from "jsonwebtoken"
import BlackList from "../models/BlackList.model.js"

export default async (req, res, next) => {
    const AuthHeader = req.headers.authorization

    if(!AuthHeader){
        return res.status(403).send({error: 'No token provide'})
    }

    const parts = AuthHeader.split(' ')
    if(!parts.length === 2){
        return res.status(403).send({error: 'Token malformated'})
    }

    const [schema, token] = parts

    if(!schema === 'Bearer'){
        return res.status(403).send({error: 'Token malformated'})
    }

    if(await BlackList.findOne({token: token})){
        return res.status(403).send({error: 'Token Expired'})
    }

    jwt.verify(token, process.env.SECRET_JWT, (err, decode) => {
        if(err){
            return res.status(403).send({error: 'Token invalid'})
        }
        req.id = decode.id
        return next()
    })
}