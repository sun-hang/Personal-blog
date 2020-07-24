const { codeObj } = require('../utils/webUtils')
module.exports = (error, req, res, next) => {
    if (error) {
        res.status(500).send(codeObj(500, error, null))
    } else {
        next()
    }
}