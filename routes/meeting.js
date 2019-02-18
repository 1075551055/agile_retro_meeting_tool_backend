let express = require('express')
let router = express.Router()
let meetingController = require('../controller/meeting.controller')

router.param('meetingId', meetingController.load)
router.post('/', meetingController.create)
router.get('/:meetingId', meetingController.index)

module.exports = router