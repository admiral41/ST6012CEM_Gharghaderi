const router = require('express').Router();
const communityController = require('../controllers/communityController');
const checkAdmin = require('../middlewares/checkAdmin');

router.post('/addCommunity', checkAdmin, communityController.createCommunity);
router.delete('/deleteCommunity/:id',checkAdmin, communityController.deleteCommunity);
router.put('/editCommunity/:id',checkAdmin, communityController.editCommunity);
router.get('/getAllCommunities', communityController.getAllCommunities);
router.get('/getCommunityByID/:id', communityController.getCommunityByID);
module.exports = router;
