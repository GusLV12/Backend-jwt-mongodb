import Product from "../models/products.js";

export const getProducts = async(req, res) => {
  const products = await Product.find();
  res.json(products);
}

export const getProductByID = async(req, res) => {
  const product = await Product.findById(req.params.id);
  res.status(200).json(product);
}

export const createProduct = async (req, res) => {
  const {name, category, price, imgURL} = req.body;
  const newProduct = new Product({ name, category, price, imgURL });
  const productSaved = await newProduct.save();
  res.json({ message: 'Creating product.', product: productSaved });
}

export const updateProductByID = async (req, res) => {
  const updatedProduct = await Product.findOneAndUpdate(req.params.id, req.body, { new: true });
  res.json(updatedProduct);
}

export const deleteProductByID = async(req, res) => {
  await Product.findByIdAndDelete(req.params.id);
  res.status(200).json({ message: 'Producto eliminado' });
}
