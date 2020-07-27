const express = require('express');
const router = express.Router();
const tagsSer = require('../../services/tagsSer')
const { codeObj } = require('../../utils/webUtils');
const { find, findId, add, updata, remove } = require('./util')
const blogSer = require('../../dao/blogDB');
/**
 * 获取所有标签或分页获取标签或按标签名进行查找
 */
router.get('/', find(tagsSer, 'tag'))

/**
 * 以标签id或标签名来进行查找
 */
router.get('/:id', findId(tagsSer, 'tag'))

/**
 * 添加一个标签
 */
router.post('/', add(tagsSer, ['tag']))

router.post('/:id', async (req, res, next) => {
    let id = +req.params.id;
    const result = await tagsSer.where({ where: { id }, include: blogSer })
    res.send({code:0,msg:'请求成功',data:result})
})
/**
 * 修改一个标签
 */
router.put('/:id', updata(tagsSer))

/**
 * 删除一个标签
 */
router.delete('/:id', remove(tagsSer))

module.exports = router;