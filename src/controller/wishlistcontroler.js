import Wishlist from "../model/wishlistschema.js";
import Users from "../model/usershema.js";
import Products from "../model/productshema.js";

export const addtowishlist = async (req, res) => {
  const { productid } = req.params;
  const { userid } = req.params;
  
    const user = await Users.findById(userid);
    console.log(user);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }
    const product = await Products.findById(productid);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }
    console.log(productid), console.log(userid);

    let wishlistitem = await Wishlist.findOne({
      userid: user._id,
      productid: product._id,
    });

    if (wishlistitem) {
      return res.status(404).json({ message: "item alredy  in wishlist" });
    }
    wishlistitem = await Wishlist.create({
      userid: user._id,
      productid: product._id,
    });
    user.wishlist.push(wishlistitem._id);
    await user.save();
  return  res.status(200).json({ message: "item added to wishlist",wishlist:user.wishlist});

};

//wishlist view

export const wishlistview = async (req, res) => {
  const { userid } = req.params;

 
    const user = await Users.findById(userid).populate({
      path: "wishlist",
      populate: { path: "productid" },
    });

    if (!user) {
      return res.status(404).json({ message: "usr not found" });
    }
    // if (!user.wishlist || user.wishlist.length == 0) {
    //   return res
    //     .status(404)
    //     .json({ message: "usr wishlist is empty", data: [] });
    // }
   return res.status(200).json({message:"wishlist finded",wishlist:user.wishlist});
 
};

export const deletetewishlist = async (req, res) => {
  const { userid, productid } = req.params;


    const user = await Users.findById(userid);
    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const product = await Products.findById(productid);
    if (!product) {
      return res.status(404).json({ message: "product not found" });
    }

    const deletewishlist = await Wishlist.findOneAndDelete({productid:product._id,userid:user._id});
    const wishlistindex = user.wishlist.findIndex((item) =>
      item.equals(deletewishlist._id)
    );
    user.wishlist.splice(wishlistindex, 1);
    await user.save();
    res.status(200).json({ message: "item deleted successfull" });
  
};
