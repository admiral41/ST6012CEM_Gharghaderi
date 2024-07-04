const router = require('express').Router();
const subscriptionController = require('../controllers/subscriptionController');

router.post('/addSubscriber', subscriptionController.addSubscription);
router.get('/getAllSubscribers', subscriptionController.getAllSubscriptions);
module.exports = router;
