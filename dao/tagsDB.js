/**
 * 标签模型
 */

const sequelize = require('./index');
const { DataTypes } = require('sequelize')

module.exports = sequelize.define('tag', {
    tag: {
        type: DataTypes.STRING,
        allowNull: false
    },
    ctime: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    paranoid: true,
    createdAt: false,
    updatedAt: false,
    indexes: [{
        name: "c_time",
        unique: true,
        fields: [{ attribute: 'tag', order: 'DESC' }]
    }]
})