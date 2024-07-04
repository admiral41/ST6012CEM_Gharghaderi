const House = require('../models/houses');
const Community = require('../models/community');
const upload = require('../middlewares/multipleDocs');
const path = require('path');
const fs = require('fs'); // Import the file system module

const addHouse = async (req, res) => {
    console.log(req.body);
    try {
        // Handle file uploads using the upload middleware
        upload(req, res, async (err) => {
            if (err) {
                return res.status(400).send({ message: 'Error uploading files.', error: err.message });
            }

            // Extract data from request body
            const { houseName, community, location, description, price, propertyType, propertySize, bedrooms, bathrooms, garages, garageSize, yearBuilt, propertyStatus, address, zipCode, city, energyClass } = req.body;


            // Find the community by ID
            const communityFound = await Community.findById(community);
            if (!communityFound) {
                return res.status(404).send({ message: 'Community not found.' });
            }

            // Handle multiple images
            let images = [];
            if (req.files && req.files.images && req.files.images.length > 0) {
                images = req.files.images.map(file => file.path);
            }

            // Handle property document upload
            let propertyDocument = '';
            if (req.files && req.files.propertyDocument && req.files.propertyDocument.length > 0) {
                propertyDocument = path.join('public', 'houseDoc', 'pdfs', req.files.propertyDocument[0].filename);
                // Move the uploaded PDF file to the designated folder
                await fs.renameSync(req.files.propertyDocument[0].path, propertyDocument);
            }
            // Validate inputs
            if (!houseName || !community || !location || !description || !price || !propertyType || !propertySize || !bedrooms || !bathrooms || !garages || !garageSize || !yearBuilt || !propertyStatus || !address || !zipCode || !city || !energyClass || !propertyDocument || !images) {
                return res.status(400).send({ message: 'All fields are required.' });
            }
            // Create new house instance
            const newHouse = new House({
                houseName,
                community,
                location,
                description,
                images,
                price,
                propertyType,
                propertySize,
                bedrooms,
                bathrooms,
                garages,
                garageSize,
                yearBuilt,
                propertyStatus,
                address,
                zipCode,
                city,
                propertyDocument,
                energyClass
            });

            // Save the house to the database
            await newHouse.save();

            // Send response
            res.status(200).send({ message: 'House added successfully', house: newHouse });
        });
    } catch (error) {
        console.error('Error adding house:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
const deleteHouse = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the house by ID
        const house = await House.findById(id);
        if (!house) {
            return res.status(404).send({ message: 'House not found.' });
        }

        // Remove images and property document files from the server
        house.images.forEach(async (imagePath) => {
            await fs.unlinkSync(path.join(__dirname, '..', imagePath));
        });
        if (house.propertyDocument) {
            await fs.unlinkSync(path.join(__dirname, '..', house.propertyDocument));
        }

        // Delete the house from the database
        await House.findByIdAndDelete(id);

        // Send response
        res.status(200).send({ message: 'House deleted successfully.' });
    } catch (error) {
        console.error('Error deleting house:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
const getHouseByID = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the house by ID
        const house = await House.findById(id);
        if (!house) {
            return res.status(404).send({ message: 'House not found.' });
        }

        // Send the house details in the response
        res.status(200).send({ message: 'House found.', house });
    } catch (error) {
        console.error('Error getting house by ID:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
const getAllHouses = async (req, res) => {
    try {
        // Retrieve all houses from the database
        const houses = await House.find();

        // Send the list of houses in the response
        res.status(200).send({ message: 'All houses retrieved successfully', houses });
    } catch (error) {
        console.error('Error getting all houses:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
const getHousesByCommunity = async (req, res) => {
    try {
        const { communityId } = req.params;

        // Find houses by community ID
        const houses = await House.find({ community: communityId });

        // Send the list of houses in the response
        res.status(200).send({ message: 'Houses found by community ID', houses });
    } catch (error) {
        console.error('Error getting houses by community ID:', error);
        res.status(500).send({ message: 'Internal Server Error' });
    }
};
module.exports = { addHouse, deleteHouse, getHouseByID, getAllHouses, getHousesByCommunity };
