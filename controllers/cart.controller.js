const { set } = require('mongoose')
const Cart = require('../models/Cart.model.js')
const Product = require('../models/Product.model.js')

module.exports.cartController = {
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
            const { cartId } = req.params
            const { product } = req.body

            const setProduct = await Product.findById(product)

            if (setProduct.left < 1) {
                return res.json("Нет на складе")
            }

            await Cart.findByIdAndUpdate(cartId, {
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
            const { cartId } = req.params
            const { product } = req.body
            
            const setProduct = await Product.findById(product)
            const setCart = await Cart.findById(cartId)
            const setDeleteProduct = setCart.products.filter((el) => String(el.productId) === String(setProduct._id))
            const setProducts = setCart.products.filter((el) => String(el.productId) !== String(setProduct._id))
            
            await Product.findByIdAndUpdate(product, {
                
                left: setProduct.left + setDeleteProduct[0].amount
            })

            await Cart.findByIdAndUpdate(cartId, {
                products: setProducts
            })
            res.json("Успешно удалено")

        } catch (e) {
            res.json(e)
        }
    },
    productResetCart: async (req, res) => {
        try {
            const { cartId } = req.params
            
            const setCart = await Cart.findById(cartId)
            const setDeleteProduct = setCart.products
            
            res.json(setCart.products)
            setDeleteProduct.forEach(async(el) => {
                const setProduct0 = await Product.findById(el.productId)
                await Product.findByIdAndUpdate(el.productId, {
                    left: setProduct0.left + el.amount
                })
                console.log(setProduct0)

            });
            
            const nullArr = setCart.products.filter((el) => false)
            await Cart.findByIdAndUpdate(cartId, {
                products: nullArr
            })

            // res.json("Успешно добавлен в корзину")

        } catch (e) {
            res.json(e)
        }
    },
    productIncCart: async (req, res) => {
        try {
            const { cartId } = req.params
            const { product } = req.body

            const setCart = await Cart.findById(cartId)
            const setProduct = await Product.findById(product)

            if (setProduct.left < 1) {
                return res.json("Нет на складе")
            }

            const setProducts = setCart.products.map((el) => {
                if (String(el.productId) === String(setProduct._id)) {
                    el.amount += 1
                }
                // res.json(el.productId)
                return el
            })



            await Cart.findByIdAndUpdate(cartId, {
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
            const { cartId } = req.params
            const { product } = req.body

            const setCart = await Cart.findById(cartId)
            const setProduct = await Product.findById(product)

            const setProducts = setCart.products.map((el) => {
                if (String(el.productId) === String(setProduct._id)) {
                    el.amount -= 1
                    return el
                }
                // res.json(el.productId)
                return el
            })



            await Cart.findByIdAndUpdate(cartId, {
                products: setProducts
            })

            await Product.findByIdAndUpdate(product, {
                left: setProduct.left + 1
            })

            // res.json(setProducts)
            res.json(await Cart.findById(cartId))

            res.json('-')

        } catch (e) {
            res.json(e)
        }
    },

}

// { "name": "Rabek", "surname": "Rabekov", "phone": "8999999999-000", "icon": "srcggggggg", "login": "aleksej223", "password": "0369" }