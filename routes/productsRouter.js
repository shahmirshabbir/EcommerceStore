const express = require('express')
const upload = require('../config/multerConfig')
const router = express.Router()
const ProductControl = require("../controllers/productCotroller")


router.get('/:id',ProductControl.getProduct)
router.get('/',ProductControl.getAllProducts)
router.delete('/:id',ProductControl.deleteProduct)
router.put('/:id',upload.single('img'),ProductControl.updateProduct)
router.post("/",upload.single('img'),ProductControl.addProduct)


module.exports = router