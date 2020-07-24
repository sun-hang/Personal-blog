const blogDB = require('../dao/blogDB');
const { Op } = require('sequelize')
const { getCTime } = require('../utils/timeUtild')
const { add, updata, remove, getAll, getOne, findByPage } = require('./util')
/**
 * 
 * @param {String} title  文章标题
 * @param {String} tag  文章标签
 * @param {Number} views  文章阅读数
 * @param {String} content 文章内容
 * @param {Number} tagid 标签id
 * @param {String} introduce  文章简介
 * @param {String} name  作者名字
 */
module.exports.add = async (title, tag, views, content, introduce, name) => {
    return await add('blogDB',{ title, tag, views, content, introduce, name, utime: getCTime(), ctime: getCTime() })
}

// 删
/**
 * 删除一篇博客
 * @param {Number} id 
 */
module.exports.remove = async (id) => {
    return await remove('blogDB', id)
}

// 改
/**
 * 修改一篇博客
 * @param {Number} id 
 * @param {Object} content 
 */
module.exports.updata = async (id, content) => {
    // const result = await blogDB.update()  更改多个
    return await updata('blogDB', id, content)
}

// 查
/**
 * 查询所有博客
 */
module.exports.findAll = async () => {
    return await getAll(blogDB)
}

/**
 * 根据id或者作者名进行查询
 * @param {Number} id 
 * @param {String} title 
 */
module.exports.findOne = async (id, title) => {
    return await getOne(blogDB, id, ['title', title])
}

module.exports.findByPage = async (page, limit) => {
    return await findByPage(blogDB, page, limit)
}
