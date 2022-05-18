const controller = require('../controllers/operation.controller');
const { authJwt } = require('../middleware');
const router = require('express').Router();

router.get('/detail/:id', [ authJwt.verifyToken, authJwt.isUser ], controller.getByCodeId);
router.post('/create', [ authJwt.verifyToken, authJwt.isUser], controller.createOperation);
router.put('/update', [ authJwt.verifyToken, authJwt.isUser], controller.updateByCodeId);

module.exports = router;