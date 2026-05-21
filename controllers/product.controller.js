const productModel = require('../models/product.model.js')

const getAllProducts = async (req, res) => {
    try {
        const { featured, company: companyName } = req.query;
        const queryObject = {};
        if (featured) {
            queryObject.featured = featured === 'true' ? true : false;
        }
        if (companyName) {
            queryObject.company = companyName;
        }
        console.log(queryObject);
        const allProducts = await productModel.find(queryObject);

        res.status(200).json({
            success: true,
            message: "Products fetched successfully",
            nbHits: allProducts.length,
            data: allProducts
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const createProduct = async (req, res) => {
    try {
        const newProduct = await productModel.create(req.body);
        res.status(201).json({ message: 'Product created successfully', data: newProduct });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}

const getSingleProduct = async (req, res) => {
    try {
        const { id: productid } = req.params;
        const singleProduct = await productModel.find({ _id: productid });
        if (!singleProduct) {
            return res.status(404).json({ message: "Product not found" });
        }

        res.status(200).json({
            success: true,
            message: "Product fetched successfully",
            data: singleProduct
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
}
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedProduct = await productModel.findByIdAndUpdate(id);
        if (!updatedProduct) {
            return res.status(404).json({ message: "Product not found" })
        }
        res.status(200).json({
            success: true,
            message: "Product updated successfully",
            productUpdated: updatedProduct
        })
    } catch (error) {
        res.status(500).json({ success: false, message: error.message })
    }
}
const deleteProduct = async (req, res) => {
    try {
        const { id: taskid } = req.params;
        await productModel.findByIdAndDelete({ _id: taskid });
        if (!taskid) {
            return res.status(404).json({ message: 'Product not found' });
        }
        res.status(200).json({
            success: true,
            message: 'Product deleted successfully'
        });

    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}