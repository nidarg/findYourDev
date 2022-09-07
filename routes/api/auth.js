const express = require('express');
const router = express.Router()
const authorization = require('../../middleware/authorization')
const { check, validationResult } = require('express-validator')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

const User = require('../../models/User')

//@ route GET api/auth
//@desc get user
// @access Protected
router.get('/', authorization,  async(req, res)=>{
  try {
    const user = await User.findById(req.user.id).select('-password')
    res.json(user)
  } catch (error) {
    console.error(error.message)
    res.status(500).send('Server error')
  }
})


//@ route POST api/auth
//@desc Authenticate user and get token
// @access Public
router.post('/',

 
  check('email', 'Please include a valid email').isEmail(),
  check(
    'password',
    'Password is required'
  ).notEmpty(),

   async (req, res)=>{
      const errors = validationResult(req)
      //console.log(errors)
      if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array()})
      }
  
      const {email, password} = req.body
      //see if user exists
      
      //compare passwords with bcrypt.compare()
      //return jsonwebtoken

          try {
            let user = await User.findOne({email})
            if(!user){
              return res.status(400).json({errors:[{msg:'Invalid credentials'}]})
            }

            const isMatch = await bcrypt.compare(password, user.password)
            if(!isMatch){
              return res.status(400).json({errors:{msg:"Invalid credentials"}})
            }

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

module.exports =  router