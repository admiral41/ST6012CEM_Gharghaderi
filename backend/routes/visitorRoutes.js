// server/routes/visitorRoutes.js
const router = require('express').Router();
const getGeoLocation = require('../middlewares/getGeoLocation');
const { trackVisitor, getVisitors } = require('../controllers/visitorController');

router.post('/track', getGeoLocation, trackVisitor);
router.get('/get', getVisitors);

module.exports = router;
