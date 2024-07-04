const mongoose = require('mongoose');

// Define the schema for the Plot model
const plotSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  plotImage: [
    {
      type: String,
    },
  ],
  location: {
    type: String,
    required: true,
  },
  area: {
    type: String,
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
});

// Create the Plot model based on the plotSchema
const Plot = mongoose.model('Plot', plotSchema);

module.exports = Plot;
