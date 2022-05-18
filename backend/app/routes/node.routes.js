const controller = require('../controllers/node.controller');
const { authJwt } = require('../middleware');
const router = require('express').Router();

router.get('/detail/:id', [ authJwt.verifyToken, authJwt.isUser ], controller.getByListId);
router.post('/create', [ authJwt.verifyToken, authJwt.isUser], controller.createNode);
router.put('/update', [ authJwt.verifyToken, authJwt.isUser], controller.updateByListId);
router.delete('/delete/:id', [ authJwt.verifyToken, authJwt.isUser], controller.deleteById);

module.exports = router;