import userModel from "../models/user_Model.js";

export default class userController{
    getRegister(req, res){
        res.render('register');
    }
}