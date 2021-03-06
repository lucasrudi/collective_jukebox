var express 		= require('express')
	, routes		= require('./routes')
	, user 			= require('./routes/user')
	, junkebox 		= require('./routes/junkebox')
	, http 			= require('http')
	, path 			= require('path');

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', routes.index);



app.get('/api/v1/search/:q', junkebox.search);

app.get('/api/v1/room', junkebox.room);
app.post('/api/v1/room/playlist/add', junkebox.add);
app.post('/api/v1/room/playlist/clear', junkebox.clear);
app.post('/api/v1/room/playlist/stop', junkebox.stop);
app.post('/api/v1/room/playlist/play', junkebox.play);
app.post('/api/v1/room/playlist/skip', junkebox.skip);



var server = http.createServer(app);
server.listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});



// //REMOVE TO ADD SOCKETS SUPPORT.
// var io = require('socket.io').listen(server);

// io.sockets.on('connection', function (socket) {
//     socket.emit('message', { message: 'welcome to the chat' });
//     socket.on('send', function (data) {
//         io.sockets.emit('message', data);
//     });
//     setInterval(-function(){
//       socket.emit('message', { message: 'welcome to the chat' });
//     },500);
// });


