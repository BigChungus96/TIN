const express=require('express');
const router=express.Router();
const carController=require('../controllers/carController');
const authUtils = require("../util/authUtils");

router.get('/',carController.showCarList);
router.get('/add',authUtils.permitAuthenticatedUser,carController.showAddCarForm);
router.get('/edit/:carId',authUtils.permitAuthenticatedUser,carController.showEditCarForm);
router.get('/details/:carId',authUtils.permitAuthenticatedUser,carController.showCarDetails);

router.post('/add',authUtils.permitAuthenticatedUser,carController.addCar);
router.post('/edit',authUtils.permitAuthenticatedUser,carController.updateCar);
router.get('/delete/:carId',authUtils.permitAuthenticatedUser,carController.deleteCar);

module.exports=router;
