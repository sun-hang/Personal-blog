const { Sequelize } = require('sequelize');
const { mysqlLoger } = require('../logger')
let pass = '980529Ssf.'
const sequelize = new Sequelize('my_blog', 'root', pass, {
    host: 'localhost',
    dialect: 'mysql',
    logging: (msg) => {
        mysqlLoger.info(msg)
    }
})

module.exports = sequelize;
