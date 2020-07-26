let whiteList = ['/api/admin/whoami']
const { verify } = require('./jwt')
module.exports = (req, res, next) => {
    if (!whiteList.includes(req.path)) {
        next()
        return;
    }

    const result = verify(req);
    if (result) {
        next()
        req.userId = result.id;
    } else {
        res.send({ code: 1, msg: "验证失败，请登录", data: null })
    }
}