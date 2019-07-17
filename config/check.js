const Promise = require("bluebird");
const jwt = require("jsonwebtoken");
const verify = Promise.promisify(jwt.verify);

async function check(ctx, next) {
    let url = ctx.request.url;
    // 登录 不用检查
    if (url == "/login" || url == "/register") await next();
    else {
        // 规定token写在header 的 'autohrization' 
        let token; // 获取jwt
        if (ctx.header.authorization && ctx.headers.authorization.split(' ')[0] === "Bearer") {
            token = ctx.header.authorization.split(' ')[1]
        } else if (ctx.query && ctx.query.token) {
            token = ctx.query.token
        }
        // 解码
        try {
           let payload = await verify(token, 'andy');
           let { time, timeout } = payload;
           let data = new Date().getTime();
           if (data - time <= timeout) {
               // 未过期
               await next();
           } else {
               //过期
               ctx.body = {
                   code: 0,
                   status: 50014,
                   data:'',
                   msg: 'token 已过期'
               };
           }
        } catch (error) {
            ctx.body = {
                status: 401,
                code: 0,
                data: {
                    error
                },
                msg: '无权限'
            };
        }
    }
   
}

module.exports = check
