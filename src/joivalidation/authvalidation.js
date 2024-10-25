import joi from'joi'


const authvalidation=joi.object({
    
    email:joi.string().email({
        minDomainSegments:2,
        tlds: {allow:["com","net"]},
    }).required(),
    password:joi.string().min(4).required(),
    // confirmpass:joi.any().valid(joi.ref('password')).required(),


})

 export default authvalidation