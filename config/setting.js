const staticCache = require('koa-static-cache');
const bodyParser = require('koa-bodyparser');
const path = require("path");
const session = require("koa-session2")
const jwt = require('jsonwebtoken')
const jwtKoa = require('koa-jwt')
const util = require('util');
const verify = util.promisify(jwt.verify)
const routerPage = require('./routerPage');
const publicData = require('./publicData');
const check = require('./check')
module.exports = function (app) {
    publicData(app);
    //new routerPage(app); //不放开==>使用ejs。放开==> 用原生渲染页面  页面本质就是带有html的字符串
    app.use(staticCache(path.join(__dirname, '../static'), {
        maxAge: 365 * 24 * 60 * 60,
        dynamic: true,
    }))
    app.use(bodyParser({
        formLimit: '1mb',
    }));
    //数组中的路径不需要通过jwt验证
    //app.use(jwtKoa('andy').unless({path: [/^\/login/,/^\/register/]}));
    /* app.use(session({
        stort: new RedisStore(), //存放session的地方，我這裡選擇放到redis裡
        key: "SESSION_ID"
    })) */
    app.use(check);
    
    
}