const { getCTime } = require('../utils/timeUtild')
const { setKey } = require('../utils/index')
/**
 * 添加一条数据
 * @param {*} DBpath 数据模型的路径
 * @param {*} attrs 所需属性
 * @param {*} callback 回调函数
 */
module.exports.add = async function add(DBpath, attrs, callback) {
    // 获取数据模型
    const DB = require('../dao/' + DBpath);
    // 判断时候传入回调函数
    if (callback) {
        // 有函数执行并把属性对象传入
        const rlt = await callback(attrs)
        // 如果有返回，属于属性验证不合格，有错误，直接返回
        if (rlt) {
            return rlt
        }
    }

    try {
        // 添加数据
        const result = await DB.create(attrs)
        if (result) {
            return result.toJSON()
        } else {
            return null
        }
    } catch (e) {
        // 可以添加错误日志
        return '请求太频繁'
    }

}

/**
 * 修改一条数据
 * @param {*} DBpath 数据模型路径
 * @param {*} id 数据id
 * @param {*} attrs 需要修改的属性对象
 * @param {*} callback 回调函数
 */
module.exports.updata = async function updata(DBpath, id, attrs, callback) {
    // 获取数据模型
    const DB = require('../dao/' + DBpath);
    // 回调存在执行回调，用于验证数据是否合法
    if (callback) {
        const rlt = await callback(attrs)
        // 如果合法返回空，不合法返回错误
        if (rlt) {
            return rlt
        }
    }

    try {
        // 获取当条数据的对象
        const result = await DB.findByPk(id);
        // 进行循环赋值
        for (const item in attrs) {
            result[item] = attrs[item];
        }
        // 如果有修改时间的属性，进行赋值
        if (result.utime) {
            result.utime = getCTime();
        }
        // x修改完成提交并返回
        await result.save();
        return result.toJSON();
    } catch (error) {
        // 可以进行错误日志记录
        return '修改数据不存在'
    }

}

/**
 * 删除一条数据
 * @param {*} DBpath 数据模型路径
 * @param {*} id 数据id
 */
module.exports.remove = async function remove(DBpath, id) {
    // 获取模型对象
    const DB = require('../dao/' + DBpath);
    // 查找数据
    const result = await adminDB.findByPk(id);
    // 没找到会返回null
    if (result === null) {
        return '该数据不存在'
    }
    // 进行删除并返回
    await result.destroy()
    return result.toJSON()
}

/**
 * 查找所有数据
 * @param {*} DB 数据模型对象 
 */
module.exports.getAll = async function getAll(DB) {
    // 查找并不会报错，所以不需trycatch
    const result = await DB.findAll();
    // 将查找结果返回，如果没有数据，data为空数组
    return JSON.parse(JSON.stringify(result));
}

/**
 * 根据条件查找特定数据
 * @param {*} DB 数据模型对象
 * @param {*} id 数据id
 * @param {*} attr 判断属性，根据那个属性进行查找
 */
module.exports.getOne = async (DB, id, attr) => {
    const where = {}
    // 如果未传入属性赋值为长度唯二的空数组
    if (!attr) {
        attr = ['', '']
    }
    // id存在属性不存在
    if (id && !attr[1]) {
        where.id = id
    }
    // 属性存在id不存在
    if (attr[1] && !id) {
        where[attr[0]] = attr[1]
    }
    // 属性id都存在
    if (attr[1] && id) {
        where[Op.or] = [{ id }, { [attr[0]]: attr[1] }]
    }
    // 进行查找
    const result = await DB.findAll({
        where
    })
    // 返回结果，未查找到data为空数组
    return JSON.parse(JSON.stringify(result));
}

/**
 * 翻页进行查找
 * @param {*} DB 数据模型对象
 * @param {*} page 页码数
 * @param {*} limit 翻页数
 */
module.exports.findByPage = async function (DB, page, limit) {
    // 进行翻页查找
    const result = await DB.findAndCountAll({
        order: [['ctime', 'DESC']],
        limit,
        offset: (page - 1) * limit
    })
    // 返回的结果为数组，第一项为返回结果，为对象，count为总数，rows为行，
    // 这里为格式统一，把rows替换为data并返回
    return setKey('rows', 'data', JSON.parse(JSON.stringify(result)))
}