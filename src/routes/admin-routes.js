const express=require('express')
const router=express.Router()
const adminController=require('../controller/admin-controller')


router.use('/admin',adminController.adminHome)



module.exports=router