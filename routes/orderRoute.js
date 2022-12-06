const express=require('express');
const router=express.Router();
const orderController=require('../controllers/orderController');

router.get('/',orderController.showOrderList);
router.get('/add',orderController.showAddOrderForm);
router.get('/edit/:orderId',orderController.showEditOrderForm);
router.get('/details/:orderId',orderController.showOrderDetails);

router.post('/add',orderController.addOrder);
router.post('/edit',orderController.updateOrder);
router.get('/delete/:orderId',orderController.deleteOrder);

module.exports=router;
