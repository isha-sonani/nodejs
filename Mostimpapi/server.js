require("dotenv").config();

const express = require("express");
const cors = require("cors");
const authroutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth",authroutes);

app.listen(process.env.port,()=>{
    console.log(`server running on port ${process.env.port}`);
});
