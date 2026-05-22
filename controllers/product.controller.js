const productModel = require('../models/product.model.js')

const getAllProducts = async (req, res) => {
    const { featured, company: companyName, name, sort, fields } = req.query;
    const queryObject = {};
    if (featured) {
        queryObject.featured = featured === 'true' ? true : false;
    }
    if (companyName) {
        queryObject.company = companyName;
    }
    if (name) {
        queryObject.name = { $regex: name, $options: 'i' };
    }
    console.log(queryObject);
    let products = productModel.find(queryObject);

    if (sort) {
        const sortList = sort.split(',').join(' ');
        products = products.sort(sortList)
    } else {
        products = products.sort('createdAt')
    }

    const limit = Number(req.query.limit) || 10;
    const page = Number(req.query.page) || 1;
    const skip = (page - 1) * limit;

    products = products.skip(skip).limit(limit);

    if (fields) {
        const fieldsList = fields.split(',').join(' ');
        products = products.select(fieldsList);
    }

    const allProducts = await products;

    res.status(200).json({
        success: true,
        message: "Products fetched successfully",
        nbHits: allProducts.length,
        data: allProducts
    });
}

const createProduct = async (req, res) => {
    const newProduct = await productModel.create(req.body);
    res.status(201).json({ message: 'Product created successfully', data: newProduct });
}

const getSingleProduct = async (req, res) => {
    const { id: productid } = req.params;
    const singleProduct = await productModel.find({ _id: productid });
    if (!singleProduct || singleProduct.length === 0) {
        return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
        success: true,
        message: "Product fetched successfully",
        data: singleProduct
    });
}
const updateProduct = async (req, res) => {
    const { id } = req.params;
    const updatedProduct = await productModel.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
    if (!updatedProduct) {
        return res.status(404).json({ message: "Product not found" })
    }
    res.status(200).json({
        success: true,
        message: "Product updated successfully",
        productUpdated: updatedProduct
    })
}
const deleteProduct = async (req, res) => {
    const { id: taskid } = req.params;
    const deletedProduct = await productModel.findByIdAndDelete({ _id: taskid });
    if (!deletedProduct) {
        return res.status(404).json({ message: 'Product not found' });
    }
    res.status(200).json({
        success: true,
        message: 'Product deleted successfully'
    });
}

module.exports = {
    getAllProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct
}