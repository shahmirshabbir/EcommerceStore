const express = require('express')
require('dotenv/config')
const ProductRoute = require("./routes/productsRouter")
const CategoryRoute = require("./routes/categoryRouter")
const dev = require("./models/dev")
const app = express()
const api = process.env

app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use('/public/uploads', express.static(__dirname + '/public/uploads'));

app.use('/products', ProductRoute);
app.use('/category', CategoryRoute);

app.post("/dev", (req , res)=>{
    
dev.execQuery(req.body.query , (err , result)=>{
if(err){
    res.send(err);
}

res.send(result)
})


})
app.get('/' ,(req , res)=>{
    res.send("Yes I am")
})
app.listen(8080,()=>{
    console.log("Server has been started")
})