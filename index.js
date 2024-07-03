const express=require('express')
const cors=require('cors')
const bodyParser=require('body-parser')
const dotenv=require('dotenv')
const path = require("path");
dotenv.config()
const app=express()
const dbConnect=require("./db")
const productRoutes=require("./routes/productRoutes")
const userRoutes=require("./routes/userRoutes")
const orderRoutes=require("./routes/orderRoutes")

app.use(cors())
app.use(bodyParser.json())

app.use('/api/product',productRoutes)
app.use('/api/user',userRoutes)
app.use('/api/order',orderRoutes)

app.use(express.static(path.join(__dirname, "./client/build")));
app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "./client/build/index.html"));
});

const port=process.env.PORT
app.listen(port,()=>{
    console.log("Server is listening")
})