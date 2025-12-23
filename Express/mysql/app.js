const express = require('express');
const mysql = require('mysql2/promise');

const app = express();
const port = 80;

const testdb = {
    host:"localhost",
    user:"root",
    password:"isha@pass9797",
    database:"college"
};

app.get('/teacher',async(req,res)=>{
   try{
    const connection = await mysql.createConnection(testdb);
    const[rows] = await connection.query('select * from teacher');
    await connection.end();
    res.json(rows);
   }
   catch (err){
res.status(500).send(err.message);
   }
});

app.listen(port , ()=>{
        console.log(`server running at http://localhost:${port}`);
        
});