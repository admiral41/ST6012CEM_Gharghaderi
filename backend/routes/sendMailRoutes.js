const router = require('express').Router();
const { submitContactForm, scheduleVisitController } = require('../controllers/emailController');

router.post('/sendMail', submitContactForm);
router.post('/scheduleVisit', scheduleVisitController);

module.exports = router;
