import Slug from '../models/Slug.model.js'

async function store(slug){
    if(!await Slug.findOne({slug: slug})){
        const slugDB = await Slug.create({slug: slug})
        return slugDB
    }else{
        throw new Error('Slug already exists')
    }
}

async function index(){
    return await Slug.find()
}

async function destroy(id){
    return await Slug.deleteOne({_id: id})
}



export default{
    store,
    index,
    destroy
}