const express = require("express");

const {
  requireSignin,
  adminMiddleware,
  uploadS3
} = require("../common-middleware");
const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
  deleteProductById,
  getProducts,
  updateProductById
} = require("../controller/product");
const multer = require("multer");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");

const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, path.join(path.dirname(__dirname), "uploads"));
  },
  filename: function(req, file, cb) {
    cb(null, shortid.generate() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// route for product get
router.get("/product/:productId", getProductDetailsById);
router.post(
  "/product/getProducts",
  requireSignin,
  adminMiddleware,
  getProducts
);

// route for product add
router.post(
  "/product/create",
  requireSignin,
  adminMiddleware,
  uploadS3.array("productPicture"),
  createProduct
);

// route for product delete
router.delete(
  "/product/deleteProductById",
  requireSignin,
  adminMiddleware,
  deleteProductById
);

// route for product update
router.put(
  "/product/updateProductById/:id",
  // requireSignin,
  // adminMiddleware,
  updateProductById
);


module.exports = router;
