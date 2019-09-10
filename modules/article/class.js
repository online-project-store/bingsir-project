const sql = require('../../sql/mysql');
exports.classlist = async (ctx, next) => {
   /*  let userSendData = ctx.request.body;
    
    if (userSendData.classlist) {
       
    } */
    let classList = await sql.findClasslist();
    console.log(classList);
    if (classList.length>0) {
        ctx.body = {
            code: 1,
            data: {
                classList
            },
        }
    }
    
}