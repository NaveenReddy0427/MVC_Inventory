import ProductModel from "../models/product_Model.js";
import userModel from "../models/user_Model.js";

export default class userController{

    getRegister(req, res){
        res.render('register');
    }

    getLogin(req, res){
        res.render('login', { errorMessage: null })
    }

    postRegister(req, res) {
        const { name, email, password } = req.body;
        userModel.add(name, email, password);
        res.render('login', { errorMessage: null });
      }

    postLogin(req, res) {
        const { email, password } = req.body;
        const user = userModel.isValidUser(
          email,
          password
        );
        if (!user) {
          return res.render('login', {
            errorMessage: 'Invalid Credentials',
          });
        }
        req.session.userEmail=email;
        var products = ProductModel.get();
        res.render('products', { products, userEmail: req.session.userEmail });
      }

      logout(req, res){
        req.session.destroy((err)=>{
            if(err){
                console.log(err)
            }else{
                res.redirect('/login')
            }
        })
      }
}