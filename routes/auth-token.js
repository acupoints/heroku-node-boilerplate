const { jwt_sign, jwt_verify, expiresIn, jwt } = require("./auth-jwt")

// middleware to validate token
const verifyToken = (req, res, next) => {
    const token = req.header("auth-token")
    if (!token) {
        return authenticateJWT(req, res, next)
        // return res.status(401).json({
        //     error: "Access denied"
        // })
    }

    try {
        const verified = jwt_verify(token)
        req.user = verified
        next()
        
    } catch (error) {
        // res.json({
        //     error,
        // })
        res.status(400).json({
            error: "Token is not valid",
        })
    }

}

const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader) {
        return res.status(401).json({
            error: "Access denied"
        })
    }

    const token = authHeader.split(' ')[1]
    try {
        const verified = jwt_verify(token)
        req.user = verified
        next()
        
    } catch (error) {
        // res.json({
        //     error,
        // })
        res.status(400).json({
            error: "Token is not valid",
        })
    }

}

module.exports = verifyToken