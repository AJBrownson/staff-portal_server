const mongoose = require('mongoose')
const Schema = mongoose.Schema


const StaffSchema = Schema({
    data: {
        type: String,
        required: [true, 'Please scan in name']
    },
    
    comment: String,
    createdAt: {
        type: Date,
        default: Date()
    }
})

module.exports = mongoose.model('Staff', StaffSchema);