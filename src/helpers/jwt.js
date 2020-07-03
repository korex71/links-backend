require('dotenv').config()

const jwt = require('jsonwebtoken')

const tokenPrivateKey = process.env.JWT_TOKEN_PRIVATE_KEY
const refreshTokenPrivateKey = process.env.JWT_REFRESH_TOKEN_PRIVATE_KEY

const option = {expiresIn: '30 minutes'}
const refreshOptions = {expiresIn: '30 days'}
const generateJwt = (payload) => {
    return jwt.sign(payload, tokenPrivateKey, option)
}

const generateRefreshJwt = (payload) => {
    return jwt.sign(payload, refreshTokenPrivateKey, refreshOptions)
}

const verifyJwt = (token) => {
    return jwt.verify(token, tokenPrivateKey)
}

const verifyRefreshJwt = (token) => {
    return jwt.verify(token, refreshTokenPrivateKey)
}

const getTokenFromHeaders = (headers) => {
    const token = req.headers['authorization']
    return token ? token.slice(7, token.length) : null;
}

module.exports = {getTokenFromHeaders, verifyJwt, generateJwt, generateRefreshJwt, verifyRefreshJwt}