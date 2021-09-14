import Product from '../models/Product.model.js'

async function Store(product, files){
    let sizes = product.sizes
   
    if(await Product.findOne({code: product.code})){
        throw new Error('Product already exists')
    }

    let listsize = []
    let list = sizes.split(',').map(size => listsize.push(size.split('-'))).map(size => [size[0], Number(size[1])])
    let listDB = listsize.map(size => [size[0], Number(size[1])])

    let prod = await Product.create({
        slug: product.slug,
        model: product.model,
        code: product.code,
        brand: product.brand,
        color: product.color,
        name: product.name,
        qtd: product.qtd,
        sizes: listDB,
        price: product.price,
        portion: product.portion,
        thumbnail: files
    })
    return prod
}


async function index(){
    return await Product.find().populate('slug')
}

async function destroy(id){
    return await Product.deleteOne({_id: id})
}

async function show(id){
    return await Product.findOne({_id: id})
}

export default {
    Store,
    index,
    destroy,
    show
}