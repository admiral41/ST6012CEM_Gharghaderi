const Plot = require('../models/plot');
const upload = require('../middlewares/multipleDocs');
const path = require('path');
const fs = require('fs');

const addPlot = async (req, res) => {
    console.log(req.body);
    console.log(req.files);
    try {
        // Handle file uploads using the upload middleware
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ message: 'Error uploading files.', error: err.message });
            }

            // Extract data from request body
            const { name, location, area, price } = req.body;

            // Validate inputs
            if (!name || !location || !area || !price) {
                return res.status(400).send({ message: 'Name, location, area, and price are required.' });
            }

            // Handle plot image upload

            let plotImage = [];
            if (req.files && req.files.plotImage && req.files.plotImage.length > 0) {
                plotImage = req.files.plotImage.map(file => file.path);
            }
            // Create new plot instance
            const newPlot = new Plot({
                name,
                location,
                area,
                price,
                plotImage,
            });

            // Save the plot to the database
            await newPlot.save();

            // Send response
            res.status(200).send({ message: 'Plot added successfully', plot: newPlot });
        });
    } catch (error) {
        console.error('Error adding plot:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
const getAllPlots = async (req, res) => {
    try {
        const plots = await Plot.find();
        res.status(200).send({ plots });
    } catch (error) {
        console.error('Error fetching plots:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};

const getPlotById = async (req, res) => {
    const { id } = req.params;
    try {
        const plot = await Plot.findById(id);
        if (!plot) {
            return res.status(404).send({ message: 'Plot not found' });
        }
        res.status(200).send({ plot });
    } catch (error) {
        console.error('Error fetching plot:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
const deletePlotById = async (req,res)=>{
    try{
        
    }catch(error){
        console.error('Error deleting plot:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
}
module.exports = {
    addPlot,    
    getAllPlots,
    getPlotById
};
