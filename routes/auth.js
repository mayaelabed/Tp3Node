const express = require('express');
const router = express.Router();
const bcrypt=require('bcryptjs');
const jwt=require('jsonwebtoken');
const User=require('../models/user');
router.get('/logintest',(req,res) =>{
    res.send("<h1>you are logged in ! </h1>")
});


router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).send('Utilisateur non trouvé');
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send('Mot de passe incorrect');
        }
        const token = jwt.sign({ userId: user._id }, 'secret_key'); 
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send(error.message);
    }
});
router.get('/register1',(req,res) =>{
    res.sendFile(__dirname+"/index.html")
});
router.post('/register',async(req,res)=>{
    try{
        const {username,password}=req.body;
        const user = new User({username,password})
        await user.save();
        res.status(201).send('User registered succefully!');
    }catch(error){
        res.status(400).send(error.message)
    }
})

module.exports=router;