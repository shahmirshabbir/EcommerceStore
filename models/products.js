const db = require('../config/db')

exports.getProduct = (id, callback) =>{
    db.query('Select * from products where id = ?',id , (err , results)=>{
        if(err) return callback(err)
        return callback(null, results)
    })
}

exports.addProduct = (name , cat , description , price , imgPath , callback)=>{
    // const {name , cat , description , price , img } = item
    console.log(name , cat , description , price , imgPath )
    let query = "INSERT INTO products (name , cat , description , price , img ) VALUES (?,?,?,?,?)"
    db.query(query , [name , parseInt(cat, 10) , description , parseFloat(price) , imgPath] , callback)
}

exports.deleteProduct = (id , callback)=>{
    let query = "DELETE from products where id = ?"
    db.query(query , id, callback)
}

exports.getAllProducts = (page , callback)=>{
    let query = "Select * from products "
    db.query(query , callback)
}

exports.getByCat = (cat , callback) =>{
    let query = "Select * from products where cat = ?"
    db.query(query ,cat , callback)
}

exports.updateProduct = (item , callback)=>{
    const {name , cat , description , price , img } = item
    let query = "UPDATE products SET name = ? , cat =? , description=? , price=? , img=? "
    db.query(query , [name , cat , description , price , img  ] ,callback)
}

