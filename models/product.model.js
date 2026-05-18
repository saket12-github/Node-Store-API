const mongoose = require('mongoose')

const productModel = new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter product name"]
    },
    price: {
        type: Number,
        required: [true, "Please enter price of the product"],
        default: 0
    },
    company: {
        type: String,
        enum: ['ikea', 'liddy', 'caressa', 'marcos']
    },
    featured: {
        type: Boolean,
        default: false
    },
},
    {
        timestamps: true
    })

module.exports = mongoose.model('Product', productModel);