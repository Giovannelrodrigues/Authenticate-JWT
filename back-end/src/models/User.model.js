import mongoose from '../database/db.js'
import bcrypt from "bcrypt"

const UserSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        default: 'user'
    }
}, {
    timestamps: true
})

UserSchema.pre('save', async function(req, res, next){
    if(this.password !== 'gg'){
        this.password = await bcrypt.hash(this.password, 10)
        next()
    }
})

const User = mongoose.model('User', UserSchema)

export default User

