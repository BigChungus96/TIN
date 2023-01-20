const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Customer = sequelize.define('Customer', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            len: {
                args: [2, 60],
                msg: "validationMessage.checkTextLengthRange"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            len: {
                args: [2, 60],
                msg: "validationMessage.checkTextLengthRange"
            },
        }
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            len: {
                args: [5, 60],
                msg: "validationMessage.checkTextLengthRange"
            },
            isEmail: {
                msg: "validationMessage.email"
            }
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "validationMessage.fieldRequired"
            },
            len: {
                args: [2, 60],
                msg: "validationMessage.checkTextLengthRange"
            }
        }
    }
});
module.exports = Customer;