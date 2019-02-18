const express = require('express')
const router = express.Router()
const commentController = require('../controller/comment.controller')

router.param('commentId', commentController.loadCommentByCommentId)
router.post('/', commentController.create)
router.put('/:commentId', commentController.update)

module.exports = router