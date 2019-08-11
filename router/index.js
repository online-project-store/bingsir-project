const Router = require('koa-router');
const router = new Router();
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);
const rp = require('request-promise');
const moment = require('moment');
const sql = require('../sql/mysql');
const loginModule = require('../modules/loginModule');
const luserinfoModule = require('../modules/luserinfoModule');
/* router.get("/*", async (ctx, next) => {
    await ctx.render('/index')
}); */

router.get("/*", async (ctx, next) => {
    await ctx.render('/index');
});

/*
//使用ejs渲染页面 
router.get('/home', async (ctx) => {
    let title = '你好ejs';
    let list = ['哈哈', '嘻嘻', '看看', '问问'];
    let content = "<h2>这是一个h2</h2>";
    let num = 10;
    await ctx.render('page/index', {
      data: {
          title,
          list,
          content,
          num,
      }
    });
}); */
router.post('/login', loginModule.login);

router.post('/register', loginModule.register);

router.post('/userinfo', luserinfoModule.userinfo);

module.exports = router;