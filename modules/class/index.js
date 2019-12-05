/* const sql = require('../../sql/mysql');
exports.classModules = async (ctx, next) => {
    
    let classList = await sql.findClassify();
    //console.log(classList);
    try {
        if (classList.length > 0) {
            ctx.body = {
                code: 1,
                data: {
                    classList
                },
            }
        } else {
            ctx.body = {
                code: 0,
                data: null,
                msg: "暂无数据",
            }
        }
    } catch (err) {
        ctx.body = {
            code: 0,
            msg: "账户信息报错",
            data: err,
        }
    }
} */