const express = require('express')
const router = express.Router()
const commentController = require('../controller/comment.controller')

router.param('commentId', commentController.loadCommentByCommentId)
router.param('meetingId', commentController.loadCommentByMeetingId)
router.post('/', commentController.create)
router.put('/:commentId', commentController.update)
router.get('/:meetingId', commentController.index)

module.exports = router