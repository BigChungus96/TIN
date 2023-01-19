const Customer = require("../../model/sequelize/Customer");
const Car = require("../../model/sequelize/Car");
const Order = require("../../model/sequelize/Order");
const authUtils=require("../../util/authUtils");
exports.getCustomer = () => {
    return Customer.findAll();
};

exports.getCustomerById = (customerId) => {
    return Customer.findByPk(customerId, {
        include: [
            {
                model: Order,
                as: 'order',
                include: [{
                    model: Car,
                    as: 'car'
                }]
            }]
    });
};

exports.createCustomer = (newCustomerData) => {
    return Customer.create({
        firstName: newCustomerData.firstName,
        lastName: newCustomerData.lastName,
        email: newCustomerData.email,
        password:authUtils.hashPassword(newCustomerData.password)
    });
};

exports.updateCustomer = (customerId, customerData) => {
    const firstName = customerData.firstName;
    const lastName = customerData.lastName;
    const email = customerData.email;
    customerData.password=authUtils.hashPassword(customerData.password);
    return Customer.update(customerData, {where: {_id: customerId}});
};

exports.deleteCustomer = (customerId) => {
    return Customer.destroy({
        where: {_id: customerId}
    });
};

exports.findByEmail=(email)=>{
    return Customer.findOne({
        where: {email:email}
    });
}