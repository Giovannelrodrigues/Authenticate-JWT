import User from '../models/User.model.js'

export default async (req, res, next) =>{
    const id = req.id
    let user = await User.findOne({_id: id})
    if(user.role !== 'admin'){
        res.status(403).send({error: 'You dont have permission'})
    }else{
        next()
    }
}