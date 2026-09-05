
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');
const path = require('path');
const https = require('https');

// 1. Read .env
let clientId = "";
let clientSecret = "";

try {
    const envPath = path.resolve(__dirname, '.env');
    if (fs.existsSync(envPath)) {
        const content = fs.readFileSync(envPath, 'utf8');
        content.split('\n').forEach(line => {
            const trimmed = line.trim();
            if (!trimmed || trimmed.startsWith('#')) return;
            const eqIdx = trimmed.indexOf('=');
            if (eqIdx > 0) {
                const key = trimmed.substring(0, eqIdx);
                let val = trimmed.substring(eqIdx + 1);

                // Strip quotes if present
                if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
                    val = val.substring(1, val.length - 1);
                }

                if (key === 'NEXT_PUBLIC_SPOTIFY_CLIENT_ID_DEV') clientId = val;
                if (key === 'SPOTIFY_CLIENT_SECRET_DEV' || key === 'NEXT_PUBLIC_SPOTIFY_SECRET_DEV') clientSecret = val;
            }
        });
    }
} catch (err) {
    console.error("Error reading .env:", err);
}

if (!clientId || !clientSecret) {
    console.error("Missing credentials in .env");
    process.exit(1);
}

console.log("Testing Token Fetch with:");
console.log("Client ID:", clientId.substring(0, 4) + "...");
console.log("Secret:", clientSecret.substring(0, 4) + "...");

// 2. Fetch Token
const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
const postData = 'grant_type=client_credentials';

const options = {
    hostname: 'accounts.spotify.com',
    path: '/api/token',
    method: 'POST',
    headers: {
        'Authorization': `Basic ${auth}`,
        'Content-Type': 'application/x-www-form-urlencoded',
        'Content-Length': postData.length
    }
};

const req = https.request(options, (res) => {
    console.log(`STATUS: ${res.statusCode}`);
    let data = '';
    res.on('data', (chunk) => data += chunk);
    res.on('end', () => {
        console.log('BODY:', data);
        if (res.statusCode === 200) {
            console.log("SUCCESS: Got access token!");
        } else {
            console.log("FAILURE: Request failed.");
        }
    });
});

req.on('error', (e) => console.error(`problem with request: ${e.message}`));
req.write(postData);
req.end();
