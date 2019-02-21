var socket_io = require('socket.io');
var io = socket_io();
var socketApi = {};

socketApi.io = io;

io.on('connection', function(socket){
    console.log('A user connected');
    socket.on('disconnect', function(){
        console.log('user disconnected');
    });
})

socketApi.sendNotificationWhenAddComment = function(commentData){
    io.emit('ADDCOMMENT', commentData);
}

socketApi.sendNotificationWhenDeleteComment = function(commentId){
    io.emit('DELETECOMMENT', commentId);
}

socketApi.sendNotificationWhenChangeCommentType = function(commentData){
    io.emit('CHANGECOMMENTTYPE', commentData);
}

module.exports = socketApi;