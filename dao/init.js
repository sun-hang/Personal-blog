// 初始化每日一句模型
require('./everydayDB');
// 初始化友情链接模型
require('./LinksDB');
// 初始化标签模型
const tagDB = require('./tagsDB')
// 初始化博客模型;
const blogDB = require('./blogDB')
// 初始化标签博客映射模型
const tagAndblogDB = require('./tagAndblogDB')
// 初始化用户模型
require('./adminDB')
// 初始化评论模型
require('./commentDB')
const sequelize = require('./index')
sequelize.sync({ alter: true });

blogDB.belongsToMany(tagDB, { through: tagAndblogDB })
tagDB.belongsToMany(blogDB, { through: tagAndblogDB })