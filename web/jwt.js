const jwt = require('jsonwebtoken');
const secrect = 'sunshanfeng',
    cookieKey = 'token';
module.exports.publish = (res, maxAge = 3600 * 24 * 1000, info = {}) => {
    // 生成token
    const token = jwt.sign(info, secrect, {
        expiresIn: maxAge
    })
    // 给cookie添加指令
    res.cookie(cookieKey, token);
    // 给authorization添加指令
    res.header('authorization', token);
}

module.exports.verify = (req) => {
    let token = req.cookies[cookieKey];
    if (!token) {
        token = req.headers.authorization;
        if (!token) {
            return null;
        }
    }
    token = token.split(' ');
    token = token.length === 1 ? token[0] : token[1];
    try {
        let result = jwt.verify(token, secrect);
        return result
    } catch (error) {
        return null;
    }
}