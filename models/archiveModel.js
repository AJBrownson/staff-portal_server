const mongoose = require('mongoose')
const Schema = mongoose.Schema


const ArchivedSchema = Schema({
    data: {
        type: String,
        required: [true, 'Please scan in name']
    },
    comment: String,
    time: String,
    date: String
});

module.exports = mongoose.model('ArchivedStaff', ArchivedSchema, 'ArchivedStaff');