const { codeObj } = require('../../utils/webUtils');

/**
 * 返回结果处理函数,为字符串或null code为1，否则为0
 * @param {*} result 
 */
function resultHandle(result) {
    if (typeof result === 'string' || result === null) {
        return codeObj(1, '请求成功', result)
    }
    return codeObj(0, '请求成功', result);
}

/**
 * router的get请求的处理函数
 * @param {*} DB 数据模型对象
 * @param {*} attr 根据什么条件进行查找
 */
module.exports.find = (DB, attr) => {
    return async (req, res, next) => {
        let result;
        if (req.query[attr]) {
            result = await DB.findOne(undefined, req.query[attr])
            res.send(resultHandle(result))
            return;
        }
        if (req.query.page || req.query.limit) {
            let page = parseInt(req.query.page) || 1;
            let limit = parseInt(req.query.limit) || 10;
            result = await DB.findByPage(page, limit)
        } else {
            result = await DB.findAll();
        }
        res.send(resultHandle(result))
    }
}

/**
 * 根据条件来进行查找
 * @param {*} DB 数据模型对象
 * @param {*} attr 根据attr来进行查找
 */
module.exports.findId = (DB, attr) => {
    return async (req, res, next) => {
        const id = +req.params.id;
        const loginId = req.query[attr] || ''
        const result = await DB.findOne(id, loginId)
        res.send(resultHandle(result));
    }
}

/**
 * 添加一条数据
 * @param {*} DB s数据模型对象
 * @param {*} attrs 所需属性名
 * @param {*} callback 回调函数
 * @param {*} name 回调所需属性名
 */
module.exports.add = (DB, attrs, callback, name) => {
    return async (req, res, next) => {
        let datas = [];
        for (const item of attrs) {
            let data = req.body[item];
            if (!data && data !== 0) {
                res.send(resultHandle(`属性${item}不存在`))
                return
            }
            datas.push(data);
        }
        const result = await DB.add(...datas)
        if (callback) {
            await callback(req.body[name], result);
        }
        if (result !== null) {
            res.send(codeObj(0, '添加成功', result))
        } else {
            res.send(codeObj(1, '索引已存在', result))
        }
    }
}

module.exports.updata = (DB, callback, name) => {
    return async (req, res, next) => {
        let id = +req.params.id;
        if (name) {
            if (req.body[name]) {
                await callback(req.body[name], { id })
            }
        }
        if (!typeof +id === 'number') {
            res.send(codeObj(1, 'id错误', null))
        }
        const result = await DB.updata(id, req.body);
        res.send(codeObj(0, '修改成功', result))
    }
}

module.exports.remove = (DB, callback) => {
    return async (req, res, next) => {
        let id = +req.params.id;
        if (!typeof +id === 'number') {
            res.send(codeObj(1, 'id错误', null))
        }

        const result = await DB.remove(id)
        if (callback) {
            await callback(result);
        }
        res.send(codeObj(0, '删除成功', result))
    }
}