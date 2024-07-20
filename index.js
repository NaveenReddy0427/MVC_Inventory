import express from 'express'
import path from "path"
import ejsLayouts from "express-ejs-layouts"
import productController from './src/controllers/product_Controller.js'

const server = express()

// parse form data
server.use(express.urlencoded({extended: true}))


// viewengine configuration
server.set('view engine', 'ejs')
server.set('views', path.join(path.resolve(), 'src', 'views'))

//ejs layout middleware
server.use(ejsLayouts)

// Create an instance of ProductController
const ProductController = new productController()
server.get('/', ProductController.getProducts)
server.get('/new', ProductController.getAddForm)
server.post('/', ProductController.addNewProduct)

server.use(express.static('src/views'))

server.listen(3501, ()=>{
    console.log('server is running on port 3501')
})