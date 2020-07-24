const { model } = require("../dao");

module.exports.setKey = function setKey(from, to, obj) {
    obj[to] = obj[from];
    delete obj[from];
    return obj
}