const controller = require('../controllers/struct.controller');
const { authJwt } = require('../middleware');
const router = require('express').Router();

router.get('/', [ authJwt.verifyToken, authJwt.isUser ], controller.getAll);
router.get('/detail/:id', [ authJwt.verifyToken, authJwt.isUser ], controller.getByListId);
router.post('/create', [ authJwt.verifyToken, authJwt.isUser], controller.createStruct);
router.delete('/delete/:id', [ authJwt.verifyToken, authJwt.isUser], controller.deleteById);

module.exports = router;