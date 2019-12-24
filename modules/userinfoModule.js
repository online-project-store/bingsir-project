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