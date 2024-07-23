import { body, validationResult } from "express-validator"

const addProductValidationMiddleware = async (req, res, next)=>{
        
        // setup rules for validation
        const rules = [
            body('name').notEmpty().withMessage('name is required'),
            body('price').isFloat({gt:0}).withMessage('Price should be Positive'),
            body('imageUrl').isURL().withMessage('Invalid URL')
        ]
        

        // run the rules 
        await Promise.all(rules.map(rule=>rule.run(req)))

        // checking if there are any errors after running the rules
        const validationErrors = validationResult(req)

        if(!validationErrors.isEmpty()){
            return res.render('newProduct', {
                errorMessage: validationErrors.array()[0].msg
            })
        }
        next()
}

export default addProductValidationMiddleware;