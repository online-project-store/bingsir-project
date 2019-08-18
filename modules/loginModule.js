const moment = require("moment");
const fs = require("fs");
const sql = require('../sql/mysql');
const jwt = require('jsonwebtoken');
// const util = require('util');
// const verify = util.promisify(jwt.verify);
// const rp = require('request-promise');
// const jsonwebtoken = require('jsonwebtoken')
exports.login = async (ctx, next) => {
    let user = {
        phone: ctx.request.body.phone,
        password: ctx.request.body.password,
    }
    if (user.username !== "" && user.password !== "") {
        await sql.findUsersByPhone(user.phone).then(result => {
            if (result.length > 0) {
                if (user.password != result[0].user_password) {
                    ctx.body = {
                        code: 1,
                        msg: "密码有误",
                        data: "输入的密码有误",
                    }
                } else {
                    const userToken = {
                        id: result[0].id,
                        phone: result[0].user_telephone_number,
                        time: new Date().getTime(),
                        timeout: 3600000 * 2 //2小时
                    }
                    const token = jwt.sign(userToken, "andy", {
                        expiresIn: '1h'
                    }); //token签名 有效期为1小时

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
}

exports.register = async (ctx, next) => {
    let data = {
        email: ctx.request.body.email,
        phone: ctx.request.body.phone,
        password: ctx.request.body.password,
        confirmPwd: ctx.request.body.confirmPwd,
    }

    if (data.email && data.password && data.phone && data.password === data.confirmPwd) {
        // data.img = ""
        await sql.findUsersByPhone(data.phone).then(async res => {
            data.nickname = 'bingsir'+data.phone.substring(7);
            if (res.length > 0) {
                ctx.body = {
                    code: 1,
                    data: '用户已经存在',
                    msg: "创建用户失败"
                }
            } else {
                let interUser =  await sql.insertUsers([data.password, data.email, '', moment().format('YYYY-MM-DD, H:mm:ss'), data.phone, data.nickname]).then(res => {
                    return res;
                }, err => {
                    ctx.body = {
                        code: 0,
                        data: err,
                        msg: "插入失败"
                    }
                });
                let rid = 3;//1: 超级管理员 2:管理员 3:普通用户
                switch (data.phone) {
                    case '17600113369':
                        rid = 1;
                        break;
                    case '17600113368':
                        rid = 2;
                        break;
                    default:
                        rid = 3;
                        break;
                };
                if (interUser.affectedRows == 1) {
                   let insertUserRole = await sql.insertUserRole([interUser.insertId, rid]); //用户角色关系
                   if (insertUserRole.affectedRows==1) {
                        ctx.body = {
                            code: 1,
                            data: 'success',
                            msg: "创建成功"
                        }
                   }
                }else{
                    ctx.body = {
                        code: 1,
                        data: 'err',
                        msg: "数据插入失败"
                    }
                }
                /* let base64Data = data.img.replace(/^data:image\/\w+;base64,/, "");
                if (!base64Data) {
                    ctx.body = {
                        code: 0,
                        data: null,
                        msg: "头像创建失败"
                    }
                    return false;
                }
                let dataBuffer = new Buffer(base64Data, 'base64');
                let getName = Number(Math.random().toString().substr(3)).toString(36) + Date.now();
                
                async function upload() {
                    await fs.writeFile('static/images/' + getName + '.png', dataBuffer, err => {
                        if (err) {
                            throw new Error(err);
                        }
                    });
                }
                upload().then(() => {
                    sql.insertUsers([data.password, data.email, getName + '.png', moment().format('YYYY-MM-DD, H:mm:ss'), data.phone, data.nickname]).then(res => {
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
                }).catch(err => console.log(err)); */
            }
        }, err => {
            ctx.body = {
                code: 0,
                data: err,
                msg: "创建用户失败"
            }
        })
    } else {
        ctx.body = {
            code: 0,
            data: {},
            msg: "输入信息有误"
        }
    }
}

