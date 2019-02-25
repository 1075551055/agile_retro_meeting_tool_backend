const Action = require('../models/action')
const respond = require('../utils')
const {wrap: async} = require('co')
const log =  require('log4js').getLogger("actionContoller");

exports.create = function(req, res){
    try{
        let action  = new Action(req.body)
        action.saveOrUpdate().then(result => {
            res.json(respond.success)
        })
    }catch(err){
        log.error("create action went wrong:", err)
        res.json(respond.error)
    }
}

exports.loadActionByMeetingId = async(function* (req, res, next, meetingId){
    try{
        req.allActions = yield Action.loadAllActionsByMeetingId(meetingId)
    }catch(err){
        log.error("loadActionByMeetingId went wrong:", err)
        next(err)
    }
    next()
})

exports.index = function(req, res){
    res.json(req.allActions)
}

exports.destory = function(req, res){
    try{
        let actionId =req.params.actionId
        Action.deleteByActionId(actionId).then(result => {
            if(result.ok != 1){
                res.json(respond.error)
            }
            res.json(respond.success)
        })
    }catch(err){
        log.error("destory action went wrong:", err)
        res.json(respond.error)
    }
}