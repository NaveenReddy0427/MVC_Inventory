

const addProductValidationMiddleware = (req, res, next)=>{
    const {name, price, imageUrl} = req.body
        let errors = []
        if(!name || name.trim() == ''){
            errors.push('Name is required')
        }
        if(!price || parseFloat(price)<1){
            errors.push('price value must be a positive')
        }

        try {
            const validUrl = new URL(imageUrl)
        } catch (error) {
            errors.push('URL is invalid')
        }

        if(errors.length>0){
            return res.render('newProduct', {
                errorMessage: errors[0]
            })
        }
        next()
}

export default addProductValidationMiddleware;