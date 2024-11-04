



export const errorHndler=(error,req,res,next)=>{

    console.log("error", error);
    if(error.statusCode){
        return res.status(error.statusCode).json({message:error.message})
    }

    if(error.name==="CastError"){
        return res.status(400).json({ message: 'invalid iD format' });
 
    }
    if(error.name==="TokenExpiredError"){
        return res.status(400).json({ message: 'unauthorized: your token has expired plss Login again' });
 
    }
    if (error.name === "JsonWebTokenError") {
        return res.status(401).json({ message: 'Unauthorized: token invalid.' });
      }
      console.log("unhandled error:", error);
     return res.status(500).json({ message: error });

    

    
    

}








