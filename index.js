import express from 'express'
import path from "path"
import ejsLayouts from "express-ejs-layouts"
import productController from './src/controllers/product_Controller.js'
import addProductValidationMiddleware from './src/middlewares/addProductValidation_Middleware.js'
import { uploadFile } from './src/middlewares/fileUpload_Middleware.js'
import userController from './src/controllers/user_Controller.js'


const server = express()

// to render static js file
server.use(express.static('public'))

// configure the session 


// parse form data
server.use(express.urlencoded({extended: true}))


// viewengine configuration
server.set('view engine', 'ejs')
server.set('views', path.join(path.resolve(), 'src', 'views'))

//ejs layout middleware
server.use(ejsLayouts)
server.use(express.json())

// Create an instance of ProductController
const ProductController = new productController()

server.get('/', ProductController.getProducts)
server.get('/new', ProductController.getAddProduct)
server.post('/', uploadFile.single('imageUrl'), addProductValidationMiddleware, ProductController.postAddProduct)
server.get('/update-product/:id', ProductController.getProductViewByID)
server.post('/update-product', uploadFile.single('imageUrl'), ProductController.updateProduct)
server.post('/delete-product/:id', ProductController.deleteProduct)


// create an instance for userController
const UserController = new userController()
server.get('/register', UserController.getRegister)
server.get('/login', UserController.getLogin)
server.post('/login', UserController.postLogin)
server.post('/register', UserController.postRegister)

server.use(express.static('src/views'))

server.listen(3501, ()=>{
    console.log('server is running on port 3501')
})