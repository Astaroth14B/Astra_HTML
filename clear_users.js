const User = require('./models/User');
const sequelize = require('./config/database');

async function clearUsers() {
    try {
        await sequelize.authenticate();
        console.log('Database connection established.');

        // Delete dependent records first to avoid foreign key constraints
        const Review = require('./models/Review');
        const Art = require('./models/Art');

        console.log('Clearing Reviews...');
        await Review.destroy({ where: {} });

        console.log('Clearing Arts...');
        await Art.destroy({ where: {} });

        console.log('Clearing Users...');
        await User.destroy({ where: {} });

        console.log('✅ All users and their data cleared from the database.');

        process.exit(0);
    } catch (error) {
        console.error('❌ Error clearing users:', error);
        process.exit(1);
    }
}

clearUsers();
