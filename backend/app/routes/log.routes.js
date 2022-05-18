const controller = require('../controllers/log.controller');
const { authJwt } = require('../middleware');
const router = require('express').Router();

router.get('/all', [ authJwt.verifyToken, authJwt.isUser ], controller.getAll);
router.get('/detail/:id', [ authJwt.verifyToken, authJwt.isUser ], controller.getByCodeId);
router.post('/create', [ authJwt.verifyToken, authJwt.isUser], controller.createLog);
router.put('/update', [ authJwt.verifyToken, authJwt.isUser], controller.updateByCodeId);

module.exports = router;