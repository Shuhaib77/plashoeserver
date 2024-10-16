


export const trycatchmidle=(routehandler)=>{
    return async(req,res,next)=>{
       try {
        await routehandler(req,res,next)
        
       } catch (error) {

        res.status(500).json({
            status:"faild",
            message:"errorr",
            error_message:error.message

        })
        
       }

    }



}