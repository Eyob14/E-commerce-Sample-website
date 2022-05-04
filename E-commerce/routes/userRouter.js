const { Router } = require('express');
const userController = require('../controllers/user.controller');
const productConroller = require('../controllers/productConroller');
const { requireAuth, isAdmin, checkUser } = require("../middleware/authMiddleware");
const router = Router();



router.get('/profile', requireAuth, userController.profile_get);

router.get('/profileUpdate', requireAuth, userController.profileUpdate_get)
router.post('/profileUpdate', requireAuth, userController.profileUpdate_post);

router.get('/detail/:id', requireAuth, productConroller.productDetail_get);

router.get('/buyProduct/:id', requireAuth, userController.buyProduct_get);
router.post('/buyProduct/:id', requireAuth, userController.buyProduct_post);


module.exports = router;