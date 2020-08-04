var session = require('express-session');
var RedisStore = require('connect-redis')(session);
// The URL of the Redis server. 
// Format: [redis[s]:]//[[user][:password@]][host][:port][/db-number][?db=db-number[&password=bar[&option=value]]]
// redis.createClient([options])
// redis.createClient(unix_socket[, options])
// redis.createClient(redis_url[, options])
// redis.createClient(port[, host][, options])
// |Property url |Default null
var redis = require('redis');
var redisClient = redis.createClient(process.env.REDIS_URL || null);
var options = {
    // host: 'localhost',
    // port: 6379,
    client: redisClient,
    // ttl: 60 * 60 * 1000, // Expiration time, the default is session.maxAge
    prefix: 'fyrest:',
}
var redisStore = new RedisStore(options);

function getAllActiveSessions() {
    return new Promise((resolve, reject) => {
        redisStore.all(function(err, sessions) {
            if(err) reject(err);
            else resolve(sessions);
        });
    });
}

module.exports = { redisStore, getAllActiveSessions, redisClient };