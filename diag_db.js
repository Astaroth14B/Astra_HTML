const User = require('./models/User');
const sequelize = require('./config/database');

async function diag() {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');

        const users = await User.findAll();
        console.log(`Found ${users.length} users.`);
        users.forEach(u => {
            console.log(`ID: ${u.id}, Username: ${u.username}, Email: ${u.email}, EmailHash: ${u.emailHash}, Verified: ${u.isVerified}`);
        });

        // Try to manually sync if alter failed
        // await sequelize.sync({ alter: true });
        // console.log('Sync successful');
    } catch (error) {
        console.error('Diagnostic Failed:', error);
    } finally {
        await sequelize.close();
    }
}

diag();
