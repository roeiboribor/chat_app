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
        origin: [
            "http://localhost:5173/"
        ]
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});