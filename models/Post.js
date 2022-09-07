const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
  userId:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'user'
  },
  text:{
    type:String,
    required:true
  },
  name:{
    type:String
  },
  avatar:{
    type:String
  },
  likes:[
    {
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      }
    }
  ],
  comments:[
    {
      userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'user'
      },
      text:{
        type:String,
        required:true
      },
      avatar:{
        type:String
      },
      date:{
        type:Date,
        default: Date.now
      }

    }
   
  ],
  date:{
    type:Date,
    default:Date.now
  }
})

module.exports = Post = mongoose.model('post', PostSchema)