const { Router } = require('express');
const router = Router();
const { productController } = require("../controllers/product.controller")
const authMiddleware = require("../middleware/auth.middleware")

router.post('/product', productController.addProduct);
router.get('/product', productController.getProducts);
router.patch('/product/:id', productController.patchProduct);
router.delete('/product/:id', productController.deleteProduct);


module.exports = router;