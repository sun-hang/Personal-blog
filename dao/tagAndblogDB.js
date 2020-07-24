/**
 * 标签和博客id映射模型
 */

const sequelize = require('./index');
const { DataTypes } = require('sequelize')
module.exports = sequelize.define('tag_blog', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    ctime: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
},
    {
        paranoid: true,
        createdAt: false,
        updatedAt: false
    })