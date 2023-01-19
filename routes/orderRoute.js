const express=require('express');
const router=express.Router();
const orderController=require('../controllers/orderController');
const authUtils = require("../util/authUtils");

router.get('/',orderController.showOrderList);
router.get('/add',authUtils.permitAuthenticatedUser,orderController.showAddOrderForm);
router.get('/edit/:orderId',authUtils.permitAuthenticatedUser,orderController.showEditOrderForm);
router.get('/details/:orderId',authUtils.permitAuthenticatedUser,orderController.showOrderDetails);

router.post('/add',authUtils.permitAuthenticatedUser,orderController.addOrder);
router.post('/edit',authUtils.permitAuthenticatedUser,orderController.updateOrder);
router.get('/delete/:orderId',authUtils.permitAuthenticatedUser,orderController.deleteOrder);

module.exports=router;
