
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');

try {
    const envPath = path.resolve(__dirname, '.env');
    if (!fs.existsSync(envPath)) {
        console.log(".env file not found at", envPath);
        process.exit(0);
    }

    const content = fs.readFileSync(envPath, 'utf8');
    const lines = content.split('\n');

    console.log("Found .env keys:");
    lines.forEach(line => {
        const trimmed = line.trim();
        if (!trimmed || trimmed.startsWith('#')) return;
        const eqIdx = trimmed.indexOf('=');
        if (eqIdx > 0) {
            const key = trimmed.substring(0, eqIdx);
            const val = trimmed.substring(eqIdx + 1);
            const masked = val.length > 3 ? val.substring(0, 3) + '...' : '***';
            console.log(`${key}: ${masked}`);
        }
    });

} catch (err) {
    console.error("Error reading .env:", err);
}
