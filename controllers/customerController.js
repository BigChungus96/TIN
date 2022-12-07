const CustomerRepository = require('../repository/sequelize/CustomerRepository');

exports.showCustomerList = (req, res, next) => {
    CustomerRepository.getCustomer()
        .then(customers => {
            res.render('pages/customer/list', {
                customers: customers,
                navLocation: 'customer'
            });
        });
}
exports.showAddCustomerForm = (req, res, next) => {
    res.render('pages/customer/form', {
        customer: {},
        pageTitle: 'New Customer',
        formMode: 'createNew',
        btnLabel: 'Add Customer',
        formAction: 'customer/add',
        navLocation: 'customer',
        validationErrors: []
    });
}

exports.showEditCustomerForm = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customer/form', {
                customer: customer,
                formMode: 'edit',
                pageTitle: 'Customer Editing',
                btnLabel: 'Edit Customer',
                formAction: '/customer/edit',
                navLocation: 'customer',
                validationErrors: []
            });
        });
}
exports.showCustomerDetails = (req, res, next) => {
    const customerId = req.params.customerId;
    CustomerRepository.getCustomerById(customerId)
        .then(customer => {
            res.render('pages/customer/form', {
                customer: customer,
                formMode: 'showDetails',
                pageTitle: 'Customer Details',
                formAction: '',
                navLocation: 'customer',
                validationErrors: []
            });
        });
}
exports.addCustomer=(req,res,next)=>{
    const customerData={...req.body};
    CustomerRepository.createCustomer(customerData)
        .then(result=>{
            res.redirect('/customer');
        })
        .catch(err => {
            res.render('pages/customer/form', {
                customer: customerData,
                pageTitle: 'Adding a customer',
                formMode: 'createNew',
                btnLabel: 'Add a customer',
                formAction: '/customer/add',
                navLocation: 'customer',
                validationErrors: err.details
            });
        });
};
exports.updateCustomer=(req,res,next)=>{
    const customerId=req.body._id;
    const customerData={...req.body};
    CustomerRepository.updateCustomer(customerId,customerData)
        .then(result=>{
            res.redirect('/customer');
        });
};
exports.deleteCustomer=(req,res,next)=>{
    const customerId=req.params.customerId;
    CustomerRepository.deleteCustomer(customerId)
        .then( ()=>{
            res.redirect('/customer');
        });
};

