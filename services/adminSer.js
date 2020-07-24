const adminDB = require('../dao/adminDB');
const { Op } = require('sequelize')
const md5 = require('md5');
const { add, updata, remove, getAll, getOne, findByPage } = require('./util')
const { getCTime } = require('../utils/timeUtild')
// 增
/**
 * 
 * @param {Object} datas loginId,loginPwd email 
 */
module.exports.add = async (loginId, loginPwd) => {
    const ctime = getCTime();
    const utime = getCTime();
    return await add('adminDB', { loginId, loginPwd, ctime, utime }, async (datas) => {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(datas.loginPwd)) {
            return '至少6-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符'
        }
        if (!/^[A-Za-z]{1}[A-Za-z0-9_-]{3,15}$/.test(datas.loginId)) {
            return '必须是以字母开头，只能包含字母数字下划线和减号，4到16位'
        }
        if (datas.email && !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(datas.email)) {
            return '邮箱不符合格式'
        }
        datas.loginPwd = md5(datas.loginPwd)
    });

}


// 删
module.exports.remove = async (id) => {
    return await remove('adminDB', id)
}
// 改
module.exports.updata = async (id, content) => {
    // const result = await everyday.update()  更改多个
    return await updata('adminDB', id, content, async (content) => {
        if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^]{6,16}$/.test(content.loginPwd) && content.loginPwd) {
            return '至少6-16个字符，至少1个大写字母，1个小写字母和1个数字，其他可以是任意字符'
        }
        if (!/^[A-Za-z]{1}[A-Za-z0-9_-]{3,15}$/.test(content.loginId) && content.loginId) {
            return '必须是以字母开头，只能包含字母数字下划线和减号，4到16位'
        }
        if (content.email && !/^[A-Za-z0-9\u4e00-\u9fa5]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/.test(content.email)) {
            return '邮箱不符合格式'
        }
    })
}
// 查

module.exports.findAll = async () => {
    return await getAll(adminDB);
}

module.exports.findOne = async (id, loginId) => {
    return await getOne(adminDB, id, ['loginId', loginId]);
}

module.exports.findByPage = async (page, limit) => {
    return await findByPage(adminDB, page, limit)
}

// 登录
module.exports.login = async (loginId, loginPwd) => {
    let result = await adminDB.findOne({
        where: {
            loginId,
            loginPwd: md5(loginPwd)
        }
    })

    if (result && loginId == result.loginId) {
        let obj = result.toJSON();
        delete obj.loginPwd
        return obj;
    }
    return '账号密码错误';
}