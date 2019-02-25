var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;
var log = require('log4js').getLogger("socketapi");

io.on('connection', function(socket){
    log.debug('A user connected');
    socket.on('disconnect', function(){
        log.debug('user disconnected');
    });
    socket.on('meetingConnect', function(meetingId){
        log.info("meeting room id :" + meetingId);
        socket.join(meetingId);
    })
})

socketApi.sendNotificationWhenAddComment = function(commentData){
    io.to(commentData.meetingId).emit('ADDCOMMENT', commentData);
}

socketApi.sendNotificationWhenDeleteComment = function(commentId){
    io.emit('DELETECOMMENT', commentId);
}

socketApi.sendNotificationWhenChangeCommentType = function(commentData){
    io.to(commentData.meetingId).emit('CHANGECOMMENTTYPE', commentData);
}

module.exports = socketApi;