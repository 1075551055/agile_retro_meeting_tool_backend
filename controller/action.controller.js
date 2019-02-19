const Action = require('../models/action')
const respond = require('../utils')
const {wrap: async} = require('co')

exports.create = function(req, res){
    try{
        let action  = new Action(req.body)
        action.saveOrUpdate().then(result => {
            res.json(respond.success)
        })
    }catch(err){
        console.log(err)
        res.json(respond.error)
    }
}

exports.loadActionByMeetingId = async(function* (req, res, next, meetingId){
    try{
        req.allActions = yield Action.loadAllActionsByMeetingId(meetingId)
    }catch(err){
        console.log(err)
        next(err)
    }
    next()
})

exports.index = function(req, res){
    res.json(req.allActions)
}