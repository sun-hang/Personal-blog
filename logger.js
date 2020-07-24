const log4js = require('log4js');
const path = require('path');
log4js.configure({
    appenders: {
        mysql: {
            type: 'dateFile',
            filename: path.join(__dirname, 'logger/mysql.log'),
            keepFileExt: true,
            daysToKeep: 3,
            maxLogSize: 1024 * 1024 * 10,
            layout: {
                type: 'pattern',
                pattern: '%c [%d{yyyy-mm-dd HH-MM-ss}] %p: %m %n %h'
            }
        },
        api: {
            type: 'dateFile',
            filename: path.join(__dirname, 'logger/api.log'),
            keepFileExt: true,
            daysToKeep: 3,
            maxLogSize: 1024 * 1024 * 10,
            layout: {
                type: 'pattern',
                pattern: '%c [%d{yyyy-mm-dd HH-MM-ss}] %p: %m %n %h'
            }
        },
        default: {
            type: 'stdout'
        }
    },
    categories: {
        mysql: {
            level: 'all',
            appenders: ['mysql']
        },
        api: {
            level: 'all',
            appenders: ['api']
        },
        default: {
            level: 'all',
            appenders: ['default']
        }
    }
})

module.exports = {
    apiLogger: log4js.getLogger('api'),
    mysqlLoger: log4js.getLogger('mysql'),
    defauleLogger: log4js.getLogger()
}