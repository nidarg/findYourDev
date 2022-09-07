const mongoose = require ('mongoose')
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name:{
    type:String,
    required:true
  },
  email:{
    type:String,
    required:true,
    unique:true
  },
  password:{
    type:String,
    required:true
  },
  avatar:{
    type:String
  },
  date:{
    type:Date,
    default:Date.now
  }
})

UserSchema.methods.matchPassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)
}

const User = mongoose.model('user', UserSchema)
module.exports =  User
