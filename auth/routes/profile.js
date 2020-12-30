const router = require('express').Router();
const User = require('../model/User');
const verify = require('./verifyToken');
const bcrypt = require('bcrypt');
const {
   updateValidation
} = require('../validation')

router.get('/', verify, async (req, res) => {

   const id = req.user._id;
   try {
      const user = await User.findById(id, {
         "password": 0,
         "__v": 0,
         "date": 0
      });

      res.status(200).send(user)
   } catch (error) {
      res.status(500).send(error)
   }
})

router.post('/save', verify, async (req, res) => {
   const id = req.user._id;

   //VALIDATE USER ENTRY
   const {
      error
   } = updateValidation(req.body);
   if (error) return res.status(400).send(error.details[0].message);

   //CHECK IF USERNAME ALREADY EXISTS
   const userExist = await User.findOne({
      name: req.body.name
   })
   if (userExist) {
      if (userExist._id != id) {
         return res.status(400).send("The username is alreay taken");
      }
   }

   //CHECK IF EMAIL ALREADY EXISTS
   const emailExist = await User.findOne({
      email: req.body.email
   })
   if (emailExist) {
      if (emailExist._id != id) {
         return res.status(400).send("The email is alreay taken");
      }
   }

   if (req.body.password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      const user = await User.updateOne({
         _id: id
      }, {
         name: req.body.name,
         email: req.body.email,
         fullname: req.body.fullname,
         password: hashedPassword,
         extra: req.body.extra
      }, (err, doc) => {
         if (err) return res.status(500).send(err)
         return res.status(400).send("Updated Successfully")
      })
   } else {
      const user = await User.updateOne({
         _id: id
      }, {
         name: req.body.name,
         email: req.body.email,
         fullname: req.body.fullname,
         extra: req.body.extra
      }, (err, doc) => {
         if (err) return res.status(500).send(err)
         return res.status(400).send("Updated Successfully")
      })
   }

})





module.exports = router;