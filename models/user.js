const db = require("../config/db")

exports.signUp = async(email, password , name)=>{
    const query = "INSERT INTO users (email , password,name ) VALUES (? ,?,?)"
    return await db.execute(query , [email , password, name])
}

exports.deleteUser = async(id)=>{
    const query = "DELETE from users where id =?"
    return await db.execute(query , [id])
}
exports.updateUser = async(id , email , password , name,role)=>{
    const query = "UPDATE users SET email =? , password=?,name=? where id = ?"
    return await db.execute(query , [email , password, name ,id])
}
exports.isThere= async(email)=>{
    const query = "Select * from users where email = ?"
    const result = await db.execute(query , [email])
    return result[0][0]
}

exports.getUser = async(id)=>{
    const query = "Select email , password,name ,role from users where id = ?"
    return await db.execute(query , [id])
}

exports.getAllUser = async()=>{
    const query = "Select * from users "
    return await db.execute(query)
}






