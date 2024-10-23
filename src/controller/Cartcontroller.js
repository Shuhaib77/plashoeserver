import Cart from "../model/cartschema.js";
import Products from "../model/productshema.js";
import Users from "../model/usershema.js";

export const addtocart = async (req, res) => {
  //find user
  const userid = req.params.userid;
  const productid = req.params.productid;
  console.log(userid);
  console.log(productid);

  //finduser
  const user = await Users.findById(userid);
  console.log(user);

  if (!user) {
    return res.status(404).json({ message: " user not found" });
  }
  const product = await Products.findById(productid);
  //findid
  console.log(product);
  if (!product) {
    return res.status(404).json({ message: " product not found" });
  }

  //check item alredy exist in cart
  console.log(user._id,'sample userr');
  
console.log(product._id,'sample printin prodect ');

  let cartitem = await Cart.findOne({
    userid: user._id,
    productid: product._id,
  });
  //createcart


  console.log(product._id,'im suhaib ');
  
  if (cartitem) {
    cartitem.quantity++;
    await cartitem.save();
   return res.status(200).json({ message: "cartitem quantity increasess" });
  } else {
    cartitem = await Cart.create({
      userid: user._id,
      productid: product._id,
      quantity: 1,
    });
    //add to cart
    user.cart.push(cartitem._id);
console.log(user,'sample user');

    await user.save();
    return res.status(200).json({ message: "item add to cart successfull" });
  }
};

export const viewusercart = async (req, res) => {
  const { userid } = req.params;

  const user = await Users.findById(userid).populate({
    path: "cart",
    populate: { path: "productid" },
  });

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  if (!user.cart || user.cart.length == 0) {
    return res.status(404).json({ message: "user cart is empty", data: [] });
  }
  res.status(200).json({ message: "cart viewdddd", data: user.cart });
};

export const incrcart = async (req, res) => {
  const { userid, productid } = req.params;

  console.log(userid);
  console.log(productid);

  const user = await Users.findById(userid);
  if (!user) {
    return res.status(404).json({ message: "item not found" });
  }
  const product = await Products.findById(productid);

  if (!product) {
    return res.status(404).json("product not found");
  }

  console.log(userid, "deff");
  console.log(productid, "cfrf");

  const cartitem = await Cart.findOne({
    userid: user._id,
    productid: product._id,
  });
  console.log(cartitem, "ibfrbf");
  if (!cartitem) {
    return res.status(404).json({ message: "cartitem not found" });
  }
  cartitem.quantity++;
  await cartitem.save();
  res.status(200).json({ message: "quantity increasesss" });
};

export const decrcart = async (req, res) => {
  const { userid, productid } = req.params;
  console.log(userid);
  console.log(productid);
  //find user
  const user = await Users.findById(userid);

  if (!user) {
    return res.status(404).json({ message: "item not found" });
  }
  //find product
  const product = await Products.findById(productid);
  console.log(product);
  if (!product) {
    return res.status(404).json({ message: "product noot found" });
  }

  //check product is in user cart
  const cartitem = await Cart.findOne({
    userid: user._id,
    productid: product._id,
  });

  if (!cartitem) {
    return res.status(404).json({ message: "caritem not found" });
  }
  console.log(cartitem, "dede");

  cartitem.quantity--;
  await cartitem.save();
  res.status(200).json({ message: "quantity decreasesss" });
};

//delete cartt

export const deletecart = async (req, res) => {
  const { userid, productid } = req.params;

  const user = await Users.findById(userid);

  if (!user) {
    return res.status(404).json({ message: "user not found" });
  }
  const product = await Products.findById(productid);
  if (!product) {
    return res.status(404).json({ message: "product not found" });
  }

  const deletecartitem = await Cart.findOneAndDelete({
    userid: user._id,
    productid: product._id,
  });
  if (!deletecartitem) {
    return res.status(404).json({ message: "cartitem not found" });
  }

  const cartindex = await user.cart.findIndex((item) =>
    item.equals(deletecartitem._id)
  );
  if (cartindex !== -1) {
    user.cart.splice(cartindex, 1);
    await user.save();
    res.status(200).json({ message: "item deleted success" });
  }
  return res.status(404).json({ message: "item not deleted error occurs" });
};
