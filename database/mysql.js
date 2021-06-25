const mysql = require('mysql2')

const pool = mysql.createPool({
    host:'localhost',
    user:'root',
    database:'mysampleapi',
    password:'Dhana@thapovan'
});

module.exports=pool.promise()