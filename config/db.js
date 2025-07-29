const mysql = require('mysql2')
const connection = mysql.createConnection({
    host : "localhost",
    user : "root",
    password : "root",
    database: 'mydb'
});

connection.connect((err)=>{
    if(err) throw err
    console.log("DB connected")
})

module.exports = connection