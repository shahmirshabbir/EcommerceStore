const { json } = require('express')
const db = require('../config/db')
const helper = require("../helper")
const category = require("./category")

exports.getProduct = async (id) =>{
    return await db.execute('Select * from products where id = ?',[id]) 
}

exports.addProduct = async (name , cat , description , price , imgPath ,val)=>{
    // category.updateCount(cat, 1);
    let query = "INSERT INTO products (name , cat , description , price , img, count ) VALUES (?,?,?,?,?,?)"
    return await db.execute(query , [name , parseInt(cat, 10) , description , parseFloat(price) , imgPath ,parseInt(val, 10)])
}

exports.deleteProduct = async (id)=>{
        let query = "Select img,cat from products where id = ?"
        const [rows] = await db.execute(query , [id])
        helper.delImg(rows[0].img)
        // cat = result[0].count
        // category.updateCount(rows[0].cat, -1); 
        return await db.execute("DELETE from products where id =?",[id])
}
  
exports.getAllProducts = async (page)=>{ 
    page = (page-1)*20
        let query = `Select * from products limit 20 offset ${page}`
    return await db.execute(query)
}

exports.getByCat = async (cat) =>{
    let query = "Select * from products where cat = ? "
    return await db.execute(query , [cat])
}

// exports.updateName = (id , name , callback)=>{
//     let query = "UPDATE products SET name = ?  where id = ? "
//     db.query(query , name ,id ,callback)
// }

// exports.updateDescription = (id , des , callback)=>{
//     let query = "UPDATE products SET description = ?  where id =?"
//     db.query(query , des,id  ,callback)
// }

// exports.updateCat = (id , cat , callback)=>{
//     let query = "UPDATE products SET cat = ? where id=? "
//     db.query(query , cat ,id ,callback)
// }

// exports.updatePrice = (id , price , callback)=>{
//     let query = "UPDATE products SET price = ? where id =? "
//     db.query(query , price,id  ,callback)
// }

// exports.updateName = (id , img , callback)=>{
//     let query = "UPDATE products SET img = ? where id=? "
//     db.query(query , img ,id ,callback)
// }

exports.updateProduct = async ( id, name , cat , description , price , imgPath , val)=>{
    let q1 = "Select img from products where id = ?"
        const [rows] = await db.execute(q1 , [id])
        helper.delImg(rows[0].img)

        let query = "UPDATE products SET name=? , cat=? , description =?, price =?, img=? ,count =?  where id =?"
        return await db.execute(query ,[name , parseInt(cat, 10) , description , parseFloat(price) , imgPath ,parseInt(val, 10) , id])

}

exports.updateCount = async (id , val)=>{
    const [rows] = await db.execute("Select count from products where id = ?", id)
    let query = "UPDATE products SET count = ?  where id =?"
    return await db.execute(query , [val + rows[0].count, id])
}

exports.getCount = async (id)=>{
    const query = "Select count from products where id = ?";
    return await db.execute(query , [id])
}