const OrderRepository = require('../repository/sequelize/OrderRepository');
const CarRepository = require('../repository/sequelize/CarRepository');
const CustomerRepository = require('../repository/sequelize/CustomerRepository');

exports.showOrderList = (req, res, next) => {
    OrderRepository.getOrder()
        .then(orders=>{
            res.render('pages/order/list',{
                orders:orders,
                navLocation:'order'
            });
        });
}
exports.showAddOrderForm = (req, res, next) => {
    let allCustomers, allCars;
    CustomerRepository.getCustomer()
        .then(customers => {
            allCustomers = customers;
            return CarRepository.getCar();
        })
        .then(cars => {
            allCars = cars;
            res.render('pages/order/form', {
                order: {},
                formMode: 'createNew',
                allCustomers: allCustomers,
                allCars: allCars,
                pageTitle: 'New Order',
                btnLabel: 'Add Order',
                formAction: '/order/add',
                navLocation: 'order',
                validationErrors: []
            });
        });
}
exports.showEditOrderForm=(req,res,next)=>{
    const orderId=req.params.orderId;
    let allCustomers,allCars;
    CustomerRepository.getCustomer()
        .then(customers=>{
            allCustomers=customers;
            return CarRepository.getCar();
        })
        .then(cars=>{
            allCars=cars;
            return OrderRepository.getOrderById(orderId)
        })
        .then(order=>{
            res.render('pages/order/form',{
                order:order,
                formMode:'edit',
                allCustomers: allCustomers,
                allCars: allCars,
                pageTitle:'Order Editing',
                btnLabel:'Edit Order',
                formAction:'/order/edit',
                navLocation:'order',
                validationErrors: []
            });
        });
}
exports.showOrderDetails = (req, res, next) => {
    const orderId=req.params.orderId;
    let allCustomers,allCars;
    CustomerRepository.getCustomer()
        .then(customers=>{
            allCustomers=customers;
            return CarRepository.getCar();
        })
        .then(cars=>{
            allCars=cars;
            return OrderRepository.getOrderById(orderId)
        })
        .then(order=>{
            res.render('pages/order/form',{
                order:order,
                formMode:'showDetails',
                allCustomers: allCustomers,
                allCars: allCars,
                pageTitle:'Order Details',
                formAction:'',
                navLocation:'order',
                validationErrors: []
            });
        });
}
exports.addOrder=(req,res,next)=>{
    const orderData={...req.body};
    let allCustomers,allCars;

    CustomerRepository.getCustomer()
        .then(customers=>{
            allCustomers=customers;
            return CarRepository.getCar();
        })
        .then(cars=>{
            allCars=cars;
            return OrderRepository.createOrder(orderData)
        })
        .then(result=>{
            res.redirect('/order');
        })
        .catch(err => {
            res.render('pages/order/form', {
                order: orderData,
                pageTitle: 'Adding an order',
                formMode: 'createNew',
                allCustomers: allCustomers,
                allCars: allCars,
                btnLabel: 'Add an order',
                formAction: '/order/add',
                navLocation: 'order',
                validationErrors: err.errors
            });
        });
};
exports.updateOrder=(req,res,next)=>{
    const orderId=req.body._id;
    const orderData={...req.body};
    let allCustomers,allCars;

    CustomerRepository.getCustomer()
        .then(customers=>{
            allCustomers=customers;
            return CarRepository.getCar();
        })
        .then(cars=>{
            allCars=cars;
            return OrderRepository.updateOrder(orderId,orderData)
        })
        .then(result=>{
            res.redirect('/order');
        })
        .catch(err=>{
            res.render('pages/order/form', {
                order: orderData,
                allCustomers: allCustomers,
                allCars: allCars,
                pageTitle: 'Updating an order',
                formMode: 'edit',
                btnLabel: 'Updating an order',
                formAction: '/order/edit',
                navLocation: 'order',
                validationErrors: err.errors
            });
        });
};

exports.deleteOrder=(req,res,next)=>{
    const orderId=req.params.orderId;
    OrderRepository.deleteOrder(orderId)
        .then(()=>{
            res.redirect('/order');
        });
};

