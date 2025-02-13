const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')
require('dotenv').config()

const generateAccessToken = (userId) => {
    const payload = {
        sub: userId,
    }

    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_TIME || '24h',
    })
}

const hashPassword = async (password, salt = 10) => {
    return await bcrypt.hash(password, salt)
}

const verifyToken = async (token) => {
    return new Promise((resolve, reject) => {
        jwt.verify(token, process.env.JWT_SECRET, (err, payload) => {
            if (err) {
                reject(err)
            } else {
                resolve(payload)
            }
        })
    })
}

module.exports = {
    generateAccessToken,
    hashPassword,
    verifyToken,
}
