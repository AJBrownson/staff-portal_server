const mongoose = require('mongoose')
const Schema = mongoose.Schema


const UserSchema = Schema({
    userName: {
        type: String,
        required: [true, 'You need to enter your username']
    },
    password: {
        type: String,
        required: [true, 'You need to enter your password']
    }
})

module.exports = mongoose.model('User', UserSchema)