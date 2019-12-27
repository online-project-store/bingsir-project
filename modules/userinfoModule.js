const Store = require("../config/Store");
const moment = require('moment');
const sql = require('../sql/mysql');
moment.locale('zh-cn');
// const redisStore = new Store();
exports.getUserData = async (ctx, next) => {
    let userinfo = await sql.userinfo();
    userinfo.forEach(item => {
        item.time = moment(item.user_registration_time).format("YYYY-MM-DD HH:mm:ss");
        return item;
    });
    ctx.body = {
        code: 1,
        data: {
            userinfo
        }
    }
}

exports.updateUserSign = async (ctx, next) => {
    let obj = ctx.request.body;
    let result = await sql.updateUserSign(obj);
    try {
        ctx.body = {
            code: 1,
            data: {
                result
            }
        }
    } catch (error) {
        ctx.body = {
            code: 1,
            data: {
                result: error
            }
        }
    }
}

exports.userinfoById = async (ctx, next) => {
    let id = ctx.request.body.id;
    let result = await sql.findPower(id);
    try {
        ctx.body = {
            code: 1,
            data: {
                result
            }
        }
    } catch (error) {
        ctx.body = {
            code: 1,
            data: {
                result: error
            }
        }
    }
}