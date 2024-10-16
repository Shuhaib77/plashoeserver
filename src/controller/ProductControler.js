import Products from "../model/productshema.js";

// export const createprdt = async (req, res) => {
//   const product = Products(req.body);
//   try {
//     await product.save();
//     res.status(200).json({ message: "product created", products: product });
//   } catch (error) {
//    return res.status(500).json(error.message);
//   }
// };


//find all product 

export const getproduct = async (req, res) => {

    const products = await Products.find();
    res.status(200).json({ message: "geted all product", products: products });
 
};


//find product by id
export const getproductbyid = async (req, res) => {
  const { id } = req.params;

  
    const product = await Products.findById(id);
    if (!product) {
     return res.status(404).json({ message: "item not found" });
    }
    res.status(200).json({ message: `${id}th user getted`, product });
 
};

//find product by catrogery

export const getproductbycatogery = async (req, res) => {

    const catogery = req.query.catogery;
    console.log(catogery);
    const product = await Products.find({catogery});
    if (!product) {
      return res.status(404).json({ message: "item not found" });
    }
    res
      .status(200)
      .json({ message: `${catogery}th user getted`, products: product });
 
};

//put update products

// export const putproduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const upproduct = await Products.findByIdAndUpdate(id, req.body, {
//       new: true,
//     });
//     if (!upproduct) {
//       return res.status(404).json({ message: "product not found" });
//     }
//     res.status(200).json({ message: "product updated", products: upproduct });
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };

//deleted products

// export const deleteproduct = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const deletedproduct = await Products.findByIdAndDelete(id);
//     if (!deletedproduct) {
//       return  res.status(404).json({ message: "item not found" });
//     }
//     res.status(200).json({ message: "item deleted successfull" });
//   } catch (error) {
//     return res.status(500).json(error.message);
//   }
// };
