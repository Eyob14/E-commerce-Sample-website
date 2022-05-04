const { Router } = require('express');
const productController = require('../controllers/productConroller.js')
const { requireAuth, isAdmin, checkUser } = require("../middleware/authMiddleware");
const router = Router();


router.get('/', productController.productList_get);
router.get('/product', [requireAuth, isAdmin], productController.product_get);
router.post('/product',[requireAuth, isAdmin], productController.product_post);


module.exports = router;