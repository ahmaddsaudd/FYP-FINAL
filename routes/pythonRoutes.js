const express = require('express');
const router = express.Router();
const { spawn } = require('child_process');

router.get('/', (req,res)=>{
    const pythonProcess = spawn('python3', ['script.py', 'arg12', 'arg22']);
    pythonProcess.stdout.on('data', (data) => {
        console.log(`stdout: ${data}`);
    });
    
    // Handling stderr (standard error) from the Python process
    pythonProcess.stderr.on('data', (data) => {
        console.error(`stderr: ${data}`);
    });
    
    // Handling the close event when the process ends
    pythonProcess.on('close', (code) => {
        console.log(`Child process exited with code ${code}`);
        res.send("python process completed")
    });
});

module.exports = router;
