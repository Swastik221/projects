
const express=require("express");

const app= express();




app.get("/sum/:a/:b",(req,res)=>{
  const a= Number(req.params.a);
  const b= Number(req.params.b);
  const sum=a+b;
  res.json({sum})

})

app.listen(3000);