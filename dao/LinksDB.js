/**
 * 友情链接模型
 */

const sequelize = require('./index');
const { DataTypes } = require('sequelize')
module.exports = sequelize.define('link', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    link: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ctime: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    indexes: [{ name: 'c_link', unique: true, fields: [{ attribute: 'ctime', order: 'DESC' }] }],
    updatedAt: false,
    createdAt: false,
    paranoid: true
})