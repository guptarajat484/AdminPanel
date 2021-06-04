const express=require('express')
const path=require('path')
require('dotenv').config({path:'./config'})
require('./config/dbconfig')
const app= express()

port=process.env.PORT||8000

app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())

require('./src/routes/index-routes')(app)

app.listen(port,()=>{
console.log(`Server is running on port ${port}`)
})