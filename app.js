const express=require('express')

require('dotenv').config({path:'./config'})
require('./config/dbconfig')
const indexRoute=require('./src/routes/index-routes')


const app= express()

port=process.env.PORT||8000

app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())

app.use(indexRoute)


app.listen(port,()=>{
console.log(`Server is running on port ${port}`)
})