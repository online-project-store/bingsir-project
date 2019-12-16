const mysql = require('mysql')
const tables = require('./tables')
const config = require("./config")
// 创建数据池
const pool = mysql.createPool({
    host: config.host, // 数据库地址
    user: config.user, // 数据库用户
    password: config.password, // 数据库密码
    port: config.port,
    database: config.database // 选中数据库
})

const query = (sql, values) => {
    // 在数据池中进行会话操作
    return new Promise((resolve, reject) => {
        pool.getConnection(function (err, connection) {
            if (err) {
                reject(err)
            } else {
                connection.query(sql, values, (err, rows) => {
                    if (err) {
                        reject(err)
                    } else {
                        resolve(rows)
                    }
                    // 结束会话
                    connection.release()
                })
            }
        })
    })
}
const createTbale = (sql) => {
    query(sql, []);
}


createTbale(tables.options);
createTbale(tables.users);
createTbale(tables.articles);
createTbale(tables.classify);
createTbale(tables.tag);
createTbale(tables.menu);
createTbale(tables.role);
createTbale(tables.blogroll);
createTbale(tables.friends);
createTbale(tables.comments);
createTbale(tables.bbs);
createTbale(tables.bbs_card);
createTbale(tables.bbs_card_reply);
createTbale(tables.classify_articles);
createTbale(tables.tag_articles);
createTbale(tables.user_role);
createTbale(tables.role_menu);
createTbale(tables.follow);
/* 
        user_password varchar(60) NOT NULL COMMENT '密码',
        user_email varchar(30) NOT NULL COMMENT '用户邮箱',
        user_profile_photo varchar(255) NOT NULL COMMENT '用户头像',
        user_registration_time datetime NOT NULL COMMENT '用户注册时间',
        user_telephone_number char(11) NOT NULL COMMENT '用户手机号',
        user_nickname varchar(20) NOT NULL COMMENT '用户昵称',
    */
const insertUsers = (value) => {
    let _sql = `insert into users(user_password,user_email,user_profile_photo,user_registration_time,user_telephone_number,user_nickname) values(?,?,?,?,?,?)`;
    return query(_sql, value)
}

const findUsersByName = (value) => {
    let _sql = `SELECT * FROM users WHERE user_telephone_number = "${value}" OR user_email  = "${value}"`;
    return query(_sql);
}

// uid INT NOT NULL COMMENT '用户id',
// rid INT NOT NULL COMMENT '角色id', //1: 超级管理员 2:管理员 3:普通用户
const insertUserRole = (value) => {
    let _sql = `insert into user_role(uid,rid) values(?,?)`;
    return query(_sql, value);
}

const findClassify = (value) => {
    let _sql = '';
    if (!!value) {
        _sql = `SELECT * FROM classify WHERE class_name = "${value}"`;
    }else{
        _sql = `SELECT * FROM classify`;
    }
    return query(_sql);
}

const insertArticle = (value) => {
    let _sql = `insert into articles(user_id,article_title,article_content,article_views,article_comment_count,article_date,article_like_count) values(?,?,?,?,?,?,?)`;
    return query(_sql, value);
}

const insertTag = (value) => {
    let _sql = `insert into tag(tag_name,tag_description,tag_another_name) values(?,?,?)`;
    return query(_sql, value);
}
const insert_tag_article = (value) => {
    let _sql = `insert into tag_articles(tag_id,article_id) values(?,?)`;
    return query(_sql, value);
}
const insert_classify_articles = (value) => {
    let _sql = `insert into classify_articles(classify_id,article_id) values(?,?)`;
    return query(_sql, value);
}

const findArticlebyUser = (value) => {
    let _sql = `select * from articles where user_id = "${value}"`;
    return query(_sql);
}
const findArticlebyArticle_id = (value) => {
    let _sql = `select * from articles where article_id = "${value}"`;
    return query(_sql);
}
const findUserbyUser_id = (value) => {
    let _sql = `select * from users where user_id = "${value}"`;
    return query(_sql);
}
const findTagbyTag_id = (value) => {
    let _sql = `select * from tag where tag_id = "${value}"`;
    return query(_sql);
}
const findArticleList = (pageNum, pageSize) => {
    let page_sign = (pageNum - 1) * pageSize;
    let _sql = `SELECT a.article_comment_count,a.article_date,a.article_like_count,a.article_id,a.article_title,a.article_views,t.tag_name,t.tag_id,u.user_nickname,u.user_id 
        FROM articles a LEFT JOIN tag_articles t_a ON  
        a.article_id = t_a.article_id LEFT JOIN tag t ON 
        t_a.tag_id = t.tag_id LEFT JOIN users u ON a.user_id = u.user_id 
        ORDER BY a.article_views LIMIT ${page_sign}, ${pageSize}`;
    return query(_sql);
}
//https://www.runoob.com/note/28032
/* SELECT * FROM articles WHERE id >=(SELECT id FROM articles WHERE category_id = 123 ORDER BY id LIMIT 10000, 1) LIMIT 10 */

const findArticleNum = ()=>{
    let _sql = `SELECT COUNT(*) FROM articles`;
    return query(_sql);
}

const setFollow = (obj) => {
    //let _sql = `insert into follow(uid,status_sign,followed_user) values(?,?,?)`;
     let _sql = `INSERT INTO follow(uid, status_sign, followed_user) SELECT ${obj.userid}, ${obj.followSign}, ${obj.followUserid}
        FROM DUAL
        WHERE NOT EXISTS(SELECT * FROM follow WHERE followed_user = ${obj.followUserid});`
     return query(_sql)
}
const updateFollow = (obj) => {
    let _sql = `UPDATE follow SET status_sign = ${obj.followSign} WHERE uid = ${obj.userid} AND followed_user = ${obj.followUserid};`
    return query(_sql)
}

const findTagList = ()=>{
    let _sql = `SELECT * from tag`;
    return query(_sql)
}

const selectTagAndClass = (obj) => {
    console.log(obj);
    let _sql;
    if (!obj.tag && !obj.class) {
         _sql = `SELECT a.article_comment_count,a.article_date,a.article_like_count,a.article_id,a.article_title,a.article_views,t.tag_name,t.tag_id,u.user_nickname,u.user_id,c.class_name
            FROM articles a LEFT JOIN tag_articles t_a 
            ON a.article_id = t_a.article_id LEFT JOIN tag t 
            ON t_a.tag_id = t.tag_id LEFT JOIN users u 
            ON a.user_id = u.user_id LEFT JOIN classify_articles c_a
            ON a.article_id = c_a.article_id LEFT JOIN classify c
            ON c_a.classify_article_id = c.class_id`
    } else if (obj.tag && obj.class) {
         _sql = `SELECT a.article_comment_count,a.article_date,a.article_like_count,a.article_id,a.article_title,a.article_views,t.tag_name,t.tag_id,u.user_nickname,u.user_id,c.class_name
            FROM articles a LEFT JOIN tag_articles t_a 
            ON a.article_id = t_a.article_id LEFT JOIN tag t 
            ON t_a.tag_id = t.tag_id LEFT JOIN users u 
            ON a.user_id = u.user_id LEFT JOIN classify_articles c_a
            ON a.article_id = c_a.article_id LEFT JOIN classify c
            ON c_a.classify_article_id = c.class_id WHERE t.tag_name IN (${obj.tag}) AND c.class_name IN (${obj.class});`
    }else{
        _sql = `SELECT a.article_comment_count,a.article_date,a.article_like_count,a.article_id,a.article_title,a.article_views,t.tag_name,t.tag_id,u.user_nickname,u.user_id,c.class_name
            FROM articles a LEFT JOIN tag_articles t_a 
            ON a.article_id = t_a.article_id LEFT JOIN tag t 
            ON t_a.tag_id = t.tag_id LEFT JOIN users u 
            ON a.user_id = u.user_id LEFT JOIN classify_articles c_a
            ON a.article_id = c_a.article_id LEFT JOIN classify c
            ON c_a.classify_article_id = c.class_id WHERE t.tag_name IN (${obj.tag}) OR c.class_name IN (${obj.class});`
    }
    return query(_sql); 
}

module.exports = {
    insertUsers,
    findUsersByName,
    insertUserRole,
    findClassify,
    insertArticle,
    insertTag,
    insert_tag_article,
    insert_classify_articles,
    findArticlebyUser,
    findArticleList,
    findArticleNum,
    findArticlebyArticle_id,
    findUserbyUser_id,
    findTagbyTag_id,
    setFollow,
    updateFollow,
    findTagList,
    selectTagAndClass
}