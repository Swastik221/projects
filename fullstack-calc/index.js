const express=require("express");

const app= express();

app.use(express.json());

app.get("/",(req,res)=>{
  res.sendFile("/Users/swastiktiwari/projects/fullstack-calc/index.html");
})

// for input of body
app.post("/sum",(req,res)=>{
  const a= Number(req.body.a);
  const b= Number(req.body.b);
  const sum=a+b;
  res.json({
    ans:sum
  });
})

// for path parameter input tech

// app.get("/sum/:a/:b",(req,res)=>{
//   const a= Number(req.params.a);
//   const b= Number(req.params.b);
//   const sum=a+b;
//   res.json({ans:sum})

// })

app.listen(3002);