const express = require('express');
const router = express.Router();
const { codeObj } = require('../../utils/webUtils')
const linkSer = require('../../services/linksSer');
const { find, findId, add, updata, remove } = require('./util')

router.get('/', find(linkSer, 'name'))

router.get('/:id', findId(linkSer, 'name'))

router.post('/', add(linkSer, ['name', 'link']))

router.put('/:id', updata(linkSer))

router.delete('/:id', remove(linkSer))

module.exports = router;