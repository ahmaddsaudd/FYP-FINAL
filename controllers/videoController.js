const fs = require("fs");
const { spawn } = require("child_process");
const io = require('socket.io-client');

const socket = io.connect('http://localhost:3000'); // Connecting to the server

exports.getVideo = (req, res) => {
    const { day, camera } = req.params;
    const path = `/Users/ahmedsaud/Documents/FYP/recordingswithdaydate/Day${day}/ReceptionViewFrontDeskch14/Ch14 20240311101200.mp4`;

    res.send(path); // Sending path for testing purposes, remove in production
    const stat = fs.statSync(path);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
        const parts = range.replace(/bytes=/, "").split("-");
        const start = parseInt(parts[0], 10);
        const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

        if (start >= fileSize) {
            res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
            return;
        }

        const chunksize = (end - start) + 1;
        const file = fs.createReadStream(path, { start, end });
        const head = {
            'Content-Range': `bytes ${start}-${end}/${fileSize}`,
            'Accept-Ranges': 'bytes',
            'Content-Length': chunksize,
            'Content-Type': 'video/mp4',
        };

        res.writeHead(206, head);
        file.pipe(res);
    } else {
        const head = {
            'Content-Length': fileSize,
            'Content-Type': 'video/mp4',
        };
        res.writeHead(200, head);
        fs.createReadStream(path).pipe(res);
    }
};

exports.getVideoFrames = (req, res) => {
    console.log("getting test video");
    const pythonProcess = spawn('python', ['script.py'])
    pythonProcess.stdout.on('data', (data) => {
        console.log(`Python output: ${data}`);
        socket.emit('video_frame', data.toString()); // Emit data to server
    });
    pythonProcess.stderr.on('data', (data) => {
        console.error(`Python error: ${data}`);
    });
    pythonProcess.on('close', (code) => {
        console.log(`Python process exited with code ${code}`);
    });
    res.send("hello");
};

exports.getStream = (req, res) => {
    try {
        const { feedNumber } = req.params;
        const videoPath = `/Users/ahmedsaud/Documents/FYP/recordingswithdaydate/Day1/MainGateViewFrontLeftch22/Ch22 20240311080000.mp4`;

        // Check if the video file exists
        if (fs.existsSync(videoPath)) {
            // Set appropriate headers for video streaming
            const stat = fs.statSync(videoPath);
            const fileSize = stat.size;
            const range = req.headers.range;

            // Prepare headers for partial content/streaming
            if (range) {
                const parts = range.replace(/bytes=/, "").split("-");
                const start = parseInt(parts[0], 10);
                const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
                const chunksize = (end - start) + 1;
                const file = fs.createReadStream(videoPath, { start, end });
                const head = {
                    'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                    'Accept-Ranges': 'bytes',
                    'Content-Length': chunksize,
                    'Content-Type': 'video/mp4',
                };

                res.writeHead(206, head);
                file.pipe(res);
            } else {
                const head = {
                    'Content-Length': fileSize,
                    'Content-Type': 'video/mp4',
                };
                res.writeHead(200, head);
                fs.createReadStream(videoPath).pipe(res);
            }
        } else {
            res.status(404).send('Video not found');
        }
    } catch (e) {
        console.error("Error fetching video stream:", e);
        res.status(500).send('Internal Server Error');
    }
};
