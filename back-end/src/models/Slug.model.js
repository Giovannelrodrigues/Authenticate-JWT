import mongoose from '../database/db.js'


const SlugSchema = new mongoose.Schema({
    slug: {
        type: String,
        lowercase: true,
        required: true,
        unique: true
    }
})


const Slug = mongoose.model('Slug', SlugSchema)

export default Slug