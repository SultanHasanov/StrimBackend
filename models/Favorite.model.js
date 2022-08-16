const mongoose = require('mongoose')

const FavoriteSchema = mongoose.Schema({
    userId: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User',
    },
    products: [
        {
            productId: {
                type: mongoose.SchemaTypes.ObjectId,
                ref: 'Product',
            },
        },
    ],
})

const Favorite = mongoose.model('Favorite', FavoriteSchema)

module.exports = Favorite