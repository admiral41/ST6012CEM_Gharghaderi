// importing Packages
const express = require('express');
const getGeoLocation = require('./middlewares/getGeoLocation');
const dotenv = require('dotenv');
const connectToDB = require('./database/db');
const cors = require('cors');
const path = require('path'); // Import the 'path' module

// creating an express app
const app = express();
// configuring dotenv to use the .env file
app.use(getGeoLocation); // Use the middleware for all routes

dotenv.config();
const corsOptions = {
  origin:true,
  credentials: true,
  optionSuccessStatus: 200
};
app.use(cors(corsOptions));
// connecting to database
connectToDB();
// accepting json data
app.use(express.json());
// accepting form data
app.use(express.urlencoded({ extended: true }));
// Defining routes
app.use('/public/uploads', express.static(path.join(__dirname, 'public/uploads')));
// route for house
app.use('/public/houseDoc/images', express.static(path.join(__dirname, 'public/houseDoc/images')));
app.use('/public/houseDoc/pdfs', express.static(path.join(__dirname, 'public/houseDoc/pdfs')));
app.use('/public/plots', express.static(path.join(__dirname, 'public/plots')));

app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/community', require('./routes/communityRoutes'));
app.use('/api/houses', require('./routes/housesRoutes'));
app.use('/api/subscription', require('./routes/subscriptionRoutes'));
app.use('/api/contact', require('./routes/sendMailRoutes'));
app.use('/api/visitors', require("./routes/visitorRoutes"));
app.use('/api/plot', require('./routes/plotRoutes'));
// Defining port
const PORT = process.env.PORT;
// running the server on port 5000
app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`)
});
