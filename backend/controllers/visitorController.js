// server/controllers/visitorController.js
const Visitor = require('../models/visitor');

const trackedIPs = new Map();

async function trackVisitor(req, res) {
  try {
    const { ipAddress, geoData } = req;

    // Check if the IP address has been tracked recently
    const lastTrackedTime = trackedIPs.get(ipAddress);
    if (lastTrackedTime && Date.now() - lastTrackedTime < 60000) {
      // Skip tracking if within the last minute
      return res.status(400).json({ message: 'Visitor already tracked recently' });
    }

    const newVisitor = new Visitor({
      ip: ipAddress,
      country: geoData.country,
      city: geoData.city,
      timestamp: new Date(),
    });

    await newVisitor.save();

    // Update last tracked timestamp for the IP address
    trackedIPs.set(ipAddress, Date.now());

    res.status(201).json({ message: 'Visitor tracked successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error tracking visitor', error });
  }
}

async function getVisitors(req, res) {
  try {
    const visitors = await Visitor.find({});
    res.status(200).json(visitors);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching visitors', error });
  }
}

module.exports = {
  trackVisitor,
  getVisitors,
};
