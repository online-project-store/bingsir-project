const Router = require('koa-router');
const router = new Router();
const sql = require('../sql/mysql');
const jwt = require('jsonwebtoken');
const util = require('util');
const verify = util.promisify(jwt.verify);
const rp = require('request-promise');
const moment = require('moment');

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
router.post('/login', async (ctx, next) => {
   let user = {
       username: ctx.request.body.username,
       password: ctx.request.body.password,
   }
   console.log(user);
   
   if (user.username !== "" && user.password !== "") {
       await sql.findUsersByName(user.username).then(result => {
           console.log(result);
           if (result.length > 0) {
                    if (user.password != result[0].password) {
                        ctx.body = {
                            code: 1,
                            msg: "密码有误",
                            data: "输入的密码有误",
                        }
                    }else{
                        const userToken = {
                            id: result[0].id,
                            username: result[0].username,
                            time: new Date().getTime(),
                            timeout: 3600000*2 //2小时
                        }
                        // console.log(userToken);
                        const token = jwt.sign(userToken, "andy", {expiresIn: '1h'});//token签名 有效期为1小时
                        
                        ctx.body = {
                            code: 1,
                            msg: "成功",
                            data: {
                                result,
                                token
                            },
                        }
                    }
                } else {
                    ctx.body = {
                        code: 0,
                        msg: "账户信息报错",
                        data: result,
                    }
                }
        }, err => {
                ctx.body = {
                    code: 0,
                    msg: "账户信息报错",
                    data: err,
                }
            })
        } else {
            ctx.body = {
                code: 0,
                msg: "用户名或密码为空"
            }
        }
});

router.post('/register',async (ctx,next) => {
    let data = {
        username: ctx.request.body.username,
        password: ctx.request.body.password,
        phone: ctx.request.body.phone,
        confirmPwd: ctx.request.body.confirmPwd,
        img:'',
    }
    //phone,username,password,img,moment

    if (data.username && data.password && data.phone && data.password === data.confirmPwd) {

        await sql.findUsersByName(data.username).then(async res=>{
            console.log(res);
            
            if(res.length>0){
                ctx.body = {
                    code: 1,
                    data: '用户已经存在',
                    msg: "创建用户失败"
                }
            }else{
              await  sql.insertUsers([data.phone, data.username, data.password, data.img, moment().format('YYYY-MM-DD, H:mm:ss')]).then(res => {
                    ctx.body = {
                        code: 1,
                        data: 'success',
                        msg: "创建成功"
                    }
                }, err => {
                    ctx.body = {
                        code: 0,
                        data: err,
                        msg: "插入失败"
                    }
                })
            }
        },err=>{
            ctx.body = {
                code: 0,
                data: err,
                msg: "创建用户失败"
            }
        })
    }else{
       ctx.body = {
           code: 0,
           data:{},
           msg: "密码不正确"
       }
    }
})

router.post('/userinfo', async (ctx, next) => {
    let token ; // 获取jwt
    /* if (ctx.header.authorization && ctx.headers.authorization.split(' ')[0] === "Bearer") {
        token = ctx.header.authorization.split(' ')[1]
    } else if (ctx.query && ctx.query.token) {
        token = ctx.query.token
    } */

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
})

module.exports = router;