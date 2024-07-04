// models/community.js
const mongoose = require('mongoose');
const communitySchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    image:{
        type:String,
        required:true 
    },
});
const Community = mongoose.model('Community', communitySchema);

module.exports = Community;