//Nodeserver which will handle socket io connection
const io = require('socket.io')(8001)

const users = {};

io.on('connection', socket=>{
	//server listening incoming events kissne kissne join kiya ye io listen karga
	socket.on('new-user-joined', name=>{
		console.log("New user", name)
		users[socket.id] = name;
		socket.broadcast.emit('user-joined',name);
	});
	socket.on('send', message=>{
		socket.broadcast.emit('receive', {message: message, name: users[socket.id]})
	});
	
	socket.on("disconnect", message => {
		socket.broadcast.emit('left', users[socket.id]);
		delete users[socket.id];
  
});
	
})