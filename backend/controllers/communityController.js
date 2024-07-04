const Community = require('../models/community');
const upload = require('../middlewares/uploads');
const fs = require('fs'); // Import the file system module

// Controller to handle community creation
/**
 * @route DELETE /api/community/addCommunity
 * @desc Create a new community
 * @secure true
 */
const createCommunity = async (req, res) => {
  try {
    console.log(req.file);
    console.log(req.body);
    upload(req, res, async (err) => {
      if (err) {
        console.log(err);
        return res.status(400).send({ message: 'Error uploading image.', error: err.message });
      }

      const { name, location } = req.body;

      // Validate inputs
      if (!name || !location) {
        return res.status(400).send({ message: 'Name and location are required.' });
      }

      const image = req.file.path;

      // Create new community instance
      const newCommunity = new Community({ name, location, image });

      // Save the community to the database
      await newCommunity.save();

      // Send response
      return res.status(200).send({
        success: true,
         message: 'Community created successfully', 
         community: newCommunity });
    });
  } catch (error) {
    console.error('Error creating community:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Controller to handle community deletion
const deleteCommunity = async (req, res) => {
    try {
      const communityId = req.params.id;
  
      // Find the community by ID
      const community = await Community.findById(communityId);
  
      if (!community) {
        return res.status(404).send({ message: 'Community not found.' });
      }
  
      // Delete the community image from the uploads folder
      if (community.image) {
        fs.unlinkSync(community.image); // Remove the image file
      }
  
      // Delete the community from the database
      await Community.findByIdAndDelete(communityId);
  
      // Send response
      res.status(200).send({ message: 'Community deleted successfully' });
    } catch (error) {
      console.error('Error deleting community:', error);
      res.status(500).send({ message: 'Internal Server Error' });
    }
  };

// Controller to handle community editing
const editCommunity = async (req, res) => {
    try {
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).send({ message: 'Error uploading image.', error: err.message });
        }
  
        const communityId = req.params.id;
        const { name, location } = req.body;
  
        // Validate inputs
        if (!name || !location) {
          return res.status(400).send({ message: 'Name and location are required.' });
        }
  
        // Find the community by ID
        const community = await Community.findById(communityId);

        if (!community) {
          return res.status(404).send({ message: 'Community not found.' });
        }

        let image = community.image;

        if (req.file) {
          // Delete the existing image from the uploads folder
          if (community.image) {
            fs.unlinkSync(community.image); // Remove the image file
          }
  
          image = req.file.path;
        }

        // Update the community
        await Community.findByIdAndUpdate
          (communityId, { name, location, image }, { new: true });

        // Send response
        res.status(200).send({ message: 'Community updated successfully' });
      }
    );
  }
  catch (error) {
    console.error('Error updating community:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }

};
// Controller to get all communities
const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find();
    res.status(200).send({ communities });
  } catch (error) {
    console.error('Error getting communities:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};


// Controller to get a community by ID
const getCommunityByID = async (req, res) => {
  try {
    const communityId = req.params.id;
    const community = await Community.findById(communityId);
    
    if (!community) {
      return res.status(404).send({ message: 'Community not found.' });
    }

    res.status(200).send({ community });
  } catch (error) {
    console.error('Error getting community by ID:', error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};
module.exports = { createCommunity, deleteCommunity, editCommunity,getAllCommunities,getCommunityByID };
