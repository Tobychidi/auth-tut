const router = require('express').Router();
const User = require('../model/User')
const {registerValidation,loginValidation} = require('../validation');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')


router.post('/register', async (req, res) => {
   //LETS VALIDATE THE DATA BEFORE WE CEATE A USER
   const {error} = registerValidation(req.body);

   if (error) return res.status(400).send(error.details[0].message);


   //CHECK IF USERNAME OR EMAIL EXISTS
   const emailExist = await User.findOne({
      email: req.body.email
   })
   const nameExist = await User.findOne({
      name: req.body.name
   })

   if (nameExist) return res.status(400).send('Username already exists');

   if (emailExist) return res.status(400).send('Email already exists');


   //HASH PASSWORDS

   const salt = await bcrypt.genSalt(10);
   const hashedPassword = await bcrypt.hash(req.body.password, salt);

   const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
   })

   try {
      const savedUser = await user.save();
      res.send("Success");
   } catch (err) {
      res.status(400).send(err);
   }
})

router.post('/login', async (req, res) => {
   //VALIDATE USER ENTRY
   const {error} = loginValidation(req.body);
   if(error) return res.status(400).send(error.details[0].message);

   //CHECK IF USER EXISTS
   const user = await User.findOne({ name: req.body.name })
   if (!user) return res.status(400).send(`User does not exist`)

   //COMPARE PASSWORDS
   const validPassword = await bcrypt.compare(req.body.password, user.password);
   if(!validPassword) return res.status(400).send(`Password is invalid`)
   
   
   //CREATE AND ASSIGN A TOKEN
   const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET);
   res.header('auth-token', token).send(token);
})

module.exports = router;