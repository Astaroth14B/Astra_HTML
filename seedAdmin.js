const { Sequelize } = require('sequelize');
const sequelize = require('./config/database');
const User = require('./models/User');

const seedAdmin = async () => {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Change this username to the user you want to be admin
        const targetUsername = process.argv[2];

        if (!targetUsername) {
            console.log('Please provide a username to promote to admin. Usage: node seedAdmin.js <username>');
            process.exit(1);
        }

        const user = await User.findOne({ where: { username: targetUsername } });

        if (!user) {
            console.log(`User '${targetUsername}' not found.`);
            process.exit(1);
        }

        user.isAdmin = true;
        await user.save();

        console.log(`SUCCESS: User '${targetUsername}' is now an ADMIN.`);
        process.exit(0);
    } catch (error) {
        console.error('Error seeding admin:', error);
        process.exit(1);
    }
};

seedAdmin();
