const User = require('./models/User');
const { decrypt } = require('./utils/cryptoUtils');

async function check() {
    const users = await User.findAll();
    users.forEach(u => {
        try {
            const dec = u.emailIv ? decrypt(u.email, u.emailIv) : u.email;
            console.log(`User: ${u.username}, Email: ${dec}, Verified: ${u.isVerified}, Code: ${u.verificationCode}`);
        } catch (e) {
            console.log(`User: ${u.username}, Email: [Encrypted/Error], Verified: ${u.isVerified}`);
        }
    });
    process.exit(0);
}

check();
