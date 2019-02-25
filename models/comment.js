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
    createIodt: {
        type: Date,
        default: () => {
            return Date.now()
        }
    }
})

// object methods
CommentSchema.methods = {
    saveOrUpdate: function(){
        const err = this.validateSync()
        if(err && err.toString()) throw new Error(err.toString())
        return this.save()
    },
    delete: function(){
        return this.remove()
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

// field validation
CommentSchema.path('content').validate(function(item){
    return item.length <= 500;
}, 'The content maximum length is 500')

module.exports = dbConnection.model('Comment', CommentSchema)