const controller = require('../controllers/auth.controller');
const { authValidation } = require('../middleware/index');
const router = require('express').Router()
const { authJwt } = require('../middleware');

router.post('/signup', [ authValidation.checkUsernameAndEmail, authValidation.checkRolesExisted ], controller.signup);
router.post('/signin', controller.signin);
router.get('/my-detail', [ authJwt.verifyToken, authJwt.isUser], controller.myUserDetail);

module.exports = router;