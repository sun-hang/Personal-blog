const express = require('express');
const router = express.Router();
const everyday = require('../../services/everydaySer');
const { codeObj } = require('../../utils/webUtils')
const { find, findId, add, updata, remove } = require('./util')
/**
 *  获取每日一句
 */
router.get('/', find(everyday, 'name'))

/**
 * 获取单个
 */
router.get('/:id', findId(everyday, 'name'))

/**
 * 添加每日一句
 */
router.post('/', add(everyday, ['chatday', 'name']))

/**
 * 修改每日一句
 */
router.put('/:id', updata(everyday))

/**
 * 删除每日一句
 */
router.delete('/:id', remove(everyday))

module.exports = router;