const sql = require('../../sql/mysql');
const moment = require('moment');
moment.locale('zh-cn');
exports.insertarticle = async (ctx, next) => {
    let articleCon = ctx.request.body;
    let user = await sql.findUsersByName(ctx.session.phone);
    let article_date = new Date(); //2015-12-20 10:01:00
    // console.log(articleCon, article_date, user[0].user_id);
    let article_views = 0,
        article_comment_count = 0,
        article_like_count = 0;
    if (articleCon.article_content) {
        let insertTag;
        try {
            let findClassify = await sql.findClassify(articleCon.classify);
            let findTagName = await sql.findTagbyText(articleCon.tag_name);
             console.log('findTagName====>>', findTagName);

            if (findTagName.length == 0) {
                let  reasultInsert = await sql.insertTag([articleCon.tag_name, articleCon.tag_description, articleCon.tag_another_name]);
                console.log('insertTag===>>', insertTag);
                insertTag = reasultInsert.insertId;
            }else(
                insertTag = findTagName[0].tag_id
            );
           
           
           let sqlArticleContent = await sql.insertArticle([user[0].user_id, articleCon.article_title, articleCon.article_content, article_views, article_comment_count, article_date, article_like_count]);
           if (sqlArticleContent.affectedRows == 1 && findClassify[0].class_id) {
               console.log('insertTag====>>>', insertTag);
               
               await sql.insert_tag_article([insertTag.trim(), sqlArticleContent.insertId]); //标签文章关系表
               await sql.insert_classify_articles([findClassify[0].class_id, sqlArticleContent.insertId]);//分类文章关系表
               ctx.body = {
                   code: 1,
                   data: sqlArticleContent
               }
           }else{
               ctx.body = {
                   code: 1,
                   data: null,
                   msg:'数据出错'
               }
           }
        } catch (err) {
            ctx.body = {
                code: 1,
                data: err,
                msg:'插入数据出错'
            }
        }  
    }
}

exports.getarticlelist = async (ctx, next) => {
     let pageMessage = ctx.request.body;
     if (pageMessage.pageNum && pageMessage.pageSize) {
        let articleList = await sql.findArticleList(pageMessage.pageNum, pageMessage.pageSize);
        let totalPages = await sql.findArticleNum();
        let num = totalPages[0]['COUNT(*)'];
        articleList.map((item,index)=>{
            item.time = moment(item.article_date, "YYYYMMDD").fromNow();
            return item; 
        })
        ctx.body = {
            code: 1,
            data: {
                articleList,
                totalPages: num
            },
        }
     }else{
         ctx.body = {
             code: 1,
             data: null,
             msg: '参数有误'
         }
     }
}

exports.getArticleDetails = async (ctx, next) => {
    let pageMessage = ctx.request.body;
    // { article_id: 13, user_id: 8, tag_id: 16 }
    if (pageMessage.article_id && pageMessage.user_id && pageMessage.tag_id) {
        
        let articleinfo = await sql.findArticlebyArticle_id(pageMessage.article_id);
        let userinfo = await sql.findUserbyUser_id(pageMessage.user_id);
        let taginfo = await sql.findTagbyTag_id(pageMessage.tag_id);
        // console.log(articleinfo, userinfo, taginfo);
        articleinfo.map((item, index) => {
            item.createdTime = moment(item.article_date).format("YYYY-MM-DD");
            return item;
        })
        ctx.body = {
            code: 1,
            data: {
                articleinfo,
                userinfo,
                taginfo
            }
        }
    } else {
        ctx.body = {
            code: 1,
            data: {
                msg: '参数有误'
            }
        }
    }
}

exports.follow = async (ctx,next)=>{
     //userid 当前用户id  followUserid 关注用户id  followSign:1 //关注 
    //uid,status_sign,followed_user
    let userData = ctx.request.body;
   // console.log(userData);
    /*
        followSign: 1
        followUserid: 9
        userid: 14
     */
    if (userData.userid && userData.followUserid) {
       // let setFollow = await sql.setFollow([userData.userid, userData.followSign, userData.followUserid]);
       let setFollow = await sql.setFollow({
           userid : userData.userid,
           followSign : userData.followSign,
           followUserid : userData.followUserid
       });
       console.log(setFollow);
       
        if (setFollow.affectedRows == 1) {
             ctx.body = {
                 code: 1,
                 data: {
                     setFollow
                 }
             }
        } else if (setFollow.affectedRows == 0) {
             let updateFollow = await sql.updateFollow({
                 userid: userData.userid,
                     followSign: userData.followSign,
                     followUserid: userData.followUserid
             })
             
             ctx.body = {
                 code: 1,
                 data: {
                     updateFollow
                 }
             }
        }   
    }else{
        ctx.body = {
            code: 1,
            data: {
                msg: '参数有误'
            }
        }
    }
}

exports.sendView = async (ctx, next) => {
    //userid 当前用户id  followUserid 关注用户id  followSign:1 //关注 
    //uid,status_sign,followed_user
    let articleData = ctx.request.body;
    console.log('article_views', articleData.article_views);
    
    if (articleData.article_id) {
        let articleinfo = await sql.updateArticleViews({
            article_id: articleData.article_id,
            article_views: articleData.article_views
        });
        //console.log(articleinfo);
        ctx.body = {
            code: 1,
            data: {
                articleinfo,
                msg:'success'
            }
        }
    } else {
        ctx.body = {
            code: 1,
            data: {
                msg: '参数有误'
            }
        }
    }
}