const mongoose = require('mongoose')
const Schema = mongoose.Schema


const StaffSchema = Schema({
    data: {
        type: String,
        required: [true, 'Please scan in name']
    },
    comment: String,
    time: String,
    date: String
});

module.exports = mongoose.model('Staff', StaffSchema, 'Staff');