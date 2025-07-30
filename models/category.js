const db = require('../config/db')
const helper = require("../helper")
const product = require("./products")

// exports.getCategory  = (id, callback) =>{
//     db.query('Select * from products where id = ?',id , (err , results)=>{
//         if(err) return callback(err)
//         return callback(null, results)
//     })
// }

exports.addCategory = async (name ,count, imgPath)=>{
    // const {name , cat , description , price , img } = item
    // console.log(name , cat , description , price , imgPath ,val)
    let query = "INSERT INTO category (name , count,  img ) VALUES (?,?,?)"
    return await db.execute(query , [name , parseInt(count, 10) , imgPath ])
}

exports.deleteCategory = async (id )=>{
    const imgs = await product.getImgByCat(id) 
    imgs[0].forEach(i => helper.delImg(i.img));
    // console.log(imgs) 
    // return imgs[0][0].img
    let query = "Select img from category where id = ?"
    const [result] = await db.execute(query , [id])
        helper.delImg(result[0].img)

    return await db.execute("DELETE from category where id =?",[id])
}

exports.getAllCategory = async()=>{
    let query = "Select * from category "
    return await db.execute(query)
}

// exports.getByCat = (cat , callback) =>{
//     let query = "Select * from products where cat = ? "
//     db.query(query , cat , callback)
// }

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

exports.updateCategory = async( id, name ,count, imgPath)=>{
    let q1 = "Select img from category where id = ?"
    const [rows] = await db.execute(q1 , [id])
        helper.delImg(rows[0].img)

    let query = "UPDATE category SET name=? , count=?, img=? where id =?"
    return await db.execute(query ,[name , parseInt(count, 10) , imgPath , id] )
}

exports.updateCount = async(id , val)=>{
    // let temp =0;
    // console.log(id)
    const [rows] = await db.execute("Select count from category where id = ?", [id])
    // console.log("count: ", val)
    let query = "UPDATE category SET count = ?  where id =?"
    return await db.query(query , [val+rows[0].count, id ])
}

exports.getCount = async (id)=>{
    
    const query = "Select count from category where id = ?";
    return await db.execute(query , [id])
}