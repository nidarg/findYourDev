const express = require('express');
const router = express.Router()
const request = require('request')

const authorization = require('../../middleware/authorization')
const Post = require('../../models/Post')
const { check, validationResult } = require('express-validator');
const User = require('../../models/User')
const checkObjectId = require('../../middleware/checkObjectId');

//@ route POST api/posts
//@desc Create a post
// @access Private
router.post('/', [authorization,[
check('text', 'Text is required').not().isEmpty()
]],
async(req, res)=>{
  const errors = validationResult(req)
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()})
  }

    try {
      const user = await User.findById(req.user.id).select('-password')

      const newPost = new Post({
        text:req.body.text,
        name:user.name,
        avatar:user.avatar,
        userId:req.user.id
      })

      const post = await newPost.save();
      res.json(post)

    } catch (error) {
      console.error(error)
      res.status(500).send('Server Error')
    }
})


//@ route GET api/posts
//@desc Get all posts
// @access Private

router.get('/', authorization, async(req, res)=>{
  try {
    const posts = await Post.find().sort({date:-1})
    res.json(posts)
  } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
  }
})

//@ route GET api/posts/:post_id
//@desc Get post by id
// @access Private

router.get('/:post_id', authorization, async(req, res)=>{
  try {
    const post = await Post.findById(req.params.post_id);
    if(!post){
      return res.status(404).json({message:'Post not found'})
    }
    res.json(post)
  } catch (error) {
    console.error(error)
    if(error.kind === 'ObjectId'){
      return res.status(404).json({message:'Post not found'})
    }
    res.status(500).send('Server Error')
  }
})


//@ route DELETE api/posts/:post_id
//@desc Delete a post
// @access Private

router.delete('/:post_id', 
  [authorization,checkObjectId('post_id')], 
  async(req, res)=>{
    try {
      const post = await Post.findById(req.params.post_id)
      if(!post){
        return res.status(404).json({message:'Post not found'})
      }

      // check user
      if(post.userId.toString() !== req.user.id){
        return res.status(401).json({message:'User not authorized'})
      }
      await post.remove();
      res.json({message:'Post removed'})
    } catch (error) {
      console.error(error)
      if(error.kind === 'ObjectId'){
        return res.status(404).json({message:'Post not found'})
      }
      res.status(500).send('Server Error')
    }
})

//@ route PUT api/posts/like/:like_id
//@desc Like a post
// @access Private

router.put('/like/:post_id',
 authorization, 
 checkObjectId('post_id'),
 async(req, res)=>{
   try {
     const post = await Post.findById(req.params.post_id)

     // check if the post has already been liked by the logged in user - likes array has userId
     if(post.likes.filter(like => like.userId.toString() === req.user.id).length>0){
       return res.status(400).json({message:'Post already liked'})
     }

     post.likes.unshift({userId:req.user.id})
     await post.save()
     return res.json(post.likes)
     
   } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
   }

})

//@ route PUT api/posts/unlike/:like_id
//@desc Unlike a post
// @access Private

router.put('/unlike/:post_id',
 authorization, 
 checkObjectId('post_id'),
 async(req, res)=>{
   try {
     const post = await Post.findById(req.params.post_id)

     // check if the post has already been liked by the logged in user - likes array has userId
     if(post.likes.filter(like => like.userId.toString() === req.user.id).length===0){
       return res.status(400).json({message:'Post has not yet been liked'})
     }

     post.likes = post.likes.filter(({userId})=>userId.toString () !== req.user.id)
     await post.save()
     return res.json(post.likes)
     
   } catch (error) {
    console.error(error)
    res.status(500).send('Server Error')
   }

})

//@ route POST api/posts/comment/:post_id
//@desc Comment on a post
// @access Private
router.post('/comment/:post_id', [authorization,[
  check('text', 'Text is required').not().isEmpty()
  ]],
  async(req, res)=>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
      return res.status(400).json({errors:errors.array()})
    }
  
      try {
        const user = await User.findById(req.user.id).select('-password')

        const post = await Post.findById(req.params.post_id);
  
        const newComment = {
          text:req.body.text,
          name:user.name,
          avatar:user.avatar,
          userId:req.user.id
        }
        
        post.comments.unshift(newComment)
        await post.save();
        res.json(post.comments)
  
      } catch (error) {
        console.error(error)
        res.status(500).send('Server Error')
      }
  })

  //@ route DELETE api/posts/comment/:post_id/:comment_id
//@desc Delete a comment on a post
// @access Private

router.delete('/comment/:post_id/:comment_id',
  authorization,
  async(req, res)=>{
    try {
      const post = await Post.findById(req.params.post_id);
      // get comment from that post
      const comment = post.comments.find(comment=>comment.id === req.params.comment_id)

      // check if there is comment
      if(!comment){
        return res.status(404).json({message:'Comment does not exist'})
      }

      //check user
      if(comment.userId.toString() !== req.user.id){
        return res.status(401).json({message:'user not authorized'})
      }

      post.comments = post.comments.filter(({userId})=> userId.toString() !== req.user.id)

      await post.save()
      return res.json(post.comments)

    } catch (error) {
      console.error(error)
      res.status(500).send('Server Error')
    }
  }

)

module.exports = router