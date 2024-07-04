// server/middleware/geoLocationMiddleware.js
const fetch = require('node-fetch');
const requestIp = require('request-ip');

async function getGeoLocation(req, res, next) {
  try {
    const ip = requestIp.getClientIp(req);
    const response = await fetch(`http://ip-api.com/json/${ip}`);
    const geoData = await response.json();
    req.geoData = geoData;
    req.ipAddress = ip;
    next();
  } catch (error) {
    res.status(500).json({ message: 'Error getting geolocation data', error });
  }
}

module.exports = getGeoLocation;
