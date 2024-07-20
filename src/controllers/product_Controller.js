import path from "path"
import ProductModel from "../models/product_Model.js"

export default class productController{
    getProducts(req, res){
        let products = ProductModel.get()
        console.log(products);
        res.render('products', {products:products})
        // return res.sendFile(path.join(path.resolve(), 'src', 'views', 'products.html'))
    }

    getAddForm(req, res){
        return res.render('newProduct')
    }

    addNewProduct(req, res){
        console.log(req.body)
        ProductModel.add(req.body)
        let products = ProductModel.get()
        return res.render('products', {products:products})
    }
}