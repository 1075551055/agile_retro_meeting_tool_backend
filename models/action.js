const mongoose = require('mongoose')
const dbConnection = require('./db')
const Schema = mongoose.Schema

const ActionSchema = new Schema({
    actionId:{
        type:String,
        required:[true, 'action id is required']
    },
    meetingId:{
        type:String,
        required:[true, 'meeting id is required']
    },
    actionContent:{
        type:String
    }
})

// object method
ActionSchema.methods= {
    saveOrUpdate: function(){
        return this.save()
    }
}

// static method
ActionSchema.statics = {
    loadAllActionsByMeetingId: function(meetingId){
        return this.find({meetingId})
    },
    deleteByActionId: function(actionId){
        return this.remove({actionId})
    }
}

module.exports = dbConnection.model('Action', ActionSchema)