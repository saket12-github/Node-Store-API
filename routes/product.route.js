const express = require('express')
const Router = express.Router()
const { getAllProducts, createProduct, getSingleProduct, updateProduct, deleteProduct } = require('../controllers/product.controller')

Router.get('/products', getAllProducts)
Router.post('/products', createProduct)
Router.get('/products/:id', getSingleProduct)
Router.put('/products/:id', updateProduct)
Router.delete('/products/:id', deleteProduct)

module.exports = Router
