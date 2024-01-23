const mongoose = require('mongoose');

const userSchema = new mon.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    }
},{
    timeStanps: true
});

const User = mongoose.model('User', userSchema);

module.exports = User;