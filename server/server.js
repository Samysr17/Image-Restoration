const express=require("express");
const app=express();
const PORT=5000;
const cors=require("cors");
app.use(express.json());
app.use(cors)

app.listen(PORT,()=>{
    console.log(`Server Running on ${PORT}`);
})