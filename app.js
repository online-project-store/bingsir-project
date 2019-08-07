const Koa = require('koa');
const views = require('koa-views');
const baseUrl = require("./config/baseUrl");
const setting = require("./config/setting");
const router = require("./router");
const app = new Koa();

baseUrl();

setting(app);

app.use(views('view', {
    root: __dirname + './view',
    default: 'html',
    extension: 'html'
}));
 
app.use(router.routes()).use(router.allowedMethods()); // 返回匹配路由的复合中间件

app.listen(8000,'0.0.0.0', () => {
    console.log("the server is running on port 8000");
})
