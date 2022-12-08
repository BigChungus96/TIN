const Sequelize=require('sequelize');
const sequelize=require('../../config/sequelize/sequelize');

const Order=sequelize.define('Order',{
    _id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    customer_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Pole jest wymagane"
            }
        }
    },
    car_id:{
        type:Sequelize.INTEGER,
        allowNull:false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    dateFrom:{
        type:Sequelize.DATE,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Pole jest wymagane"
            },
        }
    },
    dateTo:{
        type:Sequelize.DATE,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Pole jest wymagane"
            },
        }
    },
    price:{
        type:Sequelize.DECIMAL(10,0),
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Pole jest wymagane"
            },
            len:{
                args:[0,1000000],
                msg:"Pole powinno być liczbą w zakresie od 0 do 1.000.000"
            },
            isNumeric:{
                msg:"Pole powinno zawierać liczbę"
            }
        }
    }
});
module.exports=Order;