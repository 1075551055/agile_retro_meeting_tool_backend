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
