const Product = require("../models/product");
const mongoose=require("mongoose")
const shortid = require("shortid");
const slugify = require("slugify");
const Category = require("../models/category");

// add product
exports.createProduct = (req, res) => {
  const slug = req.body.name.replace(/ /g, '-') +'-'+ Date.now();

  const product = new Product({
      _id: new mongoose.Types.ObjectId(),
      name: req.body.name,
      slug: slug,
      price: req.body.price,
      quantity: req.body.quantity,
      description: req.body.description,
      productPic: req.body.productPic,
      keyword: req.body.keyword,
      category: req.body.category
  });

  product.save()
  .then(product => {
      res.status(201).json({
          message: product
      });
  })
  .catch(er => {
      res.status(500).json({
          error: er
      });
  })
  
};

exports.getProductsBySlug = (req, res) => {
  const { slug } = req.body;
  Category.findOne({ slug: slug })
    .select("_id type")
    .exec((error, category) => {
      if (error) {
        return res.status(400).json({ error });
      }

      if (category) {
        Product.find({ category: category._id }).exec((error, products) => {
          if (error) {
            return res.status(400).json({ error });
          }

          if (category.type) {
            if (products.length > 0) {
              res.status(200).json({
                products,
                priceRange: {
                  under5k: 5000,
                  under10k: 10000,
                  under15k: 15000,
                  under20k: 20000,
                  under30k: 30000,
                },
                productsByPrice: {
                  under5k: products.filter((product) => product.price <= 5000),
                  under10k: products.filter(
                    (product) => product.price > 5000 && product.price <= 10000
                  ),
                  under15k: products.filter(
                    (product) => product.price > 10000 && product.price <= 15000
                  ),
                  under20k: products.filter(
                    (product) => product.price > 15000 && product.price <= 20000
                  ),
                  under30k: products.filter(
                    (product) => product.price > 20000 && product.price <= 30000
                  ),
                },
              });
            }
          } else {
            res.status(200).json({ products });
          }
        });
      }
    });
};

// get produce by productId
exports.getProductDetailsById = (req, res) => {
  const { productId } = req.params;
  if (productId) {
    Product.findOne({ _id: productId }).exec((error, product) => {
      if (error) return res.status(400).json({ error });
      if (product) {
        res.status(200).json({ product });
      }
    });
  } else {
    return res.status(400).json({ error: "Params required" });
  }
};

// delete produce by productId
exports.deleteProductById = (req, res) => {
  const  productId  = req.body.id;
  if (productId) {
    Product.deleteOne({ _id: productId }).exec((error, result) => {
      if (error) return res.status(400).json({ error });
      if (result) {
        res.status(202).json({ msg: "product deleted succesfully" });
      }
    });
  } else {
    res.status(400).json({ error: "Params required" });
  }
};


// update produce by productId
exports.updateProductById = (req, res) => {
  try {
    let id=req.params.id
    let updateData= req.body
    console.log(id)
    console.log(updateData)
    
    Product.findOneAndUpdate(id,{$set:updateData},{new:true})
    .then((data)=>{
    res.status(200).json(data)
    console.log("data update succfully");
})
.catch((err)=>{
        res.json({
            message:"data update faield"
    })
})
} catch (error) {
    console.log(error);
    
}
};


// get all products
exports.getProducts = async (req, res) => {
  const products = await Product.find({ createdBy: req.user._id })
    .select("_id name price quantity slug description productPictures category")
    .populate({ path: "category", select: "_id name" })
    .exec();

  res.status(200).json({ products });
};
