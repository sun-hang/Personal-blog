/**
 *  每日一句
 */

const sequelize = require('./index');
const { DataTypes } = require('sequelize')
module.exports = sequelize.define('chat', {
    chatday: {
        allowNull: false,
        type: DataTypes.STRING
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING
    },
    ctime: {
        allowNull: false,
        type: DataTypes.INTEGER
    }
}, {
    indexes: [
        {
            name: 'chat_time',
            unique: true,
            fields: [{ attribute: 'ctime', order: 'DESC' }]
        }
    ],
    createdAt: false,
    updatedAt: false,
    paranoid: true
})