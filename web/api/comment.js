const express = require('express');
const router = express.Router();
const commentSer = require('../../services/commentSer')
const { codeObj } = require('../../utils/webUtils');
const { find, findId, add, updata, remove } = require('./util')

router.get('/', find(commentSer, 'parentid'))

router.get('/:id', findId(commentSer, 'parentid'))

router.post('/', add(commentSer, ["content", "parentid", "blogid", "userName", "parentName", "email", "userid"]))

router.put('/:id', updata(commentSer))

router.delete('/:id', remove(commentSer, async (result) => {
    if (result) {
        if (result.parentid == -1) {
            await commentSer.deteles({ parentid: id })
        }
    }
}))

module.exports = router;