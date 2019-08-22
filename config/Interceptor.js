const Store = require("../config/Store");
const sql = require('../sql/mysql');
const redisStore = new Store();
async function Interceptor(ctx, next) {
    let user = {
        phone: ctx.request.body.phone,
        password: ctx.request.body.password,
    }
    
    let url = ctx.request.url;
     if (url == "/login" || url == "/register" || url == "/") await next();
     else{
        let data = await redisStore.get(ctx.session.redisData);
        // console.log(data);
        // await next();
        if (data && !!data.phone) {
            console.log(data.phone);
            //let resetTime = await redisStore.expire(ctx.session.redisData, 1000); //时间单位是秒
            let redisData = await redisStore.set({phone:data.phone},{sid:ctx.session.redisData});
            console.log(redisData);
            /* if (!redisData) {
                ctx.body = {
                    code: 0,
                    data: '',
                    msg: '重置登录失效'
                };
            } */
            await next()
        } else {
            ctx.body = {
                code: 0,
                data: '',
                msg: '登录已失效,请重新登录'
            };
        }
     }
}

module.exports = Interceptor;