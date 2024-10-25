import Joi from "joi";


const productvalidation=Joi.object({

    image:Joi.string(),
    brand: Joi.string(),
    title: Joi.string(),
    catogery:Joi.string(),
    price:Joi.number(),
    quantity:Joi.number(),
    description: Joi.string(),

})

export default productvalidation