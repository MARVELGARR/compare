
const vars = [
    "SPOTIFY_CLIENT_ID",
    "SPOTIFY_CLIENT_SECRET",
    "NEXT_PUBLIC_SPOTIFY_CLIENT_ID_DEV",
    "SPOTIFY_CLIENT_SECRET_DEV",
    "NEXT_PUBLIC_SPOTIFY_SECRET_DEV"
];

console.log("Checking Environment Variables:");
vars.forEach(v => {
    const val = process.env[v];
    if (val) {
        console.log(`${v}: Exists (Starts with ${val.substring(0, 3)}...)`);
    } else {
        console.log(`${v}: Missing`);
    }
});
