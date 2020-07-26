const express = require('express');
const router = express.Router();
const { codeObj } = require('../../utils/webUtils')
const tagSer = require('../../services/tagsSer');
const blogSer = require('../../services/blogSer');
const tagAndblogSer = require('../../services/tagAndblogSer');
const tagAndblogDB = require('../../dao/tagAndblogDB')
const { find, findId, add, updata, remove } = require('./util')
/**
 * 获取所有文章或分页获取或用文章名来获取
 */
router.get('/', find(blogSer, 'title'))



/**
 * 按文章id或文章名进行查询
 */
router.get('/:id', findId(blogSer, 'title'))



/**
 * 添加一篇文章
 */

async function tagHandle(tag, result) {
    // 把多个标签进行切割
    let tags = tag.replace(/\，/g, ',').split(',');
    if (Object.keys(result).length <= 1 && Object.keys(result)[0] == 'id') {
        // 这是修改
        // 先获取文章的tag内容
        const res = await blogSer.findOne(result.id)
        if (res[0]) {
            // 存在就进行查找
            let orTags = res[0].tag.replace(/\，/g, ',').split(',');
            let temp = [];
            for (let i = 0; i < tags.length; i++) {
                if (tags[i] !== orTags[i] && !tags.includes(orTags[i])) {
                    temp.push(tags[i])
                }
            }
            tags = temp;
        } else {
            // 不存在就代表没有进行下去的意义了
            return '当前文章不存在';
        }

    }
    // 多个标签进行循环，确认是否添加如数据库，没加就添加
    for (let i = 0; i < tags.length; i++) {
        // 先根据标签名进行查询
        let tagResult = await tagSer.findOne(undefined, tags[i]);
        let tagid;
        // 判断数据库中是否存在
        if (!tagResult[0]) {
            // 如果不存在进行添加
            let rest = await tagSer.add(tags[i]);
            if (rest) {
                // 获取标签id
                tagid = rest.id
            }
        } else {
            // 如果数据库里有，获取标签id
            tagid = tagResult[0].id
        }
        // 这里添加博客和标签的映射
        if (tagid && result.id) {
            // 必须有博客id和标签id
            try {
                await tagAndblogSer.add(tagid, result.id)
            } catch (error) {
                console.log(error)
            }
        }

    }
}

router.post('/', add(blogSer, ["title", "tag", "views", "content", "introduce", "name"], tagHandle, 'tag'))


router.post(/^\/hot/, async (req, res, next) => {
    let result = await blogSer.where(req.body);
    res.send({
        code: 0,
        msg: '请求成功',
        data: result
    })
})
/**
 * 修改一篇文章
 */
router.put('/:id', updata(blogSer, tagHandle, 'tag'))

/**
 * 删除一篇文章
 */
router.delete('/:id', remove(blogSer, async () => {
    await tagAndblogSer.deletes({ blogId: id })
}))

module.exports = router;