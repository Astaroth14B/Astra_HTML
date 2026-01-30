const User = require('./models/User');
const sequelize = require('./config/database');

async function promoteToAdmin() {
    try {
        await sequelize.authenticate();
        console.log('Database connected.');

        // Find the user by partial match or just get the first non-admin user
        const users = await User.findAll();

        if (users.length === 0) {
            console.log('No users found in database.');
            process.exit(1);
        }

        // Promote the first user found
        const user = users[0];
        user.isAdmin = true;
        await user.save();

        console.log(`SUCCESS: User '${user.username}' (ID: ${user.id}) is now an ADMIN.`);
        process.exit(0);
    } catch (error) {
        console.error('Error promoting user:', error);
        process.exit(1);
    }
}

promoteToAdmin();
