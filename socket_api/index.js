var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
    socket.on('meetingConnect', function(meetingId){
        console.log("meeting room id :" + meetingId);
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