const Sequelize = require('sequelize');

const Customer = require('../../model/sequelize/Customer');
const Car = require('../../model/sequelize/Car');
const Order = require('../../model/sequelize/Order');

exports.getOrders = () => {
    return Order.findAll({include: [
            {
                model: Customer,
                as: 'customer'
            },
            {
                model: Car,
                as: 'car'
            }]
    });
};
exports.getOrdersById = (orderId) => {
    return Order.findByPk(orderId, {include: [
            {
                model: Customer,
                as: 'customer'
            },
            {
                model: Car,
                as: 'car'
            }]
    });
};
exports.createOrder = (data) => {
    console.log(JSON.stringify(data));

    return Order.create({
        customer_id: data.customer_id,
        car_id: data.car_id,
        dateFrom: data.dateFrom,
        dateTo: data.dateTo,
        price: data.price
    });
};

exports.updateOrder = (orderId, data) => {
    return Order.update(data, {where: {_id: orderId}});
}

exports.deleteOrder = (orderId) => {
    return Order.destroy({
        where: {_id: orderId}
    });
}
exports.deleteManyOrder = (orderIds) => {
    return Order.find({_id: {[Sequelize.Op.in]: orderIds}})
}