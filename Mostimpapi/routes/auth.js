const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const db = require("../db");
const runQuery = require("../utils/runquery");
const authMiddleware = require("../middleware/auth");

const router = express.Router();
    
    const generateToken = (user) => {
    return jwt.sign(
        { id: user.id, email: user.email },
        process.env.jwt_secret,
        { expiresIn: "1h" }
    );
};

router.post("/signup", async (req,res)=>{
       const { firstName, lastName, email, password, role } = req.body;


        if (!firstName || !lastName || !email || !password || !role){
            return res.status(400).json({message:"all fields are required"});
        }
            const fullName = firstName + " " + lastName;

        db.query(
            "select * from users where email = ?",
            [email],
            async(err,result)=>{
                if (err){
                    return res.status(500).json({message:"database error"})
                }
                if (result.length>0){
                    return res.status(400).json({message:"user already exist"});
                }

                const hashpass = await bcrypt.hash(password,10);

                db.query(
                    "insert into users (name,email,password,role) values (?,?,?,?)",
                    [fullName,email,hashpass,role],
                    (err,result)=>{
                        if(err){
                            return res.status(500).json({message:"insert failed"});
                        }

                        const token = jwt.sign(
                            {id:result.insertId,email},
                            process.env.jwt_secret,
                            {expiresIn:"1h"}
                        );

                        res.status(201).json({message:"signup successfull",token});
                    }
                );
            }
        );
});


router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).json({ message: "all fields required" });

    const users = await runQuery(
      "SELECT * FROM users WHERE email = ?",
      [email]
    );

    if (users.length === 0)
      return res.status(401).json({ message: "user not found" });

    const user = users[0];
    const match = await bcrypt.compare(password, user.password);

    if (!match)
      return res.status(401).json({ message: "wrong password" });

    const token = generateToken(user);
    res.json({ message: "login success", token });

  } catch (err) {
    res.status(500).json({ message: "server error" });
  }
});

router.get("/profile", authMiddleware, (req, res) => {
  db.query(
    "SELECT id, name, email FROM users WHERE id = ?",
    [req.user.id],
    (err, result) => {
      if (err) return res.status(500).json({ message: "db error" });
      res.json(result[0]);
    }
  );
});

router.post("/logout", (req, res) => {
        res.json({message:"logout success fully"});

});

module.exports = router;