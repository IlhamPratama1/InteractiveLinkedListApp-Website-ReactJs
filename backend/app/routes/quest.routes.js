const controller = require('../controllers/quest.controller');
const { authJwt } = require('../middleware');
const router = require('express').Router();

router.get('/all', [ authJwt.verifyToken, authJwt.isUser ], controller.getAllQuest);
router.get('/my-quest', [ authJwt.verifyToken, authJwt.isUser ], controller.getMyQuest);
router.post('/create', [ authJwt.verifyToken, authJwt.isUser], controller.createNewQuest);
router.put('/update', [ authJwt.verifyToken, authJwt.isUser], controller.updateById);
router.delete('/delete/:id', [ authJwt.verifyToken, authJwt.isUser], controller.deleteById);

module.exports = router;