import SlugService from '../services/Slug.services.js'

async function store(req, res, next){
    try{
        let { slug } = req.body
        slug = slug.toLowerCase()
        if(!slug){
            throw new Error('Slug not provide')
        }
        slug = await SlugService.store(slug)
        res.status(200).send(slug)
    }catch(err){
        next(err)
    }
}

async function index(req, res, next){
    try{
        const slugs = await SlugService.index()
        res.status(200).send(slugs)
    }catch(err){
        next(err)
    }
}

async function destroy(req, res, next){
    try{
        let {id} = req.body
        await SlugService.destroy(id)
        res.status(200).send({slug: 'deleted'})
    }catch(err){
        next(err)
    }
}

export default {
    store,
    index,
    destroy
}