import ProductRepository from '../repositories/Product.repository.js'

async function Store(product, files){
    return await ProductRepository.Store(product, files)
}


async function index(){
    return await ProductRepository.index()
}

async function destroy(id){
    return await ProductRepository.destroy(id)
}

export default{
    Store,
    index,
    destroy
}