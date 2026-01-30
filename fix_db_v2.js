const sequelize = require('./config/database');

async function fix() {
    try {
        await sequelize.authenticate();
        console.log('Connected.');

        const [columns] = await sequelize.query("SHOW COLUMNS FROM Users");
        const columnNames = columns.map(c => c.Field);
        console.log('Current columns:', columnNames.join(', '));

        const addColumn = async (name, definition) => {
            if (!columnNames.includes(name)) {
                console.log(`Adding ${name}...`);
                await sequelize.query(`ALTER TABLE Users ADD COLUMN ${name} ${definition}`);
            } else {
                console.log(`${name} already exists.`);
            }
        };

        await addColumn('emailHash', 'VARCHAR(255) NULL UNIQUE AFTER email');
        await addColumn('emailIv', 'VARCHAR(255) NULL AFTER emailHash');
        await addColumn('isVerified', 'BOOLEAN DEFAULT FALSE AFTER emailIv');
        await addColumn('verificationCode', 'VARCHAR(255) NULL AFTER isVerified');

        console.log('Database fix completed.');
    } catch (error) {
        console.error('Fix Failed:', error);
    } finally {
        await sequelize.close();
    }
}

fix();
