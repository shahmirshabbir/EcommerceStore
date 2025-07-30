const express = require('express')
const upload = require('../config/multerConfig')
const router = express.Router()
const CategoryControl = require("../controllers/categoryController")


// router.get('/:id',ProductControl.getProduct)
router.get('/',CategoryControl.getAllCategory)
router.delete('/:id',CategoryControl.deleteCategory)
router.put('/:id',upload.single('img'),CategoryControl.updateCategory)
router.post("/",upload.single('img'),CategoryControl.addCategory)


module.exports = router