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
createTbale(tables.friends);
createTbale(tables.articles);
createTbale(tables.comments);
const insertUsers = (value) => {
    let _sql = `insert into users(phone,username,password,img,moment) values(?,?,?,?,?)`;
    return query(_sql, value)
}

const findUsersByName = (value) => {
    let _sql = `SELECT * FROM users WHERE username = "${value}"`;
    return query(_sql);
}



module.exports = {
    insertUsers,
    findUsersByName,
}