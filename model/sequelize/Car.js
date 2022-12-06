const Sequelize=require('sequelize');
const sequelize=require('../../config/sequelize/sequelize');

const Car=sequelize.define('Car',{
    _id:{
        type:Sequelize.INTEGER,
        autoIncrement:true,
        allowNull:false,
        primaryKey:true
    },
    carBrand:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Pole jest wymagane"
            },
            len:{
                args:[2,60],
                msg:"Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    carModel:{
        type:Sequelize.STRING,
        allowNull:false,
        validate:{
            notEmpty:{
                msg:"Pole jest wymagane"
            },
            len:{
                args:[2,60],
                msg:"Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    year:{
        type:Sequelize.DECIMAL(10,0),
        allowNull:true,
        validate:{
          len:{
            args:[4,4],
            msg:"Pole powinno zawierać 4 cyfry"
          }
        }
    }
});
module.exports=Car;