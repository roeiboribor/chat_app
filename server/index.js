const express = require('express');
const app = express();
const http = require('http');
const { Server } = require("socket.io");
const cors = require('cors');
const PORT = 3001;

app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origins: [
            "http://localhost:5173",
            "http://192.168.1.87",
        ]
    }
});

io.on("connection", (socket) => {
    console.log(`User is connected! ${socket.id}`);

    socket.on("send_message", (data) => {
        socket.broadcast.emit('receive_message', data);
    });
});

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});