const Meeting = require('../models/meeting')
const respond = require('../utils')
const {wrap:async} = require('co')
exports.create = async(function* (req, res) {
    let meeting = new Meeting(req.body)
    try {
        yield meeting.saveOrUpdate().then(result => {
            let meetingIdObj = {meetingId: result.id}
            let respondObj = Object.assign(meetingIdObj, respond.success)
            return res.json(respondObj)
        })
        
    } catch(err){
        // todo: log error
        return res.json(respond.error)
    }
})

exports.load = async function(req, res, next, meetingId){
    try{
        let validatedMeetingId = Meeting.validateObjectId(meetingId)
        if(!validatedMeetingId){
            req.meeting = null
            return next()
        }
        await Meeting.load(meetingId).then(result => {
            req.meeting = result
        })
    }catch(err){
        // todo: log error
        return next(err)
    }
    next()
}

exports.index = function(req, res, next){
    if(req.meeting == null){
        return res.json(respond.modelNotExisting)
    }
    res.json(respond.modelExisting)
}
