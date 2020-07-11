const redis = require('redis')
const db = redis.createClient(process.env.REDIS_URL)

class Entry {
    static getRange (from, to, cb) {
        db.lrange('entries', from, to, (err, items) => {
            if (err) return cb(err)
            let entries = []
            items.forEach((item) => {
                entries.push(JSON.parse(item))
            })
            cb(null, entries)
        })
    }
    constructor (obj) {
        for (let key in obj) {
            this[key] = obj[key]
        }
    }

    save (cb) {
        const entryJSON = JSON.stringify(this)
        db.lpush(
            'entries',
            entryJSON,
            (err) => {
                if (err) return cb(err)
                cb()
            }
        )
    }
}

module.exports = Entry