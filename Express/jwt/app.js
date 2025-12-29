const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

app.use(cookieParser());

app.get("/", function(req,res){
    res.cookie("name","harshita");
    res.send("done");
});

app.listen(3000);