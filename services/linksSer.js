
const links = require('../dao/LinksDB');
const { Op } = require('sequelize')
const { getCTime } = require('../utils/timeUtild');
const { add, updata, remove, getAll, getOne, findByPage } = require('./util')

// 增

/**
 * 添加一个友情链接
 * @param {String} content 
 * @param {String} name 
 */
module.exports.add = async (content, name) => {
    return await add('LinksDB', { name, link: content, ctime: getCTime() })
}

// 删
/**
 * 删除一个友情链接
 * @param {Number} id 
 */
module.exports.remove = async (id) => {
    return await remove('LinksDB', id)
}

// 改
/**
 * 修改一个友情链接
 * @param {Number} id 
 * @param {Object} content 
 */
module.exports.updata = async (id, content) => {
    return await updata('LinksDB', id, content)
    // const result = await links.update()  更改多个
}

// 查

/**
 * 查询所有友情链接
 */
module.exports.findAll = async () => {
    return await getAll(links)
}

/**
 * 根据id或者网站名字进行查询
 * @param {Number} id 
 * @param {String} name 
 */
module.exports.findOne = async (id, name) => {
    return await getOne(links, id, ['name', name])
}

/**
 * 分页查询友情链接
 * @param {Number} page 
 * @param {Number} limit 
 */
module.exports.findByPage = async (page, limit) => {
    return await findByPage(links, page, limit)
}
