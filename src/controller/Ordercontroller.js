import Users from "../model/usershema.js";

export const orderdetails=async(req,res)=>{

    const {id}=req.params
    if(!id){
        res.status(404).json({message:"userid not found"})
    }
    const user=await Users.findById(id).populate({
      path:"orders",
      populate:"productId"
    })
    if(!user){
        res.status(404).json({message:"user not found"})
    }
    if(!user.orders || user.orders.legth===0){
        res.status(404).json({message:"order is empty"})

    }
    res.status(200).json({message:"ordersss findedd",data:user})

    console.log(user);
  
  console.log(user.orders);
  
      
  }
