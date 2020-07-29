const express = require('express');
const router = express.Router();
const svgCaptcha = require('svg-captcha');
router.get('/', (req, res, next) => {
    const captcha = svgCaptcha.create({
        noise: 4,
        size: 4,
        color: true,
        height: 34,
        ignoreChars: 'iIlo0O1',
        // background: '#008c8c'
    })
    req.session.captcha = captcha.text.toLowerCase();
    res.type('svg').status(200).send(captcha.data);
})

function validateCaptcha(req, res, next) {
    let text = req.session.captcha;

    if (req.method === 'POST' && req.baseUrl + req.path === '/api/admin/login' && !text) {
        next(Error('错误'))
        return;
    }
    let captcha = req.body.captcha;
    if (captcha && captcha.toLowerCase() == text) {
        next();
        req.session.text = '';
        return;
    }
    res.json({ code: 1, msg: '验证码错误', data: null })
    return;
}

module.exports = {
    router, validateCaptcha
}