const express=require('express')

require('dotenv').config({ path: './config/.env' })
require('./config/dbconfig')
const indexRoute=require('./src/routes/index-routes')


const app= express()

port=process.env.PORT||8000

app.use(express.urlencoded({
    extended:true
}))

app.use(express.json())

app.use('/api',indexRoute)


app.listen(port,()=>{
console.log(`Server is running on port ${port}`)
})