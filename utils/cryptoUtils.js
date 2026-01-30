const crypto = require('crypto');

const ALGORITHM = 'aes-256-cbc';
const SECRET_KEY = Buffer.from('f3e4d5c6b7a8901234567890abcdef12', 'utf8'); // In production, use process.env.ENCRYPTION_KEY
const HASH_SALT = 'grandmaster_safety_salt'; // In production, use process.env.HASH_SALT

/**
 * Encrypts a string (e.g., email) using AES-256-CBC
 */
function encrypt(text) {
    const iv = crypto.randomBytes(16);
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return {
        encryptedData: encrypted,
        iv: iv.toString('hex')
    };
}

/**
 * Decrypts a string using AES-256-CBC
 */
function decrypt(encryptedData, ivHex) {
    const iv = Buffer.from(ivHex, 'hex');
    const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
    let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
}

/**
 * Generates a one-way hash for searchable fields (e.g., email lookups)
 */
function generateHash(text) {
    return crypto.createHmac('sha256', HASH_SALT).update(text.toLowerCase()).digest('hex');
}

module.exports = {
    encrypt,
    decrypt,
    generateHash
};
