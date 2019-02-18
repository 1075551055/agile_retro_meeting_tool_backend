const Comment = require('../models/comment')
const respond = require('../utils')
const {wrap: async} = require('co');

exports.create = function(req, res){
    try{
        let comment  = new Comment(req.body)
        comment.saveOrUpdate().then(result =>{
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
        res.json(respond.success)
    }catch(err){
        // todo: add log
        res.json(respond.error)
    }
})