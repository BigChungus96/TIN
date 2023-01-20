const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Order = sequelize.define('Order', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    customer_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            }
        }
    },
    car_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            }
        }
    },
    dateFrom: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
        }
    },
    dateTo: {
        type: Sequelize.DATE,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            isAfterFrom: function(dateTo) {
                if(this.dateFrom>dateTo){
                    throw new Error("validationMessage.dateDate");
                }
            }
        }
    },
    price: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            len: {
                args: [0, 6],
                msg: "validationMessage.numberRange"
            },
            min:{
                args:[0],
                msg: "validationMessage.negative"
            },
            isNumeric: {
                msg: "validationMessage.checkNumber"
            }
        }
    }
});
module.exports = Order;