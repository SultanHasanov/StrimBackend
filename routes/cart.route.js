const { Router } = require('express');
const router = Router();
const { cartController } = require("../controllers/cart.controller");
const authMiddleware = require('../middleware/auth.middleware');

router.get('/cart/:userId', cartController.getCart);
router.post('/cart/:userId', cartController.postCart);
router.post('/cart/add/:userId',  cartController.productAddCart);
router.patch('/cart/inc/:userId', cartController.productIncCart);
router.patch('/cart/dec/:userId', cartController.productDecCart);
router.delete('/cart/delete/:userId', cartController.productDeleteCart)
router.delete('/cart/reset/:userId', cartController.productResetCart)

// router.patch('/cart', );


module.exports = router;