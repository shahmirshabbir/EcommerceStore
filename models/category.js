const db = require('../config/db')
const helper = require("../helper")

// exports.getCategory  = (id, callback) =>{
//     db.query('Select * from products where id = ?',id , (err , results)=>{
//         if(err) return callback(err)
//         return callback(null, results)
//     })
// }

exports.addCategory = (name ,count, imgPath ,callback)=>{
    // const {name , cat , description , price , img } = item
    // console.log(name , cat , description , price , imgPath ,val)
    let query = "INSERT INTO category (name , count,  img ) VALUES (?,?,?)"
    db.query(query , [name , parseInt(count, 10) , imgPath ] , callback)
}

exports.deleteCategory = (id , callback)=>{
    let query = "Select img from category where id = ?"
    db.query(query , id, (err, result)=>{
        helper.delImg(result)
    })

    db.query("DELETE from category where id =?",id , callback)
}

exports.getAllCategory = (callback)=>{
    let query = "Select * from category "
    db.query(query , callback)
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

exports.updateCategory = ( id, name ,count, imgPath, callback)=>{
    let q1 = "Select img from category where id = ?"
    db.query(q1 , id, (err, result)=>{
        helper.delImg(result)
    })

    let query = "UPDATE category SET name=? , count=?, img=? where id =?"
    db.query(query ,[name , parseInt(count, 10) , imgPath , id]  ,callback)
}

exports.updateCount = (id , val , callback)=>{
    let temp =0;
    // console.log(id)
    db.execute("Select count from category where id = ?", id ,(err , result)=>{
        if(err) console.log(err)
        val = result[0].count + val
    })
    // console.log("count: ", val)
    let query = "UPDATE category SET count = ?  where id =?"
    db.query(query , [val, id ] ,callback)
}

exports.getCount = (id , callback)=>{
    
    const query = "Select count from category where id = ?";
    db.query(query , id , callback)
}