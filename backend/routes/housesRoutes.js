const router = require('express').Router();
const housesController = require('../controllers/housesController');
const checkAdmin = require('../middlewares/checkAdmin');

router.post('/addHouses',checkAdmin, housesController.addHouse);
router.delete('/deleteHouses/:id',checkAdmin, housesController.deleteHouse);
router.get('/getHouses/:id', housesController.getHouseByID);
router.get('/getAllHouses', housesController.getAllHouses);
router.get('/getHousesByCommunity/:communityId', housesController.getHousesByCommunity);
module.exports = router;
