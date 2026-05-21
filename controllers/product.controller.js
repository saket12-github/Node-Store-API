const productModel = require('../models/product.model.js')

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await productModel.find({});
        res.status(200).json({
            mesage: "success",
            data: allProducts
        });
    } catch (error) {
        res.status(500).json({ Message: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const newProduct = await productModel.create(req.body);
        res.status(201).json({ message: 'Product created successfully', data: newProduct });
    } catch (error) {
        res.status(500).json({ Message: error.message })
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const { id: product_id } = req.params;
        const singleProduct = await productModel.find({ _id: product_id });
        if (!singleProduct) {
            return res.status(404).json({ Message: "Product not found" });
        }

        res.status(200).json({
            message: "success",
            data: singleProduct
        });
    } catch (error) {
        res.status(500).json({ Message: error.message });
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}