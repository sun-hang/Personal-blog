const { Sequelize } = require('sequelize');
const { mysqlLoger } = require('../logger')
const sequelize = new Sequelize('my_blog', 'root', 'root', {
    host: 'localhost',
    dialect: 'mysql',
    logging: (msg) => {
        mysqlLoger.info(msg)
    }
})

module.exports = sequelize;