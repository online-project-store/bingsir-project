const Redis = require("ioredis");
const { Store } = require("koa-session2");

class RedisStore extends Store {
    constructor() {
        super();
        this.redis = new Redis(); //默认 Connect to 127.0.0.1:6379
    }

    async get(sid, ctx) {
        let data = await this.redis.get(`SESSION:${sid}`);
        return JSON.parse(data);
    }
    
    async set(session, { sid =  this.getID(24), maxAge = 900 } = {}, ctx) {
        try {
            // Use redis set EX to automatically drop expired sessions //时间单位是秒
            await this.redis.set(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge);
        } catch (e) {
            console.log(e);
        }
        return sid;
    }

    async expire(sid, maxAge=1000) {
        try {
           return await this.redis.expire(`SESSION:${sid}`,maxAge);
        } catch (error) {
            console.log(e);
        }
    }

    async destroy(sid, ctx) {
        return await this.redis.del(`SESSION:${sid}`);
    }
}

module.exports = RedisStore;