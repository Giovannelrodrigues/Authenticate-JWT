import mongoose from "../database/db.js";

const ProductSchema = new mongoose.Schema({
    slug:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slug'
    },
    model:{
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    }, 
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    },
    qtd:{
        type: Number,
        required: true,
        default: 0
    },
    sizes:{
        type: Array,
        default: []
    },
    price:{
        type: Number,
        required: true
    },
    portion:{
        type: Number,
        required: true,
        min: 1,
        max: 12
    },
    thumbnail:{
        type: Array,
        default: []
    }
})

const Product = mongoose.model('Product', ProductSchema)

export default Product