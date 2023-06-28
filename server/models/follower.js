const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    followers : [String],
    followering : [String],
    
})