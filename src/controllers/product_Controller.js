import ProductModel from "../models/product_Model.js"

export default class productController{
    getProducts(req, res, next){
        let products = ProductModel.get()
        res.render('products', {products, userEmail: req.session.userEmail})
        // return res.sendFile(path.join(path.resolve(), 'src', 'views', 'products.html'))
    }

    // getAddForm(req, res){
    //     return res.render('newProduct')
    // }

    getAddProduct(req, res, next){
        return res.render('newProduct', {
            errorMessage: null,
            userEmail: req.session.userEmail
        })
    }

    postAddProduct(req, res, next) {
        const { name, desc, price } = req.body;
        const imageUrl =
          'images/' + req.file.filename;
        ProductModel.add(name, desc, price, imageUrl);
        var products = ProductModel.get();
        res.render('products', { products, userEmail: req.session.userEmail });
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
            userEmail: req.session.userEmail
        });
        }
    // 2. else return errors.
        else {
        res.status(401).send('Product not found');
        }
    }

    updateProduct(req, res) {
        const { id, name, desc, price } = req.body;
        let product = ProductModel.getProductById(id);

        if (!product) {
            return res.status(401).send('Product not found');
        }

        const imageUrl = req.file ? 'images/' + req.file.filename : product.imageUrl;

        const updatedProduct = {
            id: parseInt(id, 10),
            name,
            desc,
            price,
            imageUrl
        };

        ProductModel.update(updatedProduct);
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