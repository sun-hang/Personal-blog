const express = require('express');
const path = require('path');
const app = express();
const cookie = require('cookie-parser');
const cors = require('cors');
const session = require('express-session');
const log4js = require('log4js');
// 用于解析cookie
app.use(cookie());

// 添加session中间件，用于验证验证码
app.use(session({
    secret: 'sunshanfeng',
    name: 'sessionId'
}))

// 验证令牌中间件
app.use(require('./tokenMiddleware'));

// 用于跨域的中间件
app.use(cors({
    credentials: true,
    /**
     * 所有域都可以访问
     * @param {*} origin 
     * @param {*} callback 
     */
    origin(origin, callback) {
        callback(null, true)
    }
}))

// 使用日志中间件
app.use(log4js.connectLogger(require('../logger').apiLogger, { level: 'info' }))

// 静态资源中间件
app.use(express.static(path.join(__dirname, '../public')));
console.log(path.join(__dirname, '../public'))
// 用于解析json格式的请求体
app.use(express.json())

// 用于解析表单格式的请求体
app.use(express.urlencoded({ extended: true }))

app.use('/api/every', require('./api/everyday'));

app.use('/api/admin', require('./api/admin'));

app.use('/api/link', require('./api/link'));

app.use('/api/tags', require('./api/tags'));

app.use('/api/blog', require('./api/blog'));

app.use('/api/download', require('./api/download'))

app.use('/api/upload', require('./api/upload'));

app.use('/api/tagandbolg', require('./api/tagAndblog'));

app.use('/api/comment', require('./api/comment'));

// 错误处理中间件
app.use(require('./errorMiddleware'));

app.listen(12306, () => {
    console.log('服务器已启动，监听端口12306');
})
