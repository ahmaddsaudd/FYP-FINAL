// const express = require('express');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const session = require('express-session');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// require('dotenv').config();


// const authRoutes = require('./routes/authRoutes');
// const videoRoutes = require('./routes/videoRoutes');
// const pythonRoutes = require('./routes/pythonRoutes');


// require('./config/passport')(passport);

// const app = express();


// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(cors());
// app.use(session({
//     secret: 'secret',
//     resave: false,
//     saveUninitialized: true
// }));
// app.use(passport.initialize());
// app.use(passport.session());


// // mongoose.connect(process.env.MONGO_URI, {
// //     useNewUrlParser: true,
// //     useUnifiedTopology: true
// // }).then(() => console.log('MongoDB connected'))
// //   .catch(err => console.log(err));


// app.use('/api/auth', authRoutes);
// app.use('/api/video', videoRoutes);
// app.use('/api/python',pythonRoutes);

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
// const express = require('express');
// const http = require('http');
// const socketIo = require('socket.io');

// const app = express();
// const server = http.createServer(app);
// const io = socketIo(server);

// app.get('/', (req, res) => {
//     res.sendFile(__dirname + '/index.html');
// });

// io.on('connection', (socket) => {
//     console.log('a user connected');
//     socket.on('video_frame', (frame) => {
//         io.emit('video_frame', frame);
//     });
//     socket.on('disconnect', () => {
//         console.log('user disconnected');
//     });
// });

// const port = 3000;
// server.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// });


const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server, {
    cors: {
        origin: "*", // allow all origins
        methods: ["GET", "POST"]
    }
});

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
