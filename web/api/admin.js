const express = require('express');
const router = express.Router()
const adminSer = require('../../services/adminSer')
const { codeObj } = require('../../utils/webUtils')
const { find, findId, add, updata, remove } = require('./util')
const { validateCaptcha } = require('./captcha')
router.get('/', find(adminSer, 'loginId'))

router.get('/:id', findId(adminSer, 'loginId'))



router.post('/', add(adminSer, ['loginId', 'loginPwd']))

router.post('/login', validateCaptcha, async (req, res, next) => {
    if (!req.body.loginId) {
        res.send(codeObj(1, '账号不能为空', null))
        return;
    }

    if (!req.body.loginPwd) {
        res.send(codeObj(1, '密码不能为空', null))
        return;
    }
    const result = await adminSer.login(req.body.loginId, req.body.loginPwd)
    if (result) {
        res.send(codeObj(0, '登录成功', result))
    } else {
        res.send(codeObj(1, '账号密码错误', null))
    }
})

router.put('/:id', updata(adminSer))

router.delete('/:id', remove(adminSer))

module.exports = router;