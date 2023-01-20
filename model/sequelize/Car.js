const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Car = sequelize.define('Car', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    carBrand: {
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
    },
    carModel: {
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
    year: {
        type: Sequelize.DECIMAL(10, 0),
        allowNull: true,
        validate: {
            len: {
                args: [4, 4],
                msg: "validationMessage.checkYearRange"
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
module.exports = Car;
