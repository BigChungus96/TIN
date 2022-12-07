const OrderRepository=require('../repository/sequelize/OrderRepository');

exports.getOrder=(req,res,next)=>{
    OrderRepository.getOrders()
        .then(order=>{
            res.status(200).json(car);
        })
        .catch(err=>{
            console.log(err);
        });
};

exports.getOrderById=(req,res,next)=>{
    const orderId=req.params.orderId;
    OrderRepository.getOrdersById(orderId)
        .then(order=>{
            if(!order){
                res.status(404).json({
                    message:'Order with id: '+orderId+' not found'
                })
            }else{
                res.status(200).json(order);
            }
        });
};

exports.createOrder=(req,res,next)=>{
    OrderRepository.createOrder(req.body)
        .then(newObj =>{
            res.status(201).json(newobj);
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        });
};

exports.updateOrder=(req,res,next)=>{
    const orderId=req.params.orderId;
    OrderRepository.updateOrder(orderId,req.body)
        .then(result=>{
            res.status(200).json({message: 'Order updated!',order:result});
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        })
}

exports.deleteOrder=(req,res,next)=>{
    const orderId=req.params.OrderId;
    OrderRepository.deleteOrder(orderId)
        .then(result=>{
            res.status(200).json({message:'Removed order',order:result});
        })
        .catch(err=>{
            if(!err.statusCode){
                err.statusCode=500;
            }
            next(err);
        });
};
