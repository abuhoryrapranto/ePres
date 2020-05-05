const express = require('express');
const authentication = require('../authentication');
const router = express.Router();

const controller = require('../controllers/usersController');

router.post('/saveUser', controller.saveUser);
router.get('/getAllUsers', authentication.auth, controller.getAllUsers);
router.get('/getUser/:id', authentication.auth, controller.getUser);
router.put('/updateUser/:id', authentication.auth, controller.updateUser);
router.post('/login', controller.userLogin);

module.exports = router;