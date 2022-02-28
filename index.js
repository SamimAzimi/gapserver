const express = require("express");
const app = express();
const server = require("http").createServer(app);
const port = 3000;
const io = require("socket.io")(server);


var onlineUsers = []
io.sockets.on('connection', function (socket) {
    onlineUsers.push(socket.id)
    io.emit('userQuantity', "online User is " + onlineUsers.length)
    socket.on('message', function (msg) {
        // io.to(`${socketId}`).emit('message', msg);
        io.emit('recieveMessage', msg)

    });
    socket.on('connect', () => {
        io.emit('userQuantity', "User Connected ! online User is " + onlineUsers.length)
    })
    socket.on('disconnect', () => {
        for (var i = 0; i < onlineUsers.length; i++) {
            if (onlineUsers[i] === socket.id) {
                onlineUsers.splice(i, 1);
            }
        }
        io.emit('userQuantity', "User Disconnected ! online User is " + onlineUsers.length)
    })
});
server.listen(port, () => console.log("server running on port:" + port));
