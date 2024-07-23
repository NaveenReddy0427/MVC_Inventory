import path from "path"
import ProductModel from "../models/product_Model.js"

export default class productController{
    getProducts(req, res){
        let products = ProductModel.get()
        console.log(products);
        res.render('products', {products:products})
        // return res.sendFile(path.join(path.resolve(), 'src', 'views', 'products.html'))
    }

    // getAddForm(req, res){
    //     return res.render('newProduct')
    // }

    getAddProduct(req, res){
        return res.render('newProduct', {
            errorMessage: null
        })
    }

    postAddProduct(req, res){
        ProductModel.add(req.body)
        let products = ProductModel.get()
        res.render('products', {products:products})
    }

    // addNewProduct(req, res){
    //     console.log(req.body)
    //     ProductModel.add(req.body)
    //     let products = ProductModel.get()
    //     return res.render('products', {products:products})
    // }

    getProductViewByID(req, res, next){
       
        const id = req.params.id;
        const productFound = ProductModel.getProductById(id);
        if (productFound) {
        res.render('updateProduct', {
            product: productFound,
            errorMessage: null,
        });
        }
    // 2. else return errors.
        else {
        res.status(401).send('Product not found');
        }
    }

    updateProduct(req, res){
        ProductModel.update(req.body)
        var products = ProductModel.get();
        res.render('products', { products });
    }

    deleteProduct(req, res) {
        const id = req.params.id;
        const productFound = ProductModel.getProductById(id);
        if (!productFound) {
          return res
            .status(401)
            .send('Product not found');
        }
        ProductModel.delete(id);
        var products = ProductModel.get();
        res.render('products', { products });
      }

    
}