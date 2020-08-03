const fs = require("fs")
const crypto = require("crypto")
//
ats = 'ACCESS_TOKEN_SECRET = ' + crypto.randomBytes(64).toString('hex')
rts = 'REFRESH_TOKEN_SECRET = ' + crypto.randomBytes(64).toString('hex')
ts = 'TOKEN_SECRET = ' + crypto.randomBytes(64).toString('hex')
fs.writeFile(".env", [ats, rts, ts].join('\n'), (error) => {
    if (error) {
        return console.log("# Write failed")
    }
    console.log("# Write successful")
    console.log("process.env.ACCESS_TOKEN_SECRET")
    console.log("process.env.REFRESH_TOKEN_SECRET")
    console.log("process.env.TOKEN_SECRET")
})