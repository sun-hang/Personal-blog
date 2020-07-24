const express = require('express');
const router = express.Router();
const tagsSer = require('../../services/tagsSer')
const { codeObj } = require('../../utils/webUtils');
const { find, findId, add, updata, remove } = require('./util')

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

/**
 * 修改一个标签
 */
router.put('/:id', updata(tagsSer))

/**
 * 删除一个标签
 */
router.delete('/:id', remove(tagsSer))

module.exports = router;