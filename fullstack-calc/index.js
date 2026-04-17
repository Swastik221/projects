
const express=require("express");

const app= express();

app.get("/",(req,res)=>{
  res.sendFile("/Users/swastiktiwari/projects/fullstack-calc/index.html");

})



app.get("/sum/:a/:b",(req,res)=>{
  const a= Number(req.params.a);
  const b= Number(req.params.b);
  const sum=a+b;
  res.json({sum})

})

app.listen(3002);