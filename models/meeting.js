const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dbConnection = require('./db')

let MeetingSchema = new Schema({
    meetingId:{
        type: String,
        required
    },
    meetingName:{
        type: String
    }
})

module.exports = dbConnection.model('Meeting', MeetingSchema)