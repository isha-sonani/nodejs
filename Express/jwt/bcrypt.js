//encrypt the password

const express = require('express');
const app = express();
const bcrypt = require('bcrypt');

app.get("/", function (req,res){
    // bcrypt.genSalt(10,function(err,Salt){
    //     bcrypt.hash("password",Salt,function(err,hash){
    //         console.log(hash);

    //bcrypt password

    bcrypt.compare("password","$2b$10$XjbwAFYXA.nK14g2csJuGuJaRRt91g9RDc6IQEyNFSH7/Dtvmd.9i",function(err,result){
        console.log(result);
    })
})

app.listen(3000);

