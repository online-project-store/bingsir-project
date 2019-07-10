// 公共数据，每个路由里面都要该数据
module.exports = function (app) {  
    app.use(async (ctx, next) => {
        ctx.state = {
            userName: '张三'
        }
        // 继续向下匹配路由
        await next();
    });
}