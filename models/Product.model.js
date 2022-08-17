const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
        name: String,
        price: Number,
        category: String,
        left: Number,
        images: [
                mongoose.Schema({
                        color: String,
                        image: String,
                }),
        ],
        hit: {
                type: Boolean,
                default: false
        },
        size: String
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;