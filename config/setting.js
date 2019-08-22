const staticCache = require('koa-static-cache');
const bodyParser = require('koa-bodyparser');
const path = require("path");
const session = require("koa-session2");
// const jwt = require('jsonwebtoken');
const util = require('util');
// const verify = util.promisify(jwt.verify);
const Store = require("./Store");
const routerPage = require('./routerPage');
const publicData = require('./publicData');
const check = require('./check')
const Interceptor = require('./Interceptor')
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
    //app.use(check);//使用jwt 拦截器
    
    app.use(session({
        key: "SESSIONID",
        store: new Store()
    }));
    
    app.use(Interceptor) //使用session 拦截器
    /* app.use(ctx => {
        // refresh session if set maxAge
        ctx.session.refresh()
    }) */
}