const Art = require('./models/Art');
const User = require('./models/User');

const fs = require('fs');

async function diagnose() {
    try {
        const artworks = await Art.findAll();
        const users = await User.findAll();

        const result = {
            totalArtworks: artworks.length,
            totalUsers: users.length,
            artworks: artworks.map(a => ({
                id: a.id,
                title: a.title,
                userSerial: a.userSerial
            })),
            users: users.map(u => ({
                id: u.id,
                username: u.username,
                serialNumber: u.serialNumber
            }))
        };

        fs.writeFileSync('diag_output.json', JSON.stringify(result, null, 2));
        console.log("Diagnostic data saved to diag_output.json");
        process.exit(0);
    } catch (err) {
        console.error("Diagnosis failed:", err);
        process.exit(1);
    }
}

diagnose();
