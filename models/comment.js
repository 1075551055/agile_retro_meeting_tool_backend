const mongoose = require('mongoose')
const Schema = mongoose.Schema
const dbConnection = require('./db')

let CommentSchema = new Schema({
    meetingId:{
        type: String,
        required:[true, "meeting id is required"]
    },
    commentId:{
        type: String,
        required:[true, "comment id is required"]
    },
    content:{
        type: String
    },
    commentType:{
        type: String,
        required:[true, "comment type is required"]
    },
})

// object methods
CommentSchema.methods = {
    saveOrUpdate: function(){
        const err = this.validateSync()
        if(err && err.toString()) throw new Error(err.toString())
        return this.save()
    }
}

// static methods
CommentSchema.statics = {
    findByCommentId: function(commentId){
        return this.findOne({commentId})
    },
    loadAllCommentsByMeetingId: function(meetingId){
        return this.find({meetingId})
    }
}

module.exports = dbConnection.model('Comment', CommentSchema)