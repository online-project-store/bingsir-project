const proxy = require('http-proxy-middleware')

module.exports = function (app) {
    app.use(proxy('/api', {
        target: 'http://127.0.0.1:8000',
        secure: false,
        changeOrigin: false, //如果请求站点为https，加上这个"changeOrigin":true
        pathRewrite: {
            "^/api": "/"
        }
    }))
}

/* const proxy = require('http-proxy-middleware');

module.exports = function (app) {
    app.use(proxy('/house', {
        target: 'https://evaluatepre.jd.com'
    }));
    app.use(proxy('/vehicle', {
        target: 'https://evaluatepre.jd.com'
    }));
    app.use(
        proxy("/user", {
            target: "https://test.com",
            changeOrigin: true
        })
    );

}; */

