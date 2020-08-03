var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

//
const userController = require('../fyrest/controllers').user;
router.get('/api/user', userController.list);
router.get('/api/user/:id', userController.getById);
router.post('/api/user', userController.add);
router.put('/api/user/:id', userController.update);
router.delete('/api/user/:id', userController.delete);
router.post('/api/user/add_with_profile', userController.addWithProfile);

const profileController = require('../fyrest/controllers').profile;
router.get('/api/profile', profileController.list);
router.get('/api/profile/:id', profileController.getById);
router.post('/api/profile', profileController.add);
router.put('/api/profile/:id', profileController.update);
router.delete('/api/profile/:id', profileController.delete);


module.exports = router;
