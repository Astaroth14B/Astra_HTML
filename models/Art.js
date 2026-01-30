const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Art = sequelize.define('Art', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.TEXT
    },
    imageUrl: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userSerial: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, {
    tableName: 'Arts',
    freezeTableName: true,
    timestamps: true
});

// Associations
const User = require('./User');
Art.belongsTo(User, { foreignKey: 'userSerial', targetKey: 'serialNumber', as: 'uploader' });

module.exports = Art;
