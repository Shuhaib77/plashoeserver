import Cart from "../model/cartschema.js";
import Products from "../model/productshema.js";
import Users from "../model/usermodel.js";

export const addtocart = async (req, res) => {
  //find user
  const userid = req.params.userid;
  const productid = req.params.productid;
  console.log(userid);
  console.log(productid);

  try {
    //finduser
    const user = await Users.findById(userid);
    console.log(user);

    if (!user) {
      res.status(404).json({ message: " user not found" });
    }
    const product = await Products.findById(productid);
    //findid
    console.log(product);
    if (!product) {
      res.status(404).json({ message: " product not found" });
    }

    //check item alredy exist in cart

    let cartitem = await Cart.findOne({
      userid: user._id,
      productid: product._id,
    });
    console.log(cartitem, "ddd");
    //createcart
    if (cartitem) {
      cartitem.quantity++;
      await cartitem.save();
      res.status(200).json({ message: "cartitem quantity increasess" });
    } else {
      cartitem = await Cart.create({
        userid: user._id,
        productid: product._id,
        quantity: 1,
      });
      //add to cart
      user.cart.push(cartitem._id);
      console.log(user.cart);

      await user.save();
      res.status(200).json({ message: "item add to cart successfull" });
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const viewusercart = async (req, res) => {
  const { userid } = req.params;
  try {
    const user = await Users.findById(userid).populate({
      path: "cart",
      populate: { path: "productid" },
    });
    if (!user) {
      res.status(404).json({ message: "user not found" });
    }
    if (!user.cart || user.cart.length == 0) {
      res.status(404).json({ message: "user cart is empty", data: [] });
    }
    res.status(200).json({ message: "cart viewdddd", data: user.cart });
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const incrcart = async (req, res) => {
  try {
    const { userid, productid } = req.params;

    const user = await Users.findById(userid);
    if (!user) {
      res.status(404).json({ message: "item not found" });
    }
    const product = await Products.findById(productid);
    if (!product) {
      res.status(404).json("product not found");
    }

    console.log(userid, "deff");
    console.log(productid, "cfrf");

    try {
      const cartitem = await Cart.findOne({
        userid: user._id,
        productid: product._id,
      });
      console.log(cartitem, "ibfrbf");
      if (!cartitem) {
        res.status(404).json({ message: "cartitem not found" });
      }
      cartitem.quantity++;
      await cartitem.save();
      res.status(200).json({ message: "quantity increasesss" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const decrcart = async (req, res) => {
  try {
    const { userid, productid } = req.params;
//find user
    const user = await Users.findById(userid);
    if (!user) {
      res.status(404).json({ message: "item not found" });
    }
    //find product
    const product = await Products.findById(productid);
    if (!product) {
      res.status(404).json({ message: "product noot found" });
    }
   
    try {
       //check product is in user cart
      const cartitem = await Cart.findOne({
        userid: user._id,
        productid: product._id,
      });

      if (!cartitem) {
        res.status(404).json({ message: "caritem not found" });
      }

      cartitem.quantity--;
      await cartitem.save();
      res.status(200).json({ message: "quantity decreasesss" });
    } catch (error) {
      res.status(500).json(error.message);
    }
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const deletecart=async(req,res)=>{
  const {userid,productid}=req.params

  try {
    const user=await Users.findById(userid)

    if(!user){
      res.status(404).json({message:"user not found"})
    }
    const product=Products.findById(productid)
    if(!product){
      res.status(404).json({message:'product not found'})

    }

    const deletecartitem= await Cart.findOneAndDelete({userid:user._id,productid:product._id})
    if(!deletecartitem){
      res.status(404).json({message:"cartitem not found"})
    }

    
  } catch (error) {
    
  }



}
