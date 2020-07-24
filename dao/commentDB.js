/**
 * 评论模型
 */

const sequelize = require('./index');
const { DataTypes } = require('sequelize')
module.exports = sequelize.define('comment', {
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    parentid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    blogid: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    parentName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    userId: {
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.INTEGER
    },
    ctime: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    utime: {
        type: DataTypes.INTEGER,
        allowNull: false
    }

}, {
    paranoid: true,
    createdAt: false,
    updatedAt: false,
    indexes: [{ name: 'ctime_in', unique: true, fields: [{ name: 'ctime', order: 'DESC' }] }]
})
