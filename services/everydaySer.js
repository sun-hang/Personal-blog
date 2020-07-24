const everyday = require('../dao/everydayDB');
const { Op } = require('sequelize')
const { getCTime } = require('../utils/timeUtild');
const { add, updata, remove, getAll, getOne, findByPage } = require('./util')
// 增

/**
 * 添加一个每日一句
 * @param {String} content 
 * @param {String} name 
 */
module.exports.add = async (content, name) => {
    return await add('everydayDB', { content, name, ctime: getCTime() })
}

// 删
/**
 * 删除一个每日一句
 * @param {Number} id 
 */
module.exports.remove = async (id) => {
    return await remove('everydayDB', id)
}

// 改
/**
 * 修改一个每日一句
 * @param {Number} id 
 * @param {Object} content 
 */
module.exports.updata = async (id, content) => {
    // const result = await everyday.update()  更改多个
    return await updata('everydayDB', id, content)
}

// 查

/**
 * 查询所有学生
 */
module.exports.findAll = async () => {
    return await getAll(everyday)
}

/**
 * 根据id或者作者名进行查询
 * @param {Number} id 
 * @param {String} name 
 */
module.exports.findOne = async (id, name) => {
    return await getOne(everyday, id, ['name', name])
}

module.exports.findByPage = async (page, limit) => {
    return await findByPage(everyday, page, limit)
}
