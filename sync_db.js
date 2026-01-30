const sequelize = require('./config/database');
require('./models/User');
require('./models/Art');
require('./models/Review');

sequelize.sync({ alter: true })
    .then(() => {
        console.log('Database synced successfully');
        process.exit(0);
    })
    .catch(err => {
        console.error('Sync failed:', err);
        process.exit(1);
    });
