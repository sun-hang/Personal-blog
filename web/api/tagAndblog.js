const express = require('express');
const router = express.Router();
const tagAndblogSer = require('../../services/tagAndblogSer')
const { codeObj } = require('../../utils/webUtils');
const { find, findId, add, updata, remove } = require('./util')

router.get('/', find(tagAndblogSer, ' '))

router.get('/:id', findId(tagAndblogSer))

router.post('/', add(tagAndblogSer, ['tagid', 'blogid']))

router.put('/:id', updata(tagAndblogSer))

router.delete('/:id', remove(tagAndblogSer))

module.exports = router;