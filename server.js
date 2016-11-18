var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

http.listen(80,function(){
	console.log('started at 80');
});

app.use('/',express.static(__dirname + '/public'));

io.on('connection', function(socket){
  console.log('一个用户一连接');
  socket.on('disconnect',function(){
  	console.log('一个用户断开了连接');
  });

});



io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    console.log('message: ' + msg.msg + '///' + 'user: ' + msg.nickname);
    socket.broadcast.emit('chat message',msg);
  });
});

