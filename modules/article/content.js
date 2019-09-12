const sql = require('../../sql/mysql');
//user_id,article_title,article_content,article_views,article_comment_count,article_date,article_like_count
exports.insertarticle = async (ctx, next) => {
    
    console.log(ctx.session);
    
    
    /* let articleCon = ctx.request.body;
    console.log(articleCon);
    
    if (articleCon.article_content) {
        try {
           //let sqlArticleContent = await sql.insertArticle([user_id, articleCon.article_title, articleCon.article_content, article_views])
        } catch (err) {
            
        }  
    } */
    ctx.body = {
        code: 1,
        data: {
            
        },
    }
}