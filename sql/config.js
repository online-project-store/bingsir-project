let mysqlPasswor;
if (process.env.NODE_ENV == 'prd') {
    mysqlPasswor = "bing@123"
} else if (process.env.NODE_ENV == 'work') {
    mysqlPasswor = "root" //工作环境  
}else{
    mysqlPasswor = "Yubing_123"//my mbp
}
module.exports = {
    user: 'root',
    password: mysqlPasswor,
    database: 'myblogs',
    host: '127.0.0.1',
    port: '3306',
}