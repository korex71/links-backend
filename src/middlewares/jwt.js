const {
    verifyJwt
} = require('../helpers/jwt')

const checkJwt = (req, res, next) => {

    // /auth-sign-in
    // /auth-sign-up
    const {url: path} = req
    console.log(path)

    const excludedPaths = ['/auth/sign-in', '/auth/sign-up']
    const isExcluded = !!excludedPaths.find((p) => p.startsWith(path))
    console.log(path, isExcluded)
    if(isExcluded) return next()
    let token = req.headers['authorization']
    token = token ? token.slice(7, token.length) : null;
    if (!token) return res.jsonUnauthorized(null, 'Invalid token')

    try {
        const decoded = verifyJwt(token)
        req.accountId = decoded.id
        console.log(decoded)
        next()
    } catch (error) {
        return res.jsonUnauthorized(null, 'Invalid token')
    }
}

module.exports = checkJwt