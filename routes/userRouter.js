const express = require('express')
const userController = require('../controllers/userController')
// const upload = require('../config/multerConfig')
// const product = require('../controllers/productCotroller')
const router = express.Router()
const upload = require('../config/multerConfig')



router.get('/:id',userController.getUser)
router.get('/',userController.getAllUser)
router.delete('/:id',userController.deleteUser)
router.put('/:id',upload.none(),userController.updateUser)
router.post("/",upload.none(),userController.signUp)
router.post("/login",upload.none(),userController.login)

module.exports = router 