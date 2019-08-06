
//网站管理
const options = `create table if not exists options(
    option_id INT NOT NULL AUTO_INCREMENT COMMENT '选项ID',
    option_name VARCHAR(20) NOT NULL COMMENT '选项名称',
    option_values LONGTEXT NOT NULL COMMENT '选项值',
    PRIMARY KEY (option_id),
    KEY option_name(option_name)
) ENGINE = InnoDB DEFAULT CHARSET = utf8;`   
//用户表
const users = `create table if not exists users(
    user_id INT NOT NULL AUTO_INCREMENT COMMENT '用户id',
    user_name varchar(20) NOT NULL COMMENT '用户名',
    user_password varchar(60) NOT NULL COMMENT '密码',
    user_email varchar(30) NOT NULL COMMENT '用户邮箱',
    user_profile_photo varchar(255) NOT NULL COMMENT '用户头像',
    user_registration_time datetime NOT NULL COMMENT '用户注册时间',
    user_telephone_number char(11) NOT NULL COMMENT '用户手机号',
    user_nickname varchar(20) NOT NULL COMMENT '用户昵称',
    PRIMARY KEY(user_id),
    KEY user_name(user_name),
    KEY user_nickname(user_nickname),
    KEY user_email(user_email),
    KEY user_telephone_number(user_telephone_number)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;`
// rbac权限控制 (用户表,角色表,权限表) (用户角色表,角色权限表)
//角色表
/* const role = `create table if not exists role(
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    super_admin varchar(20) NOT NULL COMMENT '超级管理员',
    Administrator varchar(20) NOT NULL COMMENT '管理员',
    normal_user varchar(20) NOT NULL COMMENT '普通用户'
)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;` */
const role = `create table if not exists role(
    role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    role_name VARCHAR(10) NOT NULL COMMENT '角色名称'
)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;`
/* //权限表
const power = `create table if not exists power(
    power_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    power_sign VARCAHR(10) NOT NULL COMMENT '1:超级管理员,2:管理员,3:普通用户'
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8 COMMENT = '权限表';` */
//用户角色表
const user_role = `create table if not exists user_role(
    user_role_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    uid INT NOT NULL COMMENT '用户id',
    rid INT NOT NULL COMMENT '角色id',
    CONSTRAINT fk_uid foreign key(uid) references users(user_id),
    CONSTRAINT fk_rid foreign key(rid) references role(role_id)
)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;`
//用角色去关联具体的权限
/* //角色权限表
const role_power = `create table if not exists role_power(
    role_power_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    pid varchar(20) NOT NULL COMMENT '权限id',
    rid varchar(20) NOT NNULL COMMENT '角色id',
)ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;` */



//用户好友
const friends = `create table if not exists friends(
    friends_id INT NOT NULL AUTO_INCREMENT COMMENT '好友id',
    user_id INT NOT NULL COMMENT '用户id',
    friends_note varchar(20) NOT NULL COMMENT '好友备注',
    friends_status varchar(20) NOT NULL COMMENT '好友状态',
    PRIMARY KEY(friends_id),
    KEY user_id(user_id),
    CONSTRAINT fk_user_id foreign key(user_id) references users(user_id)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;`
//博文表
const articles = `create table if not exists articles(
    article_id INT NOT NULL AUTO_INCREMENT,
    user_id INT NOT NULL,
    article_title text NOT NULL,
    article_content longtext NOT NULL,
    article_views INT NOT NULL,
    article_comment_count int NOT NULL,
    article_date datetime NOT NULL,
    article_like_count INT NOT NULL,
    PRIMARY KEY(article_id),
    KEY user_id(user_id)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;`
//评论表
const comments = `create table if not exists comments(
    comment_id INT NOT NULL AUTO_INCREMENT,
    article_id INT NOT NULL COMMENT '当前评论文章id',
    uid INT NOT NULL COMMENT '发表用户',
    comment_like_count INT NOT NULL COMMENT '点赞数',
    comment_content text NOT NULL COMMENT '评论内容',
    comment_date datetime NOT NULL,
    comment_parent_id INT NOT NULL COMMENT '当前评论谁',
    PRIMARY KEY(comment_id),
    CONSTRAINT fk_comments_article_id foreign key(article_id) references articles(article_id)
) ENGINE = InnoDB AUTO_INCREMENT = 1 DEFAULT CHARSET = utf8;`
//分类
const classify = `create table if not exists classify(
    class_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    class_name VARCHAR(20) not null,
    class_description VARCHAR(60) not null,
    class_another_name VARCHAR(20) not null,
    class_parent_id INT not null,
    KEY class_parent_id(class_parent_id)
)ENGINE = InnoDB  DEFAULT CHARSET = utf8;`
//分类文章关系
const classify_articles = `create table if not exists classify_articles(
    classify_article_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    classify_id INT NOT NULL COMMENT '分类id',
    article_id INT NOT NULL COMMENT '文章id',
    CONSTRAINT fk_classify_id foreign key(classify_id) references classify(class_id),
    CONSTRAINT fk_classify_articles_id foreign key(article_id) references articles(article_id)
)ENGINE = InnoDB  DEFAULT CHARSET = utf8;`
//标签
const tag = `create table if not exists tag(
    tag_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tag_name VARCHAR(20) not null,
    tag_description VARCHAR(60) not null,
    tag_another_name VARCHAR(20) not null
)ENGINE = InnoDB  DEFAULT CHARSET = utf8;`
//标签文章
const tag_articles = `create table if not exists tag_articles(
    tag_article_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    tag_id INT NOT NULL,
    article_id INT NOT NULL,
    CONSTRAINT fk_tag_articles_tag_id foreign key(tag_id) references tag(tag_id),
    CONSTRAINT fk_tag_articles_article_id foreign key(article_id) references articles(article_id)
)ENGINE = InnoDB  DEFAULT CHARSET = utf8;`
//论坛
const bbs = `create table if not exists bbs(
    bbs_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    bbs_name VARCHAR(60) NOT NULL COMMENT '论坛名称',
    bbs_description VARCHAR(100) NOT NULL COMMENT '论坛描述',
    bbs_time datetime NOT NULL COMMENT '创建时间',
    bbs_num INT NOT NULL COMMENT '帖子总数',
    bbs_logo VARCHAR(255) NOT NULL COMMENT '论坛logo',
    bbs_user_id INT NOT NULL COMMENT '发帖用户id',
    CONSTRAINT fk_bbs_user_id foreign key(bbs_user_id) references users(user_id)
)ENGINE = InnoDB  DEFAULT CHARSET = utf8;`
//论坛中的帖子
const bbs_card = `create table if not exists bbs_card(
    bbs_card_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    bbs_id INT NOT NULL COMMENT '论坛id',
    bbs_card_title VARCHAR(50) NOT NULL COMMENT '帖子标题',
    bbs_card_content VARCHAR(100) NOT NULL COMMENT '帖子内容',
    bbs_card_time datetime NOT NULL COMMENT '帖子创建时间',
    bbs_card_user_id INT NOT NULL COMMENT '发帖用户id',
    bbs_card_likenum INT NOT NULL DEFAULT '0' COMMENT '帖子点赞数',
    CONSTRAINT fk_bbs_card_user_id foreign key(bbs_card_user_id) references users(user_id),
    CONSTRAINT fk_bbs_id foreign key(bbs_id) references bbs(bbs_id)
)ENGINE = InnoDB  DEFAULT CHARSET = utf8;`
//论坛中的帖子回复
const bbs_card_reply = `create table if not exists bbs_card_reply(
    bbs_card_reply_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    bbs_card_id INT NOT NULL COMMENT '帖子id',
    bbs_card_reply_content VARCHAR(100) NOT NULL COMMENT '回复帖子内容',
    bbs_card_reply_time datetime NOT NULL COMMENT '回复帖子时间',
    bbs_card_reply_reply_id INT NOT NULL  COMMENT '回帖id(当前回复的是谁)',
    bbs_card_reply_reply_uid INT NOT NULL COMMENT '回帖用户id',
    CONSTRAINT fk_bbs_card_reply_reply_uid foreign key(bbs_card_reply_reply_uid) references users(user_id),
    CONSTRAINT fk_bbs_card_id foreign key(bbs_card_id) references bbs_card(bbs_card_id)
)ENGINE = InnoDB  DEFAULT CHARSET = utf8;`
//菜单
const menu = `create table if not exists menu(
    menu_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    menu_name VARCHAR(20) NOT NULL COMMENT '菜单名称',
    menu_link VARCHAR(40) NOT NULL COMMENT '菜单链接'
)ENGINE = InnoDB  DEFAULT CHARSET = utf8;`
//角色菜单表
const role_menu = `create table if not exists role_menu(
    role_menu_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    role_id INT NOT NULL COMMENT '角色id',
    menu_id INT NOT NULL COMMENT '菜单id',
    CONSTRAINT fk_role_menu_id foreign key(role_id) references role(role_id),
    CONSTRAINT fk_menu_id foreign key(menu_id) references menu(menu_id)
)ENGINE = InnoDB  DEFAULT CHARSET = utf8;`

//友情链接
const blogroll = `create table if not exists blogroll(
    blogroll_id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
    blogroll_name VARCHAR(20) NOT NULL COMMENT '友链名称',
    blogroll_description VARCHAR(20) NOT NULL COMMENT '友链描述',
    blogroll_link VARCHAR(40) NOT NULL COMMENT '友链链接'
)ENGINE = InnoDB  DEFAULT CHARSET = utf8;`

module.exports  ={
    options,
    users,
    friends,
    articles,
    comments,
    classify,
    classify_articles,
    tag,
    tag_articles,
    bbs,
    bbs_card,
    bbs_card_reply,
    menu,
    blogroll,
    role,
    user_role,
    role_menu
}