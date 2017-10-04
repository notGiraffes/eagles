import openSocket from 'socket.io-client';
const  socket = openSocket('http://localhost:3001');


let io = {
	sendMessage: function(data) {
		socket.emit('newMessage', data);
	},

	updateChat: function(cb) {
		console.log('working');
		socket.on('updateChat', function(data) {
			cb(data);
		})
	},
	renderChat: function(data) {
		socket.emit('renderChat', data)
	}

}


// socket.on('test', function(data) {
// 	console.log('test is', data);
// 	cb(data);
// });

export { io };