const { Router } = require('express');
const router = Router();
const { cartController } = require("../controllers/cart.controller");
const authMiddleware = require('../middleware/auth.middleware');

router.post('/cart/:userId', cartController.postCart);
router.patch('/cart/add/:cartId', authMiddleware, cartController.productAddCart);
router.patch('/cart/inc/:cartId', authMiddleware, cartController.productIncCart);
router.patch('/cart/dec/:cartId', authMiddleware, cartController.productDecCart);
router.patch('/cart/delete/:cartId', authMiddleware, cartController.productDeleteCart)
router.patch('/cart/reset/:cartId', authMiddleware, cartController.productResetCart)

// router.patch('/cart', );


module.exports = router;