const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Review = sequelize.define('Review', {
    author: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    rating: {
        type: DataTypes.INTEGER,
        defaultValue: 5
    },
    artId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    authorSerial: {
        type: DataTypes.STRING,
        allowNull: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: true
    }
}, {
    tableName: 'Reviews',
    freezeTableName: true,
    timestamps: true
});

module.exports = Review;
