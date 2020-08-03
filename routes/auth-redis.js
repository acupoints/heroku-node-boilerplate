var redis = require('redis');
var session = require('express-session');
var RedisStore = require('connect-redis')(session);
var redisClient = redis.createClient();
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

module.exports = { redisStore, getAllActiveSessions };