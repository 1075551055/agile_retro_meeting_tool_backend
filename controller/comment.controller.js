const Comment = require('../models/comment')
const respond = require('../utils')
const {wrap: async} = require('co');
const socket_io = require('../socket_api')

exports.create = function(req, res){
    try{
        let comment  = new Comment(req.body)
        comment.saveOrUpdate().then(result =>{
            socket_io.sendNotificationWhenAddComment(result)
            res.json(respond.success)
        })
    }catch(err){
        //todo: log error
        res.json(respond.error)
    }
}

exports.loadCommentByCommentId = async (function* (req, res, next, commentId){
    try{
        req.comment = yield Comment.findByCommentId(commentId)
        if (!req.comment) return next(new Error('Comment not found'));
    }catch(err){
        console.log(err)
        // todo: add log
        return next(err)
    }
    next()
})

exports.update = async(function* (req, res){
    let comment = req.comment
    comment = Object.assign(comment, req.body)
    try{
        yield comment.saveOrUpdate()
        socket_io.sendNotificationWhenChangeCommentType({commentId: comment.commentId, commentType: comment.commentType})
        res.json(respond.success)
    }catch(err){
        // todo: add log
        res.json(respond.error)
    }
})

exports.loadCommentByMeetingId = async(function* (req, res, next, meetingId){
    try{
        req.allComments = yield Comment.loadAllCommentsByMeetingId(meetingId)
    }catch(err){
        console.log(err)
        return next(err)
    }
    next()
})

exports.index = function (req, res){
    try{
        // let allComments = yield Comment.loadAll()
        res.json(req.allComments)
    }catch(err){
        console.log(err)
        res.json(respond.error)
    }
}

exports.deleteCommentByCommentId = function(req, res){
    try{
        req.comment.delete().then(result => {
            if(result.ok != 0){
                socket_io.sendNotificationWhenDeleteComment(result.commentId)
                return res.json(respond.error)
            }
            res.json(respond.success)
        })
    }catch(err){
        console.log(err)
        next(err)
    }
}