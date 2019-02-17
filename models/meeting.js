const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dbConnection = require('./db')

let MeetingSchema = new Schema({
    // meetingId:{
    //     type: String,
    //     unique: true,
    //     required: [true, "Meeting id is required"]
    // },
    meetingName:{
        type: String,
        default: "agile retro meeting"
    },
    createIodt: {
        type: Date,
        default: () => {
            return Date.now()
        }
    }
})

// object methods
MeetingSchema.methods = {
    saveOrUpdate: function(callBack){
        const err = this.validateSync();
        if(err && err.toString()) throw new Error(err.toString())
        // return promise
        return this.save(callBack)
    }
}

// static method: no state
MeetingSchema.statics = {
    load: function(meetingId){
        return this.findOne({meetingId})
    },
    list: function(callBack){
        return this.find({}, callBack)
    }
}

module.exports = dbConnection.model('Meeting', MeetingSchema)