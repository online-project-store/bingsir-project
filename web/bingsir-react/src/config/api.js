
// const prefix = '/api' // api地址前缀
export default (config => {
    return Object.keys(config).reduce((copy, name) => {
        copy[name] = `${config[name]}`
        return copy
    }, {})
})({
    "login": "/login",
    "register": "/register",
    "userinfo": "/userinfo",
    "classlist": "/class-list",
    "insertarticle": "/insertarticle",
    "loginStatus": "/loginStatus",
    "getarticlelist": "/getarticlelist",
    "getArticleDetails": "/get-article-details",
    "toFollow": "/to-follow",
    "classifyList": "/classify-list",
    'classifyTagList': "/classify-tag-list",
    "sendView": "/send-view",
    "getUserData": "/get-user-data",
    "updateUserSign": "/update-user-sign",
    "userinfoById": '/userinfo-by-id'
})
