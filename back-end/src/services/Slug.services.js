import SlugRepository from '../repositories/Slug.repository.js'

async function store(slug){
    return await SlugRepository.store(slug)
}

async function index(){
    return await SlugRepository.index()
}

async function destroy(id){
    return await SlugRepository.destroy(id)
}


export default{
    store,
    index,
    destroy
}