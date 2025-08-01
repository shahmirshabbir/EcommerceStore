const express = require('express')
require('dotenv/config')

const dev = require("./models/dev")
const app = express()  
const api = process.env

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));


const ProductRoute = require("./routes/productsRouter")
const CategoryRoute = require("./routes/categoryRouter")
const UserRoute = require("./routes/userRouter")

app.use('/products', ProductRoute);
app.use('/category', CategoryRoute);
app.use('/user', UserRoute);
  
app.post("/dev", async (req , res)=>{
      
try{
    const result= await dev.execQuery(req.body.query)
    res.json(result[0])
}
catch(err){
 res.status(500).json({ message: 'Something went wrong' , error : err});
}

}) 
app.get('/' ,(req , res)=>{
    res.send("Yes I am")
})
app.listen(8080,()=>{
    console.log("Server has been started")  
})