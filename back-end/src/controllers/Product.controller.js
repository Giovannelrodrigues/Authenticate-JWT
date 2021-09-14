import { response } from 'express';
import ProductServices from '../services/Product.services.js'

async function Store(req, res, next){
    try{
        let files = req.files;
        let product = req.body;
        if(!product.slug){
            res.status(400).send({error: 'Slug not provied'})
        }
        if(!product.model){
            res.status(400).send({error: 'model not provied'})
        }
        if(!product.code){
            res.status(400).send({error: 'code not provied'})
        }
        if(!product.brand){
            res.status(400).send({error: 'brand not provied'})
        }
        if(!product.color){
            res.status(400).send({error: 'color not provied'})
        }
        if(!product.qtd){
            res.status(400).send({error: 'quantity not provied'})
        }
        if(!product.sizes){
            res.status(400).send({error: 'sizes not provied'})
        }
        if(!product.price){
            res.status(400).send({error: 'price not provied'})
        }
        if(!product.portion){
            res.status(400).send({error: 'portion not provied'})
        }

        const response = await ProductServices.Store(product, files)
        res.status(200).send(response)
    }catch(err){
        next(err)
    }
}

async function index(req, res, next){
    try{
        const products = await ProductServices.index()
        res.status(200).send(products)
    }catch(err){
        next(err)
    }
}

async function destroy(req, res, next){
    try{
        let id = req.params.id
        await ProductServices.destroy(id)
        res.status(200).send({product: 'deleted'})
    }catch(err){
        next(err)
    }
}


async function show(req, res, next){
    try{
        let id = req.params.id
        const product = await ProductServices.show(id)
        res.status(200).send(product)
    }catch(err){
        next(err)
    }
}

export default {
    Store,
    index,
    destroy,
    show
}