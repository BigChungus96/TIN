const CustomerRepository=require('../repository/sequelize/CustomerRepository');
const authUtil=require('../util/authUtils');

exports.login=(req,res,next)=>{
    const email=req.body.email;
    const password=req.body.password;
    CustomerRepository.findByEmail(email)
        .then(cus=>{
            if(!cus){
                res.render('index',{
                    navLocation:'',
                    loginError:"Nieprawidłowy adres email lub hasło 1"
                })
            }else if(authUtil.comparePasswords(password,cus.password)===true){
                req.session.loggedUser=cus;
                res.redirect('/');
            }else{
                res.render('index',{
                    navLocation:'',
                    loginError:"Nieprawidłowy adres email lub hasło 2"
                })
            }
        })
        .catch(err=>{
            console.log(err);
        });
}
exports.logout=(req,res,next)=>{
    req.session.loggedUser=undefined;
    res.redirect('/');
}