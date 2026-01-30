const User = require('./models/User');
const sequelize = require('./config/database');

async function check() {
    try {
        const users = await User.findAll({ where: { isAdmin: true } });
        console.log('ADMIN USERS FOUND:', users.length);
        users.forEach(u => {
            console.log(`- ${u.username} (ID: ${u.id}, Serial: ${u.serialNumber}, isAdmin: ${u.isAdmin})`);
        });
    } catch (err) {
        console.error('DIAGNOSTIC FAILED:', err);
    } finally {
        process.exit();
    }
}

check();
