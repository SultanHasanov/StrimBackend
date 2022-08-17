const { set } = require('mongoose')
const Cart = require('../models/Cart.model.js')
const Product = require('../models/Product.model.js')
const User = require('../models/User.model.js')

module.exports.cartController = {
    getCart: async (req, res) => {
        try {
            const { userId } = req.params
            const setUser = await User.findById(userId)
            const setCart = await Cart.find({
                userId: setUser._id
            })
            const setCartId = String(setCart[0]._id)
            res.json(await Cart.findById(setCartId))
        } catch (e) {
            res.json(e)
        }
    }, 
    postCart: async (req, res) => {
        try {
            const { userId } = req.params
            await Cart.create({
                userId
            })
            res.json('Корзина успешно создана')
        } catch (e) {
            res.json(e)
        }
    },
    productAddCart: async (req, res) => {
        try {
            const { userId } = req.params
            const setUser = await User.findById(userId)
            const setCart = await Cart.find({
                userId: setUser._id
            })
            const setCartId = String(setCart[0]._id)

            const { product } = req.body

            const setProduct = await Product.findById(product)

            if (setProduct.left < 1) {
                return res.json("Нет на складе")
            }

            await Cart.findByIdAndUpdate(setCartId, {
                $push: {
                    products: {
                        productId: product
                    }
                }
            })

            await Product.findByIdAndUpdate(product, {
                left: setProduct.left - 1
            })

            res.json("Успешно добавлен в корзину")

        } catch (e) {
            res.json(e)
        }
    },
    productDeleteCart: async (req, res) => {
        try {
            const { userId } = req.params
            const setUser = await User.findById(userId)
            const setCart = await Cart.find({
                userId: setUser._id
            })
            const setCartId = String(setCart[0]._id)

            const { product } = req.body
            
            const setProduct = await Product.findById(product)
            const setCart0 = await Cart.findById(setCartId)
            const setDeleteProduct = setCart0.products.filter((el) => String(el.productId) === String(setProduct._id))
            const setProducts = setCart0.products.filter((el) => String(el.productId) !== String(setProduct._id))
            
            await Product.findByIdAndUpdate(product, {
                
                left: setProduct.left + setDeleteProduct[0].amount
            })

            await Cart.findByIdAndUpdate(setCartId, {
                products: setProducts
            })
            res.json("Успешно удалено")

        } catch (e) {
            res.json(e)
        }
    },
    productResetCart: async (req, res) => {
        try {
            const { userId } = req.params
            const setUser = await User.findById(userId)
            const setCart = await Cart.find({
                userId: setUser._id
            })
            const setCartId = String(setCart[0]._id)
            
            const setCart0 = await Cart.findById(setCartId)
            const setDeleteProduct = setCart0.products
            
            setDeleteProduct.forEach(async(el) => {
                const setProduct0 = await Product.findById(el.productId)
                await Product.findByIdAndUpdate(el.productId, {
                    left: setProduct0.left + el.amount
                })

            });
            
            const nullArr = setCart0.products.filter((el) => false)
            await Cart.findByIdAndUpdate(setCartId, {
                products: nullArr
            })
            res.json('Корзина успешно очищена')

        } catch (e) {
            res.json(e)
        }
    },
    productIncCart: async (req, res) => {
        try {
            const { userId } = req.params
            const setUser = await User.findById(userId)
            const setCart = await Cart.find({
                userId: setUser._id
            })
            const setCartId = String(setCart[0]._id)

            const { product } = req.body

            const setCart0 = await Cart.findById(setCartId)
            const setProduct = await Product.findById(product)

            if (setProduct.left < 1) {
                return res.json("Нет на складе")
            }

            const setProducts = setCart0.products.map((el) => {
                if (String(el.productId) === String(setProduct._id)) {
                    el.amount += 1
                }
                return el
            })



            await Cart.findByIdAndUpdate(setCartId, {
                products: setProducts
            })

            await Product.findByIdAndUpdate(product, {
                left: setProduct.left - 1
            })

            // res.json(setProducts)
            res.json('+')

        } catch (e) {
            res.json(e)
        }
    },
    productDecCart: async (req, res) => {
        try {
            const { userId } = req.params
            const setUser = await User.findById(userId)
            const setCart = await Cart.find({
                userId: setUser._id
            })
            const setCartId = String(setCart[0]._id)

            const { product } = req.body

            const setCart0 = await Cart.findById(setCartId)
            const setProduct = await Product.findById(product)

            if (setCart0.left < 1) {
                return res.json("Нет на складе")
            }

            const setProducts = setCart0.products.map((el) => {
                if (String(el.productId) === String(setProduct._id)) {
                    el.amount -= 1
                    return el
                }
                return el
            })



            await Cart.findByIdAndUpdate(setCartId, {
                products: setProducts
            })

            await Product.findByIdAndUpdate(product, {
                left: setProduct.left + 1
            })

            res.json('-')

        } catch (e) {
            res.json(e)
        }
    },

}
