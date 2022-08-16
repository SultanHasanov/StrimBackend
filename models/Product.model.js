const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
        name: String,
        price: Number,
        category: String,
        left: Number,
        image: String,
        hit: Boolean,
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;