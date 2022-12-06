const sequelize = require('./sequelize');

const Customer = require('../../model/sequelize/Customer');
const Car = require('../../model/sequelize/Car');
const Order = require('../../model/sequelize/Order');

module.exports = () => {
    Customer.hasMany(Order, {
        as: 'order',
        foreignKey: {name: 'customer_id', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Order.belongsTo(Customer, {as: 'customer', foreignKey: {name: 'customer_id', allowNull: false}});
    Car.hasMany(Order, {
        as: 'order',
        foreignKey: {name: 'car_id', allowNull: false},
        constraints: true,
        onDelete: 'CASCADE'
    });
    Order.belongsTo(Car, {as: 'car', foreignKey: {name: 'car_id', allowNull: false}});

    let allCustomer, allCar;
    return sequelize
        .sync({force: true})
        .then(() => {
            return Customer.findAll();
        })
        .then(customers => {
            if (!customers || customers.length === 0) {
                return Customer.bulkCreate([
                    {firstName: 'Jan', lastName: 'Kowalski', email: 'jan.kowalski@carrental.com'},
                    {firstName: 'Szymon', lastName: 'Godziek', email: 'szymon.godziek@carrental.com'},
                    {firstName: 'Aaron', lastName: 'Gwin', email: 'aaron.gwin@carrental.com'}
                ])
                    .then(() => {
                        return Customer.findAll();
                    });
            } else {
                return customers;
            }
        })
        .then(customers => {
            allCustomer = customers;
            return Car.findAll();
        })
        .then(cars => {
            if (!cars || cars.length === 0) {
                return Car.bulkCreate([
                    {carBrand: 'BMW', carModel: 'F82', year: '2018'},
                    {carBrand: 'Mercedes', carModel: 'W222', year: '2020'},
                    {carBrand: 'Nissan', carModel: 'R34', year: '1992'}
                ])
                    .then(() => {
                        return Customer.findAll();
                    });
            } else {
                return cars;
            }
        })
        .then(cars => {
            allCar = cars;
            return Order.findAll();
        })
        .then(orders => {
            if (!orders || orders.length === 0) {
                return Order.bulkCreate([
                    {
                        customer_id: allCustomer[0]._id,
                        car_id: allCar[0]._id,
                        dateFrom: '2022-02-02',
                        DateTo: '2022-02-22',
                        Price: 2000
                    },
                    {
                        customer_id: allCustomer[1]._id,
                        car_id: allCar[1]._id,
                        dateFrom: '2022-03-03',
                        DateTo: '2022-03-14',
                        Price: 3000
                    },
                    {
                        customer_id: allCustomer[0]._id,
                        car_id: allCar[2]._id,
                        dateFrom: '2022-03-15',
                        DateTo: '2022-03-18',
                        Price: 1500
                    },
                ]);
            } else {
                return orders;
            }
        });
};