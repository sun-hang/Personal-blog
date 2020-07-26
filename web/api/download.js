const express = require('express');
const router = express.Router();
const path = require('path');
router.get('/:filename', (req, res, next) => {
    let fileName = req.params.filename;
    let pathName = path.join(__dirname, '../../download', fileName);
    res.download(pathName, fileName);
})

router.get('/img/:filename', (req, res, next) => {
    let pathname = path.join(__dirname, '../../origin', req.params.filename);
    res.sendFile(pathname);
})

module.exports = router;