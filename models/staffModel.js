const mongoose = require('mongoose')
const Schema = mongoose.Schema


const StaffSchema = Schema({
    name: {
        type: String,
        required: [true, 'Please scan in name']
    },
    
    comment: String,
    createdAt: {
        type: Date,
        default: new Date()
    }
})

module.exports = mongoose.model('Staff', StaffSchema);