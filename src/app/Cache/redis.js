const Redis = require("ioredis")

class Cache {
    constructor() {
        this.redis = new Redis({
            host: process.env.REDIS_HOST,
            port: process.env.REDIS_PORT,
            password: process.env.REDIS_PASSWORD,
            keyPrefix: "cache:"
        })
    }

    async buscar(key) {
        const value = await this.redis.get(key);
    
        return value ? JSON.parse(value) : null;
    }

    setar(key, value, timeExp) {
        return this.redis.set(key, JSON.stringify(value), "EX", timeExp);
    }

    deletar(key) {
        return this.redis.del(key);
    }
}

module.exports = new Cache()