const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path')
const jimp = require('jimp');
// 源文件存储位置和文件名
let storage = multer.diskStorage({
    destination(req, file, cb) {
        cb(null, path.join(__dirname, '../../origin'))
    },
    filename(req, file, cb) {
        let ext = path.extname(file.originalname);
        let pathObj = path.parse(file.originalname)
        cb(null, pathObj.name + Date.now() + ext);
    }
})

// 图片存储中间件
let upload = multer({ storage })

async function mark(originPath) {
    const origin = await jimp.read(originPath);
    // 小
    origin.resize(80, 80);
    // 写入服务器
    // origin.write(/路径/)
    // 保存数据库
    // 中
    origin.resize(220, 220)

    // 大
    origin.resize(450, 450);
}

router.post('/', upload.fields([{ name: 'img', maxCount: 5 }, { name: 'file', maxCount: 5 }]), (req, res, next) => {
    // 如果要进行放大缩小的图，执行mark
    // 路径也可以保存数据库
    res.send({ code: 0, msg: '成功', data: '/api/download/img/' + req.files.img[0].filename })
})
module.exports = router;