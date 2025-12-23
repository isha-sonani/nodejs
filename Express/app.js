const express = require("express");

const app = express();
const port = 3000;
const fs = require("fs");

app.use(express.static("public"))

//m1
app.use((req,res,next)=>{
    fs.appendFileSync("logs.txt",`${Date.now()} is a ${req.method}\n`)
    console.log(`${Date.now() } is a ${req.method}`)
    next()
})

//m2
app.use((req,res,next)=>{
    console.log('m2')
    next()
})

app.get("/", (req,res)=>{
    res.send("this is my home page");
});

app.get("/about", (req,res)=>{
    res.send("this is my about page");
});

app.get("/contact", (req,res)=>{
    res.send("this is my contact page");
});

app.get("/services", (req,res)=>{
    res.send("this is my services page");
});

app.post("/services", (req,res)=>{
    res.send("this is my post method services page");
});

app.get("/this", (req,res)=>{
    res.status(404).send("this page is not found on my web application");
})

app.listen(port, ()=>{
    console.log(`the application is started successfully on port ${port}`);
});