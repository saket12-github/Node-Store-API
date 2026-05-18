const productModel = require('../models/product.model.js')

const getAllProductsStatic = async (req, res) => {
    res.status(200)
    res.send('Hello this is the Products static page')
}

const getAllProducts = async (req, res) => {
    res.status(200)
    res.send('This is the get all products screen')
}

module.exports = {
    getAllProducts, getAllProductsStatic
}