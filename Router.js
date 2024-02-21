const express = require('express');
const router = express.Router();

const userController = require('./Controllers/UserController');
// const productController = require('./Controllers/ProductController');
// const clientController = require('./Controllers/ClientController');


// colocar os controllers



// rotas do user

router.get('/GetUsers', userController.readAll);

router.get('/GetOneUser/:id', userController.read);

router.get('/findOneUser/:email', userController.find);

router.post('/NewUser', userController.create);

router.post('/UserLogin', userController.login);

router.put('/updateUser/:id', userController.update);

router.delete('/DeleteUser/:id', userController.delete);

// rotas do client


// rotas dos produtos




module.exports = router;