module.exports = function () {
    if (process.env.NODE_ENV == "prd") {
        // 生产
        //global.baseUrl = "http://39.107.249.86:8000";
    } else if (process.env.NODE_ENV == "test") {
        // 测试
        //global.baseUrl = "http://10.30.92.118:10031";
    } else if (process.env.NODE_ENV == "dev") {
        // 开发
        //global.baseUrl = "http://10.0.0.219:8000";
    } else {
        //其他
        //global.baseUrl = "http://192.168.1.246:20012";
    }
};

