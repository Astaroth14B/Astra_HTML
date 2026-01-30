const { exec } = require('child_process');

console.log('Attempting to find and kill process on port 3000...');

const cmd = process.platform === 'win32'
    ? 'netstat -ano | findstr :3000'
    : 'lsof -i :3000 -t';

exec(cmd, (err, stdout) => {
    if (err || !stdout) {
        console.log('No process found on port 3000.');
        return;
    }

    const lines = stdout.trim().split('\n');
    const pids = new Set();

    lines.forEach(line => {
        const parts = line.trim().split(/\s+/);
        const pid = parts[parts.length - 1];
        if (pid && !isNaN(pid)) pids.add(pid);
    });

    pids.forEach(pid => {
        console.log(`Killing process ${pid}...`);
        exec(`taskkill /F /PID ${pid}`, (kErr) => {
            if (kErr) console.log(`Failed to kill ${pid}: ${kErr.message}`);
            else console.log(`Successfully killed ${pid}`);
        });
    });
});
