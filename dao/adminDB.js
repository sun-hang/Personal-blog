/**
 * 用户信息模型
 */

const sequelize = require('./index');
const { DataTypes } = require('sequelize')
module.exports = sequelize.define('admin', {
    loginId: {
        type: DataTypes.STRING,
        allowNull: false
    },
    loginPwd: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING
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
    indexes: [{
        name: 'log_Id',
        unique: true,
        fields: [{ name: 'loginId', order: 'DESC' }]
    }]
})