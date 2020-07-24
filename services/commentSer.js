const commentDB = require('../dao/commentDB');
const { Op } = require('sequelize')
const { add, updata, remove, getAll, getOne, findByPage } = require('./util')
const { getCTime } = require('../utils/timeUtild')

/**
 * 
 * @param {String} content  评论内容
 * @param {Number} parentid  回复上级id
 * @param {Number} blogid   回复博客的id
 * @param {String} userName  发评论者用户名
 * @param {String} parentName  收评论者用户名
 * @param {String} email  评论者的邮箱
 * @param {Number} userid 用户id
 */
module.exports.add = async (content, parentid, blogid, userName, parentName, email, userid) => {
    return await add('commentDB', { content, parentid, blogid, userName, parentName, email, userid, ctime: getCTime(), utime: getCTime() })
}

// 删
/**
 * 删除一个评论
 * @param {Number} id 
 */
module.exports.remove = async (id) => {
    return await remove('commentDB', id)
}

// 改
/**
 * 修改一个评论
 * @param {Number} id 
 * @param {Object} content 
 */
module.exports.updata = async (id, content) => {
    return await updata('commentDB', id, content)
    // const result = await commentDB.update()  更改多个
}

// 查
/**
 * 查询所有评论
 */
module.exports.findAll = async () => {
    return await getAll(commentDB)
}

/**
 * 根据id或者父级id进行查询
 * @param {Number} id 
 * @param {Number} parentid 
 */
module.exports.findOne = async (id, parentid) => {
    return await getOne(commentDB, id, ['parentid', parentid])
}

/**
 * 分页查询
 * @param {Number} page 
 * @param {Number} limit 
 */
module.exports.findByPage = async (page, limit) => {
    return await findByPage(commentDB, page, limit)
}

/**
 * 根据传入的属性名进行分组查询
 * @param {String} name 
 */
module.exports.grouping = async (name) => {
    const result = await commentDB.findAll({
        group: name,
        having: ['parentid != -1']
    })
    if (result) {
        return JSON.parse(JSON.stringify(result));
    }
}

module.exports.arbitrarily = async (where) => {
    return await commentDB.findAll({ where });
}

module.exports.deteles = async (where) => {
    const result = await commentDB.destroy({ where });
}