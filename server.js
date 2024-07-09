const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const authRoutes = require("./routes/authRoutes");


const connectDB = require("./dbConnect");

connectDB();

const app = express();
app.use(express.json()); // Middleware to parse JSON bodies

const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // allow all origins
        methods: ["GET", "POST"]
    }
});

app.use('/auth',authRoutes);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('video_frame', (frame) => {
        console.log('Received video frame');
        io.emit('video_frame', frame); // Broadcasting the received frame to all connected clients
    });
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
