const Art = require('./models/Art');
const User = require('./models/User');

const fs = require('fs');

async function testArtRoute() {
    try {
        const art = await Art.findAll({
            include: [{
                model: User,
                as: 'uploader',
                attributes: ['username', 'profilePic', 'serialNumber']
            }]
        });

        const artWithUrls = art.map(item => {
            const val = item.get({ plain: true });
            if (val.imageUrl && !val.imageUrl.startsWith('http')) {
                val.imageUrl = `http://localhost:3000/uploads/${val.imageUrl}`;
            }
            if (val.uploader && val.uploader.profilePic && !val.uploader.profilePic.startsWith('http')) {
                val.uploader.profilePic = `http://localhost:3000${val.uploader.profilePic}`;
            }
            return val;
        });

        fs.writeFileSync('test_output_v2.json', JSON.stringify(artWithUrls, null, 2));
        console.log("Test output saved to test_output_v2.json");
        process.exit(0);
    } catch (err) {
        console.error("Test failed:", err);
        process.exit(1);
    }
}

testArtRoute();
