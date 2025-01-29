const {User}=require("../database/model/user")
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



module.exports={
    getAlluser:async(req,res)=>{
        try {
            const getuser=await db.User.findAll()
            res.send(getuser)
            
        } catch (error) {
            throw error
        }
    },

    register:async(req,res)=>{ 
        try {
            const {userName,email,password}=req.body
            const existingUser= await db.User.findOne({where:{email}})
            if (existingUser) {
                return res.status(400).send({ message: "User already exists" });
              }
            
              const hashePassword = await bcrypt.hash(password, 10);
              const newUser = await db.User.create({
                email,
                password: hashePassword,
                userName,
              });
              return res
                .status(201)
                .send({ message: "register success", user: newUser });
            } catch (error) {
                throw error
            }


//Login
    },
    login:async(req,res)=>{
        try {
            const { email, password } = req.body;
            const user = await db.User.findOne({ where: { email } });    
            if (!user) {
              return  res.status(404).send({ message: "email or password is incorrect" });
            }
            const comparePassword = await bcrypt.compare(password, user.password);   
            if (!comparePassword) {
              return res
                .status(401)
                .send({ message: "email or password is incorrect" });
            }
            const token = jwt.sign({ id: user.id }, "1234", { expiresIn: "24h" });
            return res.status(201).send({ message: "Login success", user, token });
          } catch (error) {
            throw error;
          }
    },
    

    

    currentUser:async(req,res)=>{
        try {
            console.log("het l user",req.user);
            const user = await User.findOne({ where:{id: req.user }});
            res.send(user);
          } catch (error) {
            throw error;
          }
    },

}