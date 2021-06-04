const mongoose=require('mongoose')


mongoose.connect('mongodb://localhost/adminpanel',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(()=>{
    console.log("Database Connected Succesfully")
}).catch((err)=>{
    console.log(err)
})

module.exports=mongoose;


