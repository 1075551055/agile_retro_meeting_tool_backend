const express = require('express')
const router = express.Router()
const actionController = require('../controller/action.controller')

router.param('meetingId', actionController.loadActionByMeetingId)
router.post('/', actionController.create)
router.get('/:meetingId', actionController.index)
router.delete('/:actionId', actionController.destory)

module.exports = router