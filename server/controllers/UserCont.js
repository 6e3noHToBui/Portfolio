const jwebt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const Users = require('../models/UserModel')

exports.login = async (req, res) => {
    const { login, password } = req.body
    try {
        const user = await Users.findOne({ login: login })
        if (!user) {
            res.status(400).json({ error: "User with this credentials not found" })
        }
        else {
            if (await bcrypt.compareSync(password, user.password)) {
                const token = jwebt.sign({ id: user.id }, process.env.MY_SECRET_KEY, { expiresIn: '1h' })
                return res.status(200).json({ token })
            } else {
                res.status(400).json({ error: 'Wrong password' })
            }
        }
    } catch (error) {
        console.log("Login error:", error)
        res.status(500).json({ error: "Server Error" })
    }
}