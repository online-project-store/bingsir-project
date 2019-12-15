const sql = require('../../sql/mysql');
exports.classlist = async (ctx, next) => {
    let classList = await sql.findClassify();
    let findTagList = await sql.findTagList();
    // console.log(findTagList);
    try {
        if (classList.length > 0) {
            ctx.body = {
                code: 1,
                data: {
                    classList,
                    findTagList
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
}