let express = require('express')
let router = express.Router()
let meetingController = require('../controller/meeting.controller')

router.post('/', meetingController.create)

module.exports = router