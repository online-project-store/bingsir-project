let mysqlPasswor;
if (process.env.NODE_ENV == 'prd') {
    mysqlPasswor = "bing@123"
}else{
    mysqlPasswor = "Yubing_123" //root  
}
module.exports = {
    user: 'root',
    password: mysqlPasswor, //mbp
    database: 'myblogs',
    host: '127.0.0.1',
    port: '3306',
}