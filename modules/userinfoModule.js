const Store = require("../config/Store");
const redisStore = new Store();
exports.userinfo = async (ctx, next) => {
    let token; // 获取jwt
    /* if (ctx.header.authorization && ctx.headers.authorization.split(' ')[0] === "Bearer") {
        token = ctx.header.authorization.split(' ')[1]
    } else if (ctx.query && ctx.query.token) {
        token = ctx.query.token
    } */
 /*    redisStore.get('SESSIONID').then(res => {
        console.log('SESSIONID', res);
    },err=>{}) */
    ctx.body = {
        msg: '登陆状态',
        data: {
            phone: '1111',
            token: '123123123'
        },
        code: 1
    }
    // console.log('123',token);
    /* let payload
    if (token) {
        payload = await verify(token, 'andy') // // 解密，获取payload
        ctx.body = {
             msg: '登陆状态',
             data: {
                 phone:'1111',
                 token: payload
             },
             code: 1
        }
    } else {
        ctx.body = {
            message: 'token 错误',
            code: 0
        }
    } */
}