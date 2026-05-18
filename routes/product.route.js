const express = require('express')
const Router = express.Router()
const { getAllProducts, getAllProductsStatic } = require('../controllers/product.controller')

Router.get('/', getAllProducts)
Router.get('/static', getAllProductsStatic)

module.exports = Router
