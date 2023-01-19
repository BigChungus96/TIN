const express=require('express');
const router=express.Router();
const customerController=require('../controllers/customerController');
const authUtils = require("../util/authUtils");

router.get('/',customerController.showCustomerList);
router.get('/add',authUtils.permitAuthenticatedUser,customerController.showAddCustomerForm);
router.get('/edit/:customerId',authUtils.permitAuthenticatedUser,customerController.showEditCustomerForm);
router.get('/details/:customerId',authUtils.permitAuthenticatedUser,customerController.showCustomerDetails);

router.post('/add',authUtils.permitAuthenticatedUser,customerController.addCustomer);
router.post('/edit',authUtils.permitAuthenticatedUser,customerController.updateCustomer);
router.get('/delete/:customerId',authUtils.permitAuthenticatedUser,customerController.deleteCustomer);

module.exports=router;
