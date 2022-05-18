const controller = require('../controllers/list.controller');
const { authJwt } = require('../middleware/index');
const router = require('express').Router();

router.get('/my-lists', [ authJwt.verifyToken, authJwt.isUser ], controller.getMyList);
router.get('/detail/:id', [ authJwt.verifyToken, authJwt.isUser ], controller.listDetail);
router.post('/create', [ authJwt.verifyToken, authJwt.isUser], controller.createNewList);
router.delete('/delete/:id', [ authJwt.verifyToken, authJwt.isUser], controller.deleteById);

module.exports = router;