const CarRepository = require('../repository/sequelize/CarRepository');

exports.showCarList = (req, res, next) => {
    CarRepository.getCar()
        .then(cars => {
            res.render('pages/car/list', {
                cars: cars,
                navLocation: 'car',
                pageTitle: req.__('car.list.pageTitle')
            });
        });
}
exports.showAddCarForm = (req, res, next) => {
    res.render('pages/car/form', {
        car: {},
        pageTitle: req.__('car.form.add.pageTitle'),
        formMode: 'createNew',
        btnLabel: req.__('car.form.add.btnLabel'),
        formAction: '/car/add',
        navLocation: 'car',
        validationErrors: []
    });
}
exports.showEditCarForm = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car/form', {
                car: car,
                formMode: 'edit',
                pageTitle: req.__('car.form.edit.pageTitle'),
                btnLabel: req.__('car.form.edit.btnLabel'),
                formAction: '/car/edit',
                navLocation: 'car',
                validationErrors: []
            });
        });
}
exports.showCarDetails = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.getCarById(carId)
        .then(car => {
            res.render('pages/car/form', {
                car: car,
                formMode: 'showDetails',
                pageTitle: req.__('car.form.details.pageTitle'),
                formAction: '',
                navLocation: 'car',
                validationErrors: []
            });
        });
}
exports.addCar = (req, res, next) => {
    const carData = {...req.body};
    CarRepository.createCar(carData)
        .then(result => {
            res.redirect('/car');
        })
        .catch(err => {
            res.render('pages/car/form', {
                car: carData,
                pageTitle: 'Adding a car',
                formMode: 'createNew',
                btnLabel: 'Add a car',
                formAction: '/car/add',
                navLocation: 'car',
                validationErrors: err.errors
            });
        });
};
exports.updateCar = (req, res, next) => {
    const carId = req.body._id;
    const carData = {...req.body};

    CarRepository.updateCar(carId, carData)
        .then(result => {
            res.redirect('/car');
        })
        .catch(err=>{
            res.render('pages/car/form', {
                car: carData,
                pageTitle: 'Updating a car',
                formMode: 'edit',
                btnLabel: 'Updating a car',
                formAction: '/car/edit',
                navLocation: 'car',
                validationErrors:err.errors
            });
        });
};
exports.deleteCar = (req, res, next) => {
    const carId = req.params.carId;
    CarRepository.deleteCar(carId)
        .then(() => {
            res.redirect('/car');
        });
};