const jwt = require("jsonwebtoken")

//
// const expiresIn = '20s'
const expiresIn = '1m'

const jwt_sign = (jsonPayload) => {
    //Generate an access token
    const accessToken = jwt.sign({
        ...jsonPayload,
    },
    process.env.ACCESS_TOKEN_SECRET, 
    {
        expiresIn,
    }
    )
    const refreshToken = jwt.sign({
        ...jsonPayload,
    },
    process.env.REFRESH_TOKEN_SECRET, 
    // {
    //     expiresIn,
    // }
    )
    
    return {
        accessToken,
        refreshToken,
    }
}

const jwt_verify = (accessToken) => {
    const jsonPayload = jwt.verify(accessToken, process.env.ACCESS_TOKEN_SECRET)
    console.log("jsonPayload", jsonPayload)
    return {
        ...jsonPayload,
    }
}


module.exports = { jwt_sign, jwt_verify, expiresIn, jwt }
