/**
 * 博客信息模型
 */

const sequelize = require('./index');
const { DataTypes } = require('sequelize')
module.exports = sequelize.define('blog', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    content: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    introduce: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    tag: {
        type: DataTypes.STRING,
        allowNull: false
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    views: {
        type: DataTypes.INTEGER,
        allowNull: false
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
        name: 'blog_id',
        unique: true,
        fields: [{ name: "ctime", order: 'DESC' }]
    }]
})