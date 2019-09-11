const Store = require("../config/Store");
const sql = require('../sql/mysql');
const redisStore = new Store();
async function Interceptor(ctx, next) {
    let url = ctx.request.url;
     if (url == "/login" || url == "/register" || url == "/") await next();
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
                code: 1,
                lose: true,
                msg: '登录已失效,请重新登录'
            };
        }
     }
}

module.exports = Interceptor;