const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
    username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    emailHash: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: true // Allow null for migration of old users, will enforce later
    },
    emailIv: {
        type: DataTypes.STRING,
        allowNull: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    profilePic: {
        type: DataTypes.STRING,
        defaultValue: ''
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    serialNumber: {
        type: DataTypes.STRING,
        unique: true
    },
    isVerified: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    verificationCode: {
        type: DataTypes.STRING,
        allowNull: true
    },
    bannedState: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    bannedReason: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    banUntil: {
        type: DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'Users',
    freezeTableName: true,
    hooks: {
        afterCreate: async (user, options) => {
            if (!user.serialNumber) {
                user.serialNumber = user.id.toString().padStart(12, '0');
                await user.save();
            }
        }
    }
});

module.exports = User;
