const tagAndblogDB = require('../dao/tagAndblogDB');
const { Op } = require('sequelize')
const { getCTime } = require('../utils/timeUtild')
const { add, updata, remove, getAll, getOne, findByPage } = require('./util');
/**
 * 添加一标签和博客映射
 * @param {Number} tagid 
 * @param {Number} blogid 
 */
module.exports.add = async (tagId, blogId) => {
    return await add('tagAndblogDB', { tagId, blogId, ctime: getCTime() })
}

// 删
/**
 * 删除一个标签博客映射
 * @param {Number} id 
 */
module.exports.remove = async (id) => {
    return await remove('tagAndblogDB', id);
}

// 改
/**
 * 修改一个标签博客映射
 * @param {Number} id 
 * @param {Object} content 
 */
module.exports.updata = async (id, content) => {
    // const result = await tagAndblogDB.update()  更改多个
    return await updata('tagAndblogDB', id, content);
}

// 查

/**
 * 查询所有映射
 */
module.exports.findAll = async () => {
    return await getAll(tagAndblogDB)
}

/**
 * 根据id查询
 * @param {Number} id  
 */
module.exports.findOne = async (id) => {
    return await getOne(tagAndblogDB, id);
}

/**
 * 翻页查询映射
 * @param {Number} page 
 * @param {Number} limit 
 */
module.exports.findByPage = async (page, limit) => {
    return await findByPage(tagAndblogDB, page, limit)
}

module.exports.deletes = async (where) => {
    const result = await tagAndblogDB.destroy({ where });
}

module.exports.where = async (where) => {
    return await tagAndblogDB.findAll(where);
}