const express = require('express');
const router = express.Router()
const { check, validationResult } = require('express-validator');
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const generateToken = require('../utils/generateToken');


const User = require('../../models/User')

//@ route POST /api/users
//@desc register users
// @access Public
router.post('/',

  check('name', 'Name is required').notEmpty(),
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Please enter a password with 6 or more characters'
  ).isLength({ min: 6 }),

   async (req, res)=>{
      const errors = validationResult(req)
      //console.log(errors)
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
      }
  
      const {name, email, password} = req.body
      //see if user exists
      //get user's gravatar
      //Encrypt password
      //return jsonwebtoken

          try {
            let user = await User.findOne({email})
            if(user){
              return res.status(400).json({errors:[{msg:'User already exists'}]})
            }

            const avatar = gravatar.url(email,{
              s:200,
              r: 'pg',
              d:'mm'
            })

            user = new User({name, email, password, avatar})

            const salt = await bcrypt.genSalt(10)
            user.password = await bcrypt.hash(password, salt)

            await user.save()


             

            res.json({
              _id: user._id,
              name: user.name,
              email: user.email,
              avatar: user.avatar,
              token:generateToken(user._id)
            })
            

          } catch (error) {
            console.error(error.message)
            res.status(500).send('Server error')
          }
    

})

module.exports = router