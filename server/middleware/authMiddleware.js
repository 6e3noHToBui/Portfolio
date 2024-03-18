const jwebt = require('jsonwebtoken')

module.exports = (req, res, next) => {
    if (req.method === 'OPTIONS') {
       return next()
    }

    try {
        const token = req.headers.authorization.split(' ')[1]
        if (!token) {
            return res.status(401).json({error: 'Auth error'})
        }
        const decoded = jwebt.verify(token, process.env.MY_SECRET_KEY)
        req.user = decoded
        next()
    } catch (e) {
        return res.status(401).json({error: 'Auth error'})
    }
}