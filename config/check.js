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
        let payload = await verify(token, 'andy');
        console.log(payload);
        
        let {
            time,
            timeout
        } = payload;
        let data = new Date().getTime();
        console.log(data - time <= timeout);
        
        if (data - time <= timeout) {
            // 未过期
            await next();
        } else {
            //过期
            ctx.body = {
                status: 50014,
                message: 'token 已过期'
            };
        }
    }
}

module.exports = check
