const CustomerRepository = require('../repository/sequelize/CustomerRepository');

exports.showCustomerList = (req, res, next) => {
    CustomerRepository.getCustomer()
        .then(customers => {
            res.render('pages/customer/list', {
                customers: customers,
                navLocation: 'customer',
                pageTitle: req.__('cus.list.pageTitle')
            });
        });
}
exports.showAddCustomerForm = (req, res, next) => {
    res.render('pages/customer/form', {
        customer: {},
        pageTitle: req.__('cus.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('cus.form.add.btnLabel'),
        formAction: '/customer/add',
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
                pageTitle: req.__('cus.form.edit.pageTitle'),
                btnLabel: req.__('cus.form.edit.btnLabel'),
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
                pageTitle: req.__('cus.form.details.pageTitle'),
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
                pageTitle: req.__('cus.form.add.pageTitle'),
                formMode: 'createNew',
                btnLabel: req.__('cus.form.add.btnLabel'),
                formAction: '/customer/add',
                navLocation: 'customer',
                validationErrors: err.errors
            });
        });
};
exports.updateCustomer=(req,res,next)=>{
    const customerId=req.body._id;
    const customerData={...req.body};
    CustomerRepository.updateCustomer(customerId, customerData)
        .then(result=>{
            res.redirect('/customer');
        })
        .catch(err=>{
            res.render('pages/customer/form', {
                customer: customerData,
                pageTitle: req.__('cus.form.edit.pageTitle'),
                formMode: 'edit',
                btnLabel: req.__('cus.form.edit.btnLabel'),
                formAction: '/customer/edit',
                navLocation: 'customer',
                validationErrors: err.errors
            });
        });
};
exports.deleteCustomer=(req,res,next)=>{
    const customerId=req.params.customerId;
    CustomerRepository.deleteCustomer(customerId)
        .then( ()=>{
            res.redirect('/customer');
        });
};

