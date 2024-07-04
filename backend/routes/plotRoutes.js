const router = require('express').Router();
const plotController = require('../controllers/plotController');
const checkAdmin = require('../middlewares/checkAdmin');

router.post('/addPlot',checkAdmin, plotController.addPlot);
router.get('/getPlots', plotController.getAllPlots);
router.get('/plots/:id', plotController.getPlotById);
module.exports = router;
