// const { useCallback } = require('react')
const db = require('../config/db')

exports.execQuery = (query , callback)=>{
    db.query(query , callback)
}