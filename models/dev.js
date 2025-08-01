// const { useCallback } = require('react')
const db = require('../config/db')

exports.execQuery = async (query)=>{
    const result = await db.execute(query)
    // console.log(result[0][0] == null)
    return result
}