import Product from "../models/products.js";


export const getProducts = async(req, res) => {
  const products = await Product.find();
  res.json(products)
}

export const getProductByID = (req, res) => {

}

export const createProduct = async (req, res) => {
  const {name, category, price, imgURL} = req.body;
  const newProduct = new Product(name, category, price, imgURL)
  const productSaved = await newProduct.save();
  res.json('Creating product.', productSaved);
}

export const updateProductByID = (req, res) => {
  
}

export const deleteProductByID = (req, res) => {
  
}