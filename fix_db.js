const sequelize = require('./config/database');

async function fix() {
    try {
        await sequelize.authenticate();
        console.log('Connected.');

        // 1. Add new columns if they don't exist
        // Note: IF NOT EXISTS is not standard SQL for columns in all versions, 
        // but we can try individual ALTER TABLEs

        console.log('Adding emailHash...');
        await sequelize.query("ALTER TABLE Users ADD COLUMN IF NOT EXISTS emailHash VARCHAR(255) NULL UNIQUE AFTER email").catch(e => console.log('emailHash might already exist or error:', e.message));

        console.log('Adding emailIv...');
        await sequelize.query("ALTER TABLE Users ADD COLUMN IF NOT EXISTS emailIv VARCHAR(255) NULL AFTER emailHash").catch(e => console.log('emailIv might already exist or error:', e.message));

        console.log('Adding isVerified...');
        await sequelize.query("ALTER TABLE Users ADD COLUMN IF NOT EXISTS isVerified BOOLEAN DEFAULT FALSE AFTER emailIv").catch(e => console.log('isVerified might already exist or error:', e.message));

        console.log('Adding verificationCode...');
        await sequelize.query("ALTER TABLE Users ADD COLUMN IF NOT EXISTS verificationCode VARCHAR(255) NULL AFTER isVerified").catch(e => console.log('verificationCode might already exist or error:', e.message));

        // 2. Drop unique constraint on email if it exists
        // This is tricky because the name might be 'email' or 'email_UNIQUE'
        console.log('Attempting to drop unique constraint on email...');
        // We can check indexes first
        const [results] = await sequelize.query("SHOW INDEX FROM Users WHERE Column_name = 'email' AND Non_unique = 0");
        if (results.length > 0) {
            const indexName = results[0].Key_name;
            console.log(`Dropping index ${indexName}...`);
            await sequelize.query(`ALTER TABLE Users DROP INDEX ${indexName}`);
        }

        console.log('Database fix completed.');
    } catch (error) {
        console.error('Fix Failed:', error);
    } finally {
        await sequelize.close();
    }
}

fix();
