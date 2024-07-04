const mongoose = require("mongoose");

const houseSchema = new mongoose.Schema({
  houseName: {
    type: String,
  },
  community: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Community",
  },
  location: {
    type: String,
  },
  description: {
    type: String,
  },
  images: [
    {
      type: String,
    },
  ],
  price: {
    type: String,
  },
  propertyType: {
    type: String,
    enum: ["Type 1", "Type 2"],
  },
  propertySize: Number,
  bedrooms: Number,
  bathrooms: Number,
  garages: Number,
  garageSize: Number,
  yearBuilt: Number,
  propertyStatus: {
    type: String,
    enum: ["For Sale", "Sold","Booked"],
  },
  address: {
    type: String,
  },
  zipCode: {
    type: String,
  },
  city: {
    type: String,
  },
  propertyDocument: String,
  energyClass: {
    type: String,
  },
});

const House = mongoose.model("House", houseSchema);

module.exports = House;
