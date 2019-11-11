// const fs = require("fs");
const Store = require("../config/Store");
// const sql = require('../sql/mysql');
const redisStore = new Store();

// const routerPage = require('./routerPage');

async function Interceptor(ctx, next) {
    let url = ctx.request.url;
    const allowpage = ['/login', '/register', '/', '/getarticlelist', '/get-article-details', '/loginStatus'];
    //console.log(allowpage.indexOf(url),url);
     if (allowpage.indexOf(url) > -1) await next();
     else{
        let data = await redisStore.get(ctx.session.redisData);
        if (data && !!data.phone) {
            try {
                let duration = 900; //15分钟
                if (ctx.session.remember) {
                    duration = 60 * 60 * 24 * 7 ; //一周
                }
                await redisStore.expire(ctx.session.redisData, duration); //时间单位是秒  重置redisid
                console.log('sid===========>>>>>>>>>>>>>>', ctx.headers.cookie.split('='));
                await redisStore.expire(ctx.headers.cookie.split('=')[1], duration); //时间单位是秒  重置前台cookie
                await next()
            } catch (error) {
                ctx.body = {
                    code: 0,
                    data: error,
                    msg: '服务报错'
                };
            }
        } else {
            ctx.body = {
                loginMiss: true
            };
            await next()
        }
     }
}

module.exports = Interceptor;