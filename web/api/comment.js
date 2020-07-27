const express = require('express');
const router = express.Router();
const commentSer = require('../../services/commentSer')
const { codeObj } = require('../../utils/webUtils');
const { find, findId, add, updata, remove } = require('./util')
const { validateCaptcha } = require('./captcha')
router.get('/', find(commentSer, 'parentid'))

router.get('/:id', findId(commentSer, 'parentid'))

router.post('/where', async (req, res, next) => {
    let result = await commentSer.arbitrarily(req.body);
    res.send({ code: 0, msg: '请求成功', data: result })
    return;
})

router.post('/', validateCaptcha, add(commentSer, ["content", "parentid", "blogid", "userName", "parentName", "email"]))

router.put('/:id', updata(commentSer))

router.delete('/:id', remove(commentSer, async (result) => {
    if (result) {
        if (result.parentid == -1) {
            await commentSer.deteles({ parentid: id })
        }
    }
}))

module.exports = router;