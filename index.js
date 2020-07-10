const express = require('express');
const path = require('path');
const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.listen(12306, () => {
    console.log('服务器已启动，监听端口12306');
})