const tagsDB = require('../dao/tagsDB');
const { Op } = require('sequelize')
const { getCTime } = require('../utils/timeUtild')
const { add, updata, remove, getAll, getOne, findByPage } = require('./util')
/**
 * 添加一个标签
 * @param {String} tag 
 */
module.exports.add = async (tag) => {
    return await add('tagsDB', { tag, ctime: getCTime() })
}

// 删
/**
 * 删除一个标签
 * @param {Number} id 
 */
module.exports.remove = async (id) => {
    return await remove('tagsDB', id)
}

// 改
/**
 * 修改一个标签
 * @param {Number} id 
 * @param {Object} content 
 */
module.exports.updata = async (id, tag) => {
    return await updata('tagsDB', id, tag)
    // const result = await tagsDB.update()  更改多个
}

// 查

/**
 * 查询所有标签
 */
module.exports.findAll = async () => {
    return await getAll(tagsDB)
}

/**
 * 根据id或者作者名进行查询
 * @param {Number} id 
 * @param {String} tag 
 */
module.exports.findOne = async (id, tag) => {
    return await getOne(tagsDB, id, ['tag', tag])
}

module.exports.findByPage = async (page, limit) => {
    return await findByPage(tagsDB, page, limit)
}

module.exports.where = async (where) => {
    return await tagsDB.findAll(where);
}